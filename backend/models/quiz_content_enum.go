package models

import (
	"gorm.io/gorm"
)

type QuizContentEnum struct {
	gorm.Model
	QuizContentID	uint				`json:"quiz_content_id"`
	Choice			string				`json:"choice"`
}

func (quiz_content_enum *QuizContentEnum) TableName() string {
	return "quiz_content_enum"
}

type QuizContentEnumCreation struct {
	QuizContentID	uint	`json:"quiz_content_id" binding:"required"`
	Choice			string	`json:"choice" binding:"required"`
}