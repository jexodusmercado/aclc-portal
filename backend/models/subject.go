package models

import (
	"gorm.io/gorm"
	// "time"
)

//Subject -> Subject struct to save user on database
type Subject struct {
	gorm.Model
	UserID       uint
	Name         string       `gorm:"size:200" json:"name"`
	Code         string       `gorm:"unique" json:"code"`
	Unit         uint         `json:"unit"`
	IsActive     bool         `json:"is_active"`
	Classrooms   []*Classroom `gorm:"many2many:classroom_subject"`

	// Users           []*User    `gorm:"many2many:user_subjects;"`
}

//TableName -> returns the table name of Subject Model
func (subject *Subject) TableName() string {
	return "subject"
}

//Create Subject
type SubjectCreation struct {
	Name         string `form:"name" json:"name" binding:"required"`
	Code         string `form:"code" json:"code" binding:"required"`
	Unit         uint   `form:"unit" json:"unit" binding:"required"`
	SchoolYearID uint   `form:"school_year_id" json:"school_year_id" binding:"required"`
}

//ResponseMap -> response map method of User
func (subject *Subject) ResponseMap() map[string]interface{} {
	resp := make(map[string]interface{})

	resp["ID"] 			= subject.ID
	resp["name"] 		= subject.Name
	resp["code"] 		= subject.Code
	resp["is_active"] 	= subject.IsActive
	resp["created_at"] 	= subject.CreatedAt
	resp["updated_at"] 	= subject.UpdatedAt

	return resp
}
