package controller

import (
	"portal/constants"
    "portal/api/service"
    "portal/models"
    "portal/util"
    "net/http"
    "strconv"
    "time"
	"fmt"

    "github.com/gin-gonic/gin"
    "github.com/golang-jwt/jwt"
)

//UserController struct
type UserController struct {
    service service.UserService
}

//NewUserController : NewUserController
func NewUserController(s service.UserService) UserController {
    return UserController{
        service: s,
    }
}

//CreateUser ->  calls CreateUser services for validated user
func (u *UserController) CreateUser(c *gin.Context) {
    var user models.UserRegister
    if err := c.ShouldBind(&user); err != nil {
        fmt.Println(err)
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }

    year, month, day := time.Time.Date(user.Birthday)

    fmt.Println(year)
    fmt.Println(int(month))
    fmt.Println(day)

    generatedPassword := user.LastName

    hashPassword, _ := util.HashPassword(generatedPassword)
    user.Password 	= hashPassword
	user.Type 		= constants.USER_TYPE[user.Type]

    err := u.service.CreateUser(user)
    if err != nil {
		fmt.Println(err)
        util.CustomErrorJson(c, http.StatusBadRequest, err.Error())
        return
    }

    util.SuccessJSON(c, http.StatusOK, "Successfully Created user")
}

//LoginUser : Generates JWT Token for validated user
func (u *UserController) LoginUser(c *gin.Context) {
    var user models.UserLogin
    var hmacSampleSecret []byte
    if err := c.ShouldBindJSON(&user); err != nil {
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }
    dbUser, err := u.service.LoginUser(user)
    if err != nil {
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
        "user": dbUser,
        "exp":  time.Now().Add(time.Minute * 15).Unix(),
    })

    tokenString, err := token.SignedString(hmacSampleSecret)
    if err != nil {
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }
    response := &util.Response{
        Success: true,
        Message: "Token generated sucessfully",
        Data:    tokenString,
    }
    c.JSON(http.StatusOK, response)
}

// GetUsers : GetUsers controller
func (u UserController) GetUsers(c *gin.Context) {
    var users models.User

    keyword := c.Query("keyword")

    data, total, err := u.service.FindAll(users, keyword)

    if err != nil {
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }
    respArr := make([]map[string]interface{}, 0, 0)

    for _, n := range *data {
        resp := n.ResponseMap()
        respArr = append(respArr, resp)
    }

    c.JSON(http.StatusOK, &util.Response{
        Success: true,
        Message: "Post result set",
        Data: map[string]interface{}{
            "rows":       respArr,
            "total_rows": total,
        }})
}

//GetUser : get user by id
func (u *UserController) GetUser(c *gin.Context) {
    idParam := c.Param("id")
    id, err := strconv.ParseUint(idParam, 10, 64) //type conversion string to int64
    if err != nil {
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }
    var user models.User
    user.ID = uint(id)
    foundUser, err := u.service.Find(user)
    if err != nil {
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }
    response := foundUser.ResponseMap()

    c.JSON(http.StatusOK, &util.Response{
        Success: true,
        Message: "Result set of Post",
        Data:    &response})

}

//UpdatePost : get update by id
func (u UserController) UpdateUser(c *gin.Context) {
    idParam := c.Param("id")

    id, err := strconv.ParseUint(idParam, 10, 64)

    if err != nil {
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }
    var user models.User
    user.ID = uint(id)

    userRecord, err := u.service.Find(user)
    if err != nil {
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }

    if err := c.ShouldBindJSON(&userRecord); err != nil {
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }

    if err := u.service.Update(userRecord); err != nil {
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }
    response := userRecord.ResponseMap()

    c.JSON(http.StatusOK, &util.Response{
        Success: true,
        Message: "Successfully Updated Post",
        Data:    response,
    })
}