package models

import (
	"gorm.io/gorm"
)

type QuizContent struct {
	gorm.Model
	QuizID			uint				`json:"quiz_id"`
	QuestionType	string				`json:"question_type"`
	Question		string				`json:"question"`
	Answer			string				`json:"answer"`
	QuizContentEnum	[]QuizContentEnum			
	UserInput		string				`gorm:"default:null;" json:"user_input"`
}

func (quiz_content *QuizContent) TableName() string {
	return "quiz_content"
}

type QuizContentCreation struct {
	QuizID			uint	`json:"quiz_id" binding:"required"`
	QuestionType	string	`json:"question_type"`
	Question		string	`json:"question" binding:"required"`
	Answer			string	`json:"answer" binding:"required"`
}

type UserInputQuizContent struct {
	ID			uint	`form:"id" json:"id" binding:"required"`
	QuizID		uint	`form:"quiz_id" json:"quiz_id" binding:"required"`
	UserInput 	string	`form:"user_input" json:"user_input" binding:"required"`
	UserID		uint	`form:"user_id" json:"user_id" binding:"required"`
}

type QuizContentUpdates struct {
	ID					uint	`json:"content_id" binding:"required"`	
	AnswerQuestionType	string	`json:"question_type"`
	Question			string	`json:"question" binding:"required"`
	Answer				string	`json:"answer" binding:"required"`
}

func (u *QuizContent) ResponseMap() map[string]interface{} {
    resp := make(map[string]interface{})

    resp["id"]				= u.ID
	resp["quiz_id"]			= u.QuizID
	resp["question_type"]	= u.QuestionType
	resp["question"]		= u.Question
	resp["answer"]			= u.Answer
	resp["QuizContentEnum"] = u.QuizContentEnum
	resp["user_input"]		= u.UserInput
	resp["created_at"]		= u.CreatedAt
	resp["updated_at"]		= u.UpdatedAt

	return resp
}