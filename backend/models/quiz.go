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
	Score			int				`json:"score"`
	TotalPoints		int				`json:"total_points"`
	Classroom		Classroom
	QuizContent		[]QuizContent
	Subject			Subject
}

func (quiz *Quiz) TableName() string {
	return "quiz"
}

type QuizCreation struct {
	GradePeriodID	string			`json:"grade_period_id" binding:"required"`
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
	resp["subject"]			= u.Subject
	resp["classroom"]		= u.Classroom
	resp["grade_period_id"]	= u.GradePeriodID
	resp["is_published"]	= u.IsPublished
	resp["end_date"]		= u.EndDate
	resp["students"]		= students
	resp["contents"]		= quizContent
	resp["created_by"]		= u.CreatedBy.BasicUserAndIDResponse()
	resp["students"]		= u.Students
	resp["created_at"]		= u.CreatedAt
	resp["updated_at"]		= u.UpdatedAt

	return resp
}