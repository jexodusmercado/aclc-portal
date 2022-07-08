package models

import (
	"gorm.io/gorm"
)

type Quiz struct {
	gorm.Model
	GradePeriodID	uint			`json:"grade_period_id"`
	GradePeriod		string			`json:"grade_period"`
	IsPublished		bool			`json:"is_published"`
	EndDate			string			`json:"end_date"`
	ClassroomID		uint			`json:"classroom_id"`
	CreatorID		uint			`json:"creator_id"`
	CreatedBy		User			`gorm:"foreignKey:CreatorID;"`
	Students  		[]User			`gorm:"many2many:quizzes_students;"`
	Classroom		Classroom
	QuizContent		[]QuizContent
}

func (quiz *Quiz) TableName() string {
	return "quiz"
}

type QuizCreation struct {
	CreatorID		uint			`json:"creator_id" binding:"required"`
	ClassroomID		uint			`json:"classroom_id" binding:"required"`
	GradePeriod		string			`json:"grade_period" binding:"required"`
	EndDate			string			`json:"end_date" binding:"required"`
}

type UpdateQuiz struct {
	ID				uint			`json:"id" binding:"required"`
	GradePeriod		string			`json:"grade_period"`
	StudentID		uint			`json:"student_id"`
	CreatorID		uint			`json:"creator_id"`
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
	quizCount := 0

	var quizContent []map[string]interface{}
	var students	[]map[string]interface{}

	for _, s := range u.QuizContent {
		quizContent = append(quizContent, s.ResponseMap())
	}

	for _, s := range u.QuizContent {
		if(s.UserInput != "") {
			quizCount = quizCount + 1;
		}

		if(quizCount == len(quizContent)) {
			resp["is_answered"] = true
		} else {
			resp["is_answered"] = false
		}
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
	resp["grade_period"]	= u.GradePeriod
	resp["classroom"]		= u.Classroom.BasicResponse()
	resp["created_by"]		= u.CreatedBy.BasicUserAndIDResponse()

	return resp
}

func (u *Quiz) BasicReponseMap() map[string]interface{} {
    resp := make(map[string]interface{})

	var quizContent []map[string]interface{}

	for _, s := range u.QuizContent {
		quizContent = append(quizContent, s.ResponseMap())
	}


    resp["id"]				= u.ID
	resp["is_published"]	= u.IsPublished
	resp["end_date"]		= u.EndDate
	resp["grade_period"]	= u.GradePeriod
	resp["created_at"]		= u.CreatedAt
	resp["updated_at"]		= u.UpdatedAt
	resp["contentCount"]	= len(quizContent)

	return resp
}

func (u *Quiz) UpdateMap() map[string]interface{} {
    resp := make(map[string]interface{})

	resp["is_published"]	= u.IsPublished
	resp["end_date"]		= u.EndDate
	resp["grade_period"]	= u.GradePeriod

	return resp
}