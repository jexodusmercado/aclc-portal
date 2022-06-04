package models

import (
	"gorm.io/gorm"
)

//Post -> Post struct to save user on database
type Post struct {
    gorm.Model
	UserID 		uint		`json:"user_id"`
	ClassroomID uint		`json:"classroom_id"`
    Filename    *string      `json:"filename"`
    Extension   *string      `json:"extension"`
    Title		string		`gorm:"size:200" json:"title"`
    Body		string		`gorm:"size:3000" json:"body"`
    IsActive	bool		`json:"is_active"`
    User		User 
    Classroom   Classroom
}

//TableName -> returns the table name of Post Model
func (post *Post) TableName() string {
    return "post"
}

//Create Post -> Request Binding for User Login
type PostCreation struct {
	UserID      uint	`form:"user_id" json:"user_id"`
	ClassroomID uint	`form:"classroom_id" json:"classroom_id"`
    Title       string  `form:"title" json:"title" binding:"required"`
	Body        string	`form:"body" json:"body" binding:"required"`
    Filename    string  `form:"filename" json:"filename"`
    Extension   string  `form:"extension" json:"extension"`
}

//ResponseMap -> response map method of User
func (post *Post) ResponseMap() map[string]interface{} {
    resp := make(map[string]interface{})

    resp["id"]          = post.ID
    resp["user_id"]  	= post.UserID
    resp["title"]       = post.Title
    resp["body"]        = post.Body
    resp["filename"]    = post.Filename
    resp["extension"]   = post.Extension
    resp["created_at"]  = post.CreatedAt
    resp["updated_at"]  = post.UpdatedAt
    resp["is_active"]	= post.IsActive
    resp["author"]      = post.User.ResponseMap()
    // resp["classroom"]   = post.Classroom

    return resp
}