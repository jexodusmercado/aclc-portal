package models
import (
    "gorm.io/gorm"
    // "time"
)

//Classroom -> Classroom struct to save user on database
type Classroom struct {
    gorm.Model
	SubjectID  uint	    `json:"subject_id"`
    Title      string   `gorm:"size:200" json:"title"`
    Body       string   `gorm:"size:3000" json:"body"`
    IsActive   bool     `json:"is_active"`
    Subject    Subject
    Users      []*User  `gorm:"many2many:user_class"`
    Posts      []*Post
}

//TableName -> returns the table name of Classroom Model
func (classroom *Classroom) TableName() string {
    return "classroom"
}

//Create Classroom -> Request Binding for User Login
type ClassroomCreation struct {
	SubjectID uint      `form:"subject_id" json:"subject_id" binding:"required"`
    Title     string    `form:"title" json:"title" binding:"required"`
	Body	  string    `form:"body" json:"body"`
}

//ResponseMap -> response map method of User
func (classroom *Classroom) ResponseMap() map[string]interface{} {
    resp := make(map[string]interface{})

    resp["id"]          = classroom.ID
    resp["subject_id"]  = classroom.SubjectID
    resp["title"]       = classroom.Title
    resp["body"]        = classroom.Body
    resp["created_at"]  = classroom.CreatedAt
    resp["updated_at"]  = classroom.UpdatedAt
    resp["subject"]     = classroom.Subject
    resp["users"]       = classroom.Users
    resp["posts"]       = classroom.Posts

    return resp
}