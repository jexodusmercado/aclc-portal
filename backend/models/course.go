package models
import (
    "gorm.io/gorm"
    // "time"
)

//Course -> Course struct to save user on database
type Course struct {
    gorm.Model
    Name		    string	`gorm:"unique" json:"name"`
	Description	    string	`json:"description"`
    IsActive	    bool	`json:"is_active"`
    Users           []User
    SchoolYears     []SchoolYear `gorm:"many2many:CourseSchoolYear" json:"school_years"`
}

//TableName -> returns the table name of Course Model
func (course *Course) TableName() string {
    return "course"
}

//Create Subject
type CourseCreation struct {
	Name		    string	`form:"name" binding:"required"`
	Description	    string	`form:"description" binding:"required"`
    SchoolYearID    uint    `form:"schoolyear_id" json:"schoolyear_id" binding:"required"`
}

//ResponseMap -> response map method of User
func (course *Course) ResponseMap() map[string]interface{} {
    resp := make(map[string]interface{})

    resp["ID"]  			= course.ID
    resp["name"]          	= course.Name
    resp["description"]		= course.Description
    resp["is_active"]       = course.IsActive
    resp["created_at"]  	= course.CreatedAt
    resp["updated_at"]  	= course.UpdatedAt

    return resp
}

func (course *Course) UserResponseMap() map[string]interface{} {
    resp := make(map[string]interface{})

    resp["ID"]  			= course.ID
    resp["name"]          	= course.Name
    resp["description"]		= course.Description
    resp["is_active"]       = course.IsActive
    resp["users"]           = course.Users
    resp["created_at"]  	= course.CreatedAt
    resp["updated_at"]  	= course.UpdatedAt

    return resp
} 