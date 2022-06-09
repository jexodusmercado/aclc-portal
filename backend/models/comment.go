package models

import (
	"gorm.io/gorm"
)

type Comment struct {
	gorm.Model
	PostID  *uint  `form:"teacher_id" json:"teacher_id"`
	UserID  *uint  `form:"user_id" json:"user_id"`
	Message string `gorm:"size:3000" json:"body"`
	Post    Post
	User    User
}

func (comment *Comment) TableName() string {
	return "comment"
}

type CommentCreation struct {
	PostID  *uint  `form:"post_id" json:"post_id" binding:"required"`
	UserID  *uint  `form:"user_id" json:"user_id" binding:"required"`
	Message string `form:"message" json:"message" binding:"required"`
}

func (comment *Comment) ResponseMap() map[string]interface{} {
	resp := make(map[string]interface{})

	resp["id"] = comment.ID
	resp["post_id"] = comment.PostID
	resp["user_id"] = comment.UserID
	resp["user"] = comment.User
	resp["message"] = comment.Message
	resp["created_at"] = comment.CreatedAt
	resp["updated_at"] = comment.UpdatedAt

	return resp
}
