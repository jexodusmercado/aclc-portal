package models
import (
    "gorm.io/gorm"
    // "time"
)

//YearLevel -> YearLevel struct to save user on database
type YearLevel struct {
    gorm.Model
    YearLevel		string	    `json:"year_level"`
    IsActive  	    bool	    `json:"is_active"`
}

//TableName -> returns the table name of YearLevel Model
func (yearLevel *YearLevel) TableName() string {
    return "yearlevel"
}

//Create Subject
type YearLevelCreation struct {
	YearLevel	string  `form:"year_level" binding:"required"`
}

//ResponseMap -> response map method of User
func (year *YearLevel) ResponseMap() map[string]interface{} {
    resp := make(map[string]interface{})

    resp["ID"]  			= year.ID
    resp["year_level"]      = year.YearLevel
    resp["is_active"]       = year.IsActive
    resp["created_at"]  	= year.CreatedAt
    resp["updated_at"]  	= year.UpdatedAt

    return resp
}