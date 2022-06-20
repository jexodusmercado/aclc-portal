package controller

import (
	"net/http"
	"os"
	"path/filepath"
	"portal/api/service"
	"portal/constants"
	"portal/models"
	"portal/util"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"github.com/twinj/uuid"
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
	var newFileName string
	var extension string

	var user models.UserRegister
	var schoolyear models.SchoolYear

	file, err := c.FormFile("file")

	if err == nil && file != nil {

		extension = filepath.Ext(file.Filename)
		newFileName = uuid.NewV4().String() + extension

		user.Image = newFileName

		if err := c.SaveUploadedFile(file, "./public/users/"+newFileName); err != nil {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
				"message": "Unable to save the file",
			})
			return
		}
	}

	if err := c.ShouldBind(&user); err != nil {

		util.CustomErrorJson(c, http.StatusBadRequest, err.Error())
		return
	}

	t, err := time.Parse(constants.DATE_LAYOUT, user.Birthday)
	if err != nil {
		util.CustomErrorJson(c, http.StatusBadRequest, err.Error())
		return
	}

	year, month, day := time.Time.Date(t)



	generatedPassword := strings.ToLower(user.LastName) + strconv.Itoa(year) + strconv.Itoa(int(month)) + strconv.Itoa(day)

	hashPassword, _ := util.HashPassword(generatedPassword)
	user.Password = hashPassword
	user.Type = constants.USER_TYPE[user.Type]
	schoolyear.ID = user.SchoolYearID

	if user.Type == "" {
		util.CustomErrorJson(c, http.StatusBadRequest, "No existing role")
	}


	newPath := filepath.Join(".", "public", "users")
	err = os.MkdirAll(newPath, os.ModePerm)

	if err != nil {
		util.CustomErrorJson(c, http.StatusBadRequest, "Folder already exist")
	}

	err = u.service.CreateUser(user, schoolyear)
	if err != nil {
		util.CustomErrorJson(c, http.StatusBadRequest, err.Error())
		return
	}

	util.SuccessJSON(c, http.StatusOK, "Successfully Created user")
}

//CreateStudent -> create student user
func (u *UserController) CreateStudent(c *gin.Context) {

	var newFileName string
	var extension string

	var user models.StudentRegister
	var schoolyear models.SchoolYear

	if err := c.ShouldBind(&user); err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}

	file, err := c.FormFile("file")

	if err == nil && file != nil {

		extension = filepath.Ext(file.Filename)
		newFileName = uuid.NewV4().String() + extension

		user.Image = newFileName

		if err := c.SaveUploadedFile(file, "./public/users/"+newFileName); err != nil {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
				"message": "Unable to save the file",
			})
			return
		}
	}

	t, err := time.Parse(constants.DATE_LAYOUT, user.Birthday)
	if err != nil {
		util.CustomErrorJson(c, http.StatusBadRequest, err.Error())
		return
	}
	year, month, day := t.Date()

	generatedPassword := strings.ToLower(user.LastName) + strconv.Itoa(year) + strconv.Itoa(int(month)) + strconv.Itoa(day)

	hashPassword, _ := util.HashPassword(generatedPassword)
	user.Password = hashPassword
	user.Type = constants.USER_TYPE[user.Type]
	schoolyear.ID = user.SchoolYearID

	if strings.ToUpper(user.Type) != constants.USER_TYPE_STUDENT {
		util.CustomErrorJson(c, http.StatusBadRequest, "Student type only")
	}

	err = u.service.CreateStudent(user, schoolyear)
	if err != nil {
		util.CustomErrorJson(c, http.StatusBadRequest, err.Error())
		return
	}

	util.SuccessJSON(c, http.StatusOK, "Successfully Created user")
}

//LoginUser : Generates JWT Token for validated user
func (u *UserController) LoginUser(c *gin.Context) {
	var user 			models.UserLogin
	var userData 		map[string]interface{}
	hmacSampleSecret 	:= []byte(os.Getenv("JWT_SECRET"))

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
		"UserID":    dbUser.ID,
		"FirstName": dbUser.FirstName,
		"LastName":  dbUser.LastName,
	})

	if strings.ToUpper(dbUser.Type) != constants.USER_TYPE_FACULTY {
		userData = dbUser.ResponseStudent()
	} else {
		userData = dbUser.ResponseFaculty()
	}


	tokenString, err := token.SignedString(hmacSampleSecret)
	if err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}

	

	response := &util.Response{
		Success: true,
		Message: "Token generated sucessfully",
		Data: map[string]interface{}{
			"token": tokenString,
			"user":  userData,
		}}

	util.SuccessJSON(c, http.StatusOK, response)
}

// GetUsers : GetUsers controller
func (u UserController) GetUsers(c *gin.Context) {
	var users models.User

	keyword := c.Query("keyword")

	userType := c.Query("type")

	courseId := c.Query("course_id")

	data, total, err := u.service.FindAll(users, keyword, userType, courseId)

	if err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}
	respArr := make([]map[string]interface{}, 0)

	if strings.ToUpper(userType) == constants.USER_TYPE_STUDENT {
		for _, n := range *data {
			resp := n.ResponseStudent()
			respArr = append(respArr, resp)
		}
	} else {
		for _, n := range *data {
			resp := n.ResponseMap()
			respArr = append(respArr, resp)
		}
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
	var post models.AddUserClass
	var user models.User
	var classroom models.Classroom
	if err := c.ShouldBind(&post); err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}

	user.ID = post.UserID
	classroom.ID = post.ClassroomID

	if err := u.service.AddUserToClassroom(user, classroom); err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}

	c.JSON(http.StatusOK, &util.Response{
		Success: true,
		Message: "Successfully Updated Post",
	})

}

func (p *UserController) DeleteByID(c *gin.Context) {

	UserID := c.Param("id")

	err := p.service.DeleteUser(UserID)
	if err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}

	util.SuccessJSON(c, http.StatusOK, gin.H{
		"message": "deleted",
	})

}