package models

import (
	"gorm.io/gorm"
)

type Quiz struct {
	gorm.Model
	GradePeriodID	uint			`json:"grade_period_id"`
	IsPublished		bool			`json:"is_published"`
	EndDate			string			`json:"end_date"`
	SubjectID		uint			`json:"subject_id"`
	ClassroomID		uint			`json:"classroom_id"`
	CreatorID		uint			`json:"creator_id"`
	CreatedBy		User			`gorm:"foreignKey:CreatorID;"`
	Students  		[]User			`gorm:"many2many:quizzes_students;"`
	Classroom		Classroom
	QuizContent		[]QuizContent
	Subject			Subject
}

func (quiz *Quiz) TableName() string {
	return "quiz"
}

type QuizCreation struct {
	GradePeriodID	uint			`json:"grade_period_id" binding:"required"`
	CreatorID		uint			`json:"creator_id" binding:"required"`
	SubjectID		uint			`json:"subject_id" binding:"required"`
	ClassroomID		uint			`json:"classroom_id" binding:"required"`
	EndDate			string			`json:"end_date" binding:"required"`
}

type UpdateQuiz struct {
	GradePeriodID	string			`json:"grade_period_id"`
	StudentID		uint			`json:"student_id"`
	CreatorID		uint			`json:"creator_id"`
	SubjectID		uint			`json:"subject_id"`
	ClassroomID		uint			`json:"classroom_id"`
	IsPublished		bool			`json:"is_published"`
	EndDate			string			`json:"end_date"`
}

type AnsweredBy struct {
	UserID	uint
	QuizID	uint
}

func (u *Quiz) ResponseMap() map[string]interface{} {
    resp := make(map[string]interface{})

	var quizContent []map[string]interface{}
	var students	[]map[string]interface{}

	for _, s := range u.QuizContent {
		quizContent = append(quizContent, s.ResponseMap())
	}

	for _, s := range u.Students {
		students = append(students, s.BasicUserAndIDResponse())
	}

    resp["id"]				= u.ID
	resp["is_published"]	= u.IsPublished
	resp["end_date"]		= u.EndDate
	resp["grade_period_id"]	= u.GradePeriodID
	resp["created_at"]		= u.CreatedAt
	resp["updated_at"]		= u.UpdatedAt
	resp["students"]		= students
	resp["contents"]		= quizContent
	resp["subject"]			= u.Subject.ResponseMap()
	resp["classroom"]		= u.Classroom.BasicResponse()
	resp["created_by"]		= u.CreatedBy.BasicUserAndIDResponse()

	return resp
}

