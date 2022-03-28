package models
import (
    "gorm.io/gorm"
    // "time"
)

//Class -> Class struct to save user on database
type Class struct {
    gorm.Model
    YearLevelID	string	`json:"year_level_id"`
	Classname	string	`json:"classname"`
    IsActive	bool	`json:"is_active"`
}

//TableName -> returns the table name of Class Model
func (class *Class) TableName() string {
    return "class"
}

//Create Subject
type ClassCreation struct {
	YearLevelID	string	`form:"year_level_id" binding:"required"`
	Classname	string	`form:"classname" binding:"required"`
}

//ResponseMap -> response map method of User
func (class *Class) ResponseMap() map[string]interface{} {
    resp := make(map[string]interface{})

    resp["ID"]  			= class.ID
    resp["year_level_id"]   = class.YearLevelID
    resp["classname"]     	= class.Classname
    resp["is_active"]       = class.IsActive
    resp["created_at"]  	= class.CreatedAt
    resp["updated_at"]  	= class.UpdatedAt

    return resp
}