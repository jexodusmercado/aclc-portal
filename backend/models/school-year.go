package models
import (
    "gorm.io/gorm"
    // "time"
)

//SchoolYear -> SchoolYear struct to save user on database
type SchoolYear struct {
    gorm.Model
    SchoolYear		string	`json:"school_year"`
    Semester  	    string	`json:"semester"`
	IsActive		bool	`json:"is_active"`		
    Users           []User  `gorm:"many2many:UserSchoolYear" json:"users"`
}

//TableName -> returns the table name of SchoolYear Model
func (school *SchoolYear) TableName() string {
    return "schoolyear"
}

//Create SchoolYear
type SchoolYearCreation struct {
	YearLevel	string  `form:"year_level" binding:"required"`
	Semester	string  `form:"semester" binding:"required"`
}

//ResponseMap -> response map method of User
func (school *SchoolYear) ResponseMap() map[string]interface{} {
    resp := make(map[string]interface{})

    resp["ID"]  			= school.ID
    resp["school_year"]     = school.SchoolYear
    resp["semester"]	    = school.Semester
    resp["is_active"]       = school.IsActive
    resp["created_at"]  	= school.CreatedAt
    resp["updated_at"]  	= school.UpdatedAt

    return resp
}

func (school *SchoolYear) UserResponseMap() map[string]interface{} {
    resp := make(map[string]interface{})

    resp["ID"]  			= school.ID
    resp["school_year"]     = school.SchoolYear
    resp["semester"]	    = school.Semester
    resp["is_active"]       = school.IsActive
    resp["created_at"]  	= school.CreatedAt
    resp["updated_at"]  	= school.UpdatedAt
    resp["users"]           = school.Users

    return resp
}