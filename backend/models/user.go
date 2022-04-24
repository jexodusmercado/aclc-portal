package models
import (
	"gorm.io/gorm"
	"time"
)

//User -> User struct to save user on database
type User struct {
    gorm.Model
    FirstName   string          `json:"first_name"`
    LastName    string          `json:"last_name"`
    Email       string          `gorm:"unique;default:null;" json:"email,omitempty"`
    Username    string          `gorm:"unique" json:"username"`
    Password    string          `json:"password"`
    Birthday    time.Time       `json:"birthday"`
	Type	    string	        `json:"type"`
    IsActive    bool            `json:"is_active"`
    Subjects    []*Subject      `gorm:"many2many:user_subjects;"`
    CourseID    uint            `gorm:"default:null;" json:"course_id,omitempty"`
    Course      Course
    SchoolYear  []*SchoolYear   `gorm:"many2many:UserSchoolYear" json:"school_year,omitempty"`
}
    // Classrooms  []*Classroom    `gorm:"many2many:user_class;"`
    // Posts       []*Post

//TableName -> returns the table name of User Model
func (user *User) TableName() string {
    return "user"
}

//UserLogin -> Request Binding for User Login
type UserLogin struct {
    Username string `form:"username" json:"username" binding:"required"`
    Password string `form:"password" json:"password" binding:"required"`
}

//AddUserClass -> request binding for AddUserClass
type AddUserClass struct {
    UserID      uint `form:"user_id" json:"user_id" binding:"required"`
    ClassroomID uint `form:"classroom_id" json:"classroom_id" binding:"required"`
}

//UserRegister -> Request Binding for User Register
type UserRegister struct {
    Username  string    `form:"username" json:"username" binding:"required,numeric"`
    Password  string    `form:"password" json:"password"`
    FirstName string    `form:"first_name" json:"first_name" binding:"required"`
    LastName  string    `form:"last_name" json:"last_name" binding:"required"`
    Birthday  time.Time `form:"birthday" json:"birthday" binding:"required"`
	Type	  string    `form:"type" json:"type" binding:"required"`
    Email     string    `form:"email" json:"email"`
}

type StudentRegister struct {
    Username  string    `form:"username" json:"username" binding:"required,numeric"`
    Password  string    `form:"password" json:"password"`
    FirstName string    `form:"first_name" json:"first_name" binding:"required"`
    LastName  string    `form:"last_name" json:"last_name" binding:"required"`
    Birthday  time.Time `form:"birthday" json:"birthday" binding:"required"`
	Type	  string    `form:"type" json:"type" binding:"required"`
    Email     string    `form:"email" json:"email"`
    CourseID  uint      `form:"course_id" json:"course_id"`
}


//ResponseMap -> response map method of User
func (user *User) ResponseMap() map[string]interface{} {
    resp := make(map[string]interface{})

    resp["id"]          = user.ID
    resp["email"]       = user.Email
    resp["username"]    = user.Username
    resp["birthday"]    = user.Birthday
    resp["first_name"]  = user.FirstName
    resp["last_name"]   = user.LastName
    resp["type"]        = user.Type
    resp["is_active"]   = user.IsActive
    resp["created_at"]  = user.CreatedAt
    resp["updated_at"]  = user.UpdatedAt

    return resp
}

func (user *User) ResponseStudent() map[string]interface{} {
    resp := make(map[string]interface{})


    resp["id"]          = user.ID
    resp["email"]       = user.Email
    resp["username"]    = user.Username
    resp["birthday"]    = user.Birthday
    resp["first_name"]  = user.FirstName
    resp["last_name"]   = user.LastName
    resp["type"]        = user.Type
    resp["is_active"]   = user.IsActive
    resp["created_at"]  = user.CreatedAt
    resp["updated_at"]  = user.UpdatedAt
    resp["course"]      = user.Course.ResponseMap()

    return resp
}