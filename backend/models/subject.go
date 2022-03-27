package models
import (
    "gorm.io/gorm"
    // "time"
)

//Subject -> Subject struct to save user on database
type Subject struct {
    gorm.Model
    Name    	string	`gorm:"size:200" json:"name"`
    Body		string	`gorm:"size:3000" json:"body"`
	SubjectCode	string 	`gorm:"unique" json:"subject_code"`
    IsActive  	bool	`json:"is_active"`
}

//TableName -> returns the table name of Classroom Model
func (subject *Subject) TableName() string {
    return "subject"
}

// Create Subject -> Request Binding for Subject
type SubjectCreation struct {
	Name 		string `form:"name" binding:"required"`
    SubjectCode	string `form:"subject_code" binding:"required"`
	Body 		string `form:"body"`
}

//ResponseMap -> response map method of User
func (subject *Subject) ResponseMap() map[string]interface{} {
    resp := make(map[string]interface{})

    resp["ID"]  			= subject.ID
    resp["name"]          	= subject.Name
    resp["subject_code"]  	= subject.SubjectCode
    resp["body"]       		= subject.Body
    resp["is_active"]       = subject.IsActive
    resp["created_at"]  	= subject.CreatedAt
    resp["updated_at"]  	= subject.UpdatedAt

    return resp
}