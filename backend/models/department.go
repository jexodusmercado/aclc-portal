package models
import (
    "gorm.io/gorm"
    // "time"
)

//Class -> Class struct to save user on database
type Department struct {
    gorm.Model
    Name		string	`json:"year_level_id"`
	Description	string	`json:"classname"`
    IsActive	bool	`json:"is_active"`
}

//TableName -> returns the table name of Class Model
func (department *Department) TableName() string {
    return "department"
}

//Create Subject
type DepartmentCreation struct {
	YearLevelID	string	`form:"year_level_id" binding:"required"`
	Classname	string	`form:"classname" binding:"required"`
}

//ResponseMap -> response map method of User
func (department *Department) ResponseMap() map[string]interface{} {
    resp := make(map[string]interface{})

    resp["ID"]  			= department.ID
    resp["name"]   			= department.Name
    resp["description"]     = department.Description
    resp["is_active"]       = department.IsActive
    resp["created_at"]  	= department.CreatedAt
    resp["updated_at"]  	= department.UpdatedAt

    return resp
}