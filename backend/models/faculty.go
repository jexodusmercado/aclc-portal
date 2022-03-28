package models
import (
	"gorm.io/gorm"
	"time"
)

//Faculty -> Faculty struct to save user on database
type Faculty struct {
    gorm.Model
	FacultyID		uint			`gorm:"unique" json:"faculty_id"`
    FirstName   	string          `json:"first_name"`
	MiddleName		string			`json:"middle_name,omitempty"`
    LastName    	string          `json:"last_name"`
    Email       	string          `gorm:"unique;default:null;" json:"email,omitempty"`
	FacultyLevel	string			`json:"faculty_leve,omitempty"`
    Password    	string          `json:"password"`
    IsActive    	bool            `json:"is_active"`
    Birthday    	time.Time       `json:"birthday"`
}

//TableName -> returns the table name of User Model
func (faculty *Faculty) TableName() string {
    return "faculty"
}

//FacultyLogin -> Request Binding for Login
type FacultyLogin struct {
    FacultyID 	string `form:"faculty_id" json:"faculty_id" binding:"required"`
    Password 	string `form:"password" json:"password" binding:"required"`
}

//FacultyRegister -> Request Binding for Faculty Register
type FacultyRegister struct {
    Username  string    `form:"username" json:"username" binding:"required,numeric"`
    Password  string    `form:"password" json:"password"`
    FirstName string    `form:"first_name" json:"first_name" binding:"required"`
    LastName  string    `form:"last_name" json:"last_name" binding:"required"`
    Birthday  time.Time `form:"birthday" json:"birthday" binding:"required"`
    Email     string    `form:"email" json:"email"`
}

//ToggleFacultyActive -> Request Binding for Toggle Active Faculty
type ToggleFacultyActive struct {
    ID       string `form:"id" json:"id" binding:"required"`
    IsActive string `form:"is_active" json:"is_active" binding:"required"`
}

//ResponseMap -> response map method of Faculty
func (u *Faculty) ResponseMap() map[string]interface{} {
    resp := make(map[string]interface{})

    resp["id"]          	= u.ID
    resp["email"]       	= u.Email
    resp["birthday"]    	= u.Birthday
    resp["first_name"]  	= u.FirstName
    resp["middle_name"] 	= u.MiddleName
    resp["last_name"]   	= u.LastName
    resp["faculty_id"]   	= u.FacultyID
    resp["faculty_level"]   = u.FacultyLevel
    resp["is_active"]   	= u.IsActive
    resp["created_at"]  	= u.CreatedAt
    resp["updated_at"]  	= u.UpdatedAt

    return resp
}