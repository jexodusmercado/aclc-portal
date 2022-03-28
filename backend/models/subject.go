package models
import (
    "gorm.io/gorm"
    // "time"
)

//Subject -> Subject struct to save user on database
type Subject struct {
    gorm.Model
    Name    	    string	`gorm:"size:200" json:"name"`
	Code	        string 	`gorm:"unique" json:"code"`
    Unit            uint    `json:"unit"`
    YearLevelID     uint    `json:"year_level_id"`
    SchoolYearID    uint    `json:"school_year_id"`
    IsActive  	    bool	`json:"is_active"`
}

//TableName -> returns the table name of Subject Model
func (subject *Subject) TableName() string {
    return "subject"
}

//Create Subject
type SubjectCreation struct {
	Name 		    string  `form:"name" binding:"required"`
    Code	        string  `form:"code" binding:"required"`
    YearLevelID     uint    `form:"year_level_id" binding:"required"`
    SchoolYearID    uint    `form:"school_year_id" binding:"required"`
}

//ResponseMap -> response map method of User
func (subject *Subject) ResponseMap() map[string]interface{} {
    resp := make(map[string]interface{})

    resp["ID"]  			= subject.ID
    resp["name"]          	= subject.Name
    resp["code"]  	        = subject.Code
    resp["is_active"]       = subject.IsActive
    resp["created_at"]  	= subject.CreatedAt
    resp["updated_at"]  	= subject.UpdatedAt

    return resp
}