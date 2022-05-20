package models

import (
	"gorm.io/gorm"
	// "time"
)

//Classroom -> Classroom struct to save user on database
type Classroom struct {
	gorm.Model
	TeacherID uint		`form:"teacher_id" json:"teacher_id"`
	SubjectID uint		`json:"subject_id"`
	Title     string  	`gorm:"size:200" json:"title"`
	Body      string  	`gorm:"size:3000" json:"body"`
	IsActive  bool    	`json:"is_active"`
	Subject   Subject
	Teacher   User    	`gorm:"foreignKey:TeacherID"`
	Students  []*User  	`gorm:"many2many:students_classroom"`
	Posts     []Post
}

//TableName -> returns the table name of Classroom Model
func (classroom *Classroom) TableName() string {
	return "classroom"
}

type ClassroomCreation struct {
	ID			uint	`form:"ID"`
	Title     	string 	`form:"title" json:"title" binding:"required"`
	Body      	string 	`form:"body" json:"body"`
	SubjectID 	uint   	`form:"subject_id" json:"subject_id" binding:"required"`
	TeacherID	uint	`form:"teacher_id" json:"teacher_id" binding:"required"`
	StudentsID	[]uint	`form:"students_id" json:"students_id" binding:"required"`
}

//ResponseMap -> response map method of User
func (classroom *Classroom) ResponseMap() map[string]interface{} {
	resp := make(map[string]interface{})
	var students []map[string]interface{}

	for _, s := range classroom.Students {
		students = append(students, s.ResponseStudent())
	}

	resp["id"] 			= classroom.ID
	resp["title"] 		= classroom.Title
	resp["subject_id"] 	= classroom.SubjectID
	resp["body"] 		= classroom.Body
	resp["created_at"] 	= classroom.CreatedAt
	resp["updated_at"] 	= classroom.UpdatedAt
	resp["subject"] 	= classroom.Subject
	resp["teacher_id"] 	= classroom.TeacherID
	resp["teacher"] 	= classroom.Teacher.ResponseMap()
	resp["student"] 	= students
	resp["posts"]		= classroom.Posts

	return resp
}
