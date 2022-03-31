package controller

import (
	"os"
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
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }

    year, month, day := time.Time.Date(user.Birthday)

    generatedPassword := user.LastName+strconv.Itoa(year)+strconv.Itoa(int(month))+strconv.Itoa(day)

    hashPassword, _ := util.HashPassword(generatedPassword)
    user.Password 	= hashPassword
	user.Type 		= constants.USER_TYPE[user.Type]

    err := u.service.CreateUser(user)
    if err != nil {
        util.CustomErrorJson(c, http.StatusBadRequest, err.Error())
        return
    }

    util.SuccessJSON(c, http.StatusOK, "Successfully Created user")
}

//LoginUser : Generates JWT Token for validated user
func (u *UserController) LoginUser(c *gin.Context) {
    var user models.UserLogin

    hmacSampleSecret := []byte(os.Getenv("JWT_SECRET"))

    if err := c.ShouldBindJSON(&user); err != nil {

        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }

    dbUser, err := u.service.LoginUser(user)
    if err != nil {
        util.CustomErrorJson(c, http.StatusForbidden, "Username/password is incorrect.")
        return
    }

    token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
        "UserID"    : dbUser.ID,
        "FirstName" : dbUser.FirstName,
        "LastName"  : dbUser.LastName,
    })

    tokenString, err := token.SignedString(hmacSampleSecret)
    if err != nil {
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }

    response := &util.Response{
        Success: true,
        Message: "Token generated sucessfully",
        Data:   map[string]interface{}{
            "token": tokenString,
            "user": dbUser.ResponseMap(),
    }}

    util.SuccessJSON(c, http.StatusOK, response)
}

// GetUsers : GetUsers controller
func (u UserController) GetUsers(c *gin.Context) {
    var users models.User
    currentUser := c.MustGet("currentUser").(models.User)

    fmt.Println("currentUser")
    fmt.Println(currentUser)

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

//AddUsertoClassroom : add from user to classroom
func (u *UserController) AddUsertoClassroom(c *gin.Context) {
    var post        models.AddUserClass
    var user        models.User
    var classroom   models.Classroom
    if err := c.ShouldBind(&post); err != nil {
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }

    user.ID         = post.UserID
    classroom.ID    = post.ClassroomID

    if err := u.service.AddUserToClassroom(user, classroom); err != nil {
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }

    c.JSON(http.StatusOK, &util.Response{
        Success: true,
        Message: "Successfully Updated Post",
    })

}