package models

import (
	"errors"
	"fmt"
	"portal/constants"
	"time"

	"gorm.io/gorm"
	// "time"
)

//Classroom -> Classroom struct to save user on database
type Classroom struct {
	gorm.Model
	TeacherID 		uint   	`form:"teacher_id" json:"teacher_id"`
	SubjectID 		*uint   	`json:"subject_id"`
	Title     		*string 	`gorm:"size:200" json:"title"`
	Body      		*string 	`gorm:"size:3000; default:null;" json:"body"`
	IsActive  		bool    	`json:"is_active"`
	SchoolYearID	uint		`json:"school_year_id"`
	Teacher   		User    	`gorm:"foreignKey:TeacherID"`
	Subject   		Subject
	Students  		[]*User		`gorm:"many2many:students_classroom"`
	Records			[]Grade		
	Posts     		[]Post
	Quizzes			[]Quiz
}

//TableName -> returns the table name of Classroom Model
func (classroom *Classroom) TableName() string {
	return "classroom"
}

type ClassroomCreation struct {
	Title      		*string 	`form:"title" json:"title" binding:"required"`
	Body       		*string 	`form:"body" json:"body"`
	SubjectID  		*uint   	`form:"subject_id" json:"subject_id" binding:"required"`
	TeacherID  		uint   		`form:"teacher_id" json:"teacher_id" binding:"required"`
	SchoolYearID	*uint		`form:"school_year_id" json:"school_year_id" binding:"required"`
	StudentID		[]*uint 	`form:"student_id" json:"student_id" binding:"required"`
}

type ClassroomUpdate struct {
	ID         		uint    `form:"ID"`
	Title      		*string `form:"title" json:"title"`
	Body       		*string `form:"body" json:"body"`
	SubjectID  		*uint   `form:"subject_id" json:"subject_id"`
	TeacherID  		uint   `form:"teacher_id" json:"teacher_id"`
	SchoolYearID	*uint	`form:"school_year_id" json:"school_year_id"`
	StudentID 		[]*uint `form:"student_id" json:"student_id"`
}

//ResponseMap -> response map method of User
func (classroom *Classroom) ResponseMap() map[string]interface{} {
	resp := make(map[string]interface{})
	var students 	[]map[string]interface{}
	var posts 		[]map[string]interface{}
	var grades 		[]map[string]interface{}
	var quizzes 	[]map[string]interface{}

	for _, s := range classroom.Students {
		students = append(students, s.ResponseStudent())
	}

	for _, p := range classroom.Posts {
		posts = append(posts, p.ResponseMap())
	}

	for _, g := range classroom.Records {
		grades = append(grades, g.ResponseMap())
	}

	for _, q := range classroom.Quizzes {
		t := time.Now().Format(constants.DATE_LAYOUT)
		ed, _ := time.Parse(constants.DATE_LAYOUT, q.EndDate)
		now, _ := time.Parse(constants.DATE_LAYOUT, t)
		fmt.Println("----")
		fmt.Println("----")
		fmt.Println(now)
		fmt.Println(ed)
		fmt.Println(now.Before(ed))
		if q.IsPublished && (now.Equal(ed) || now.Before(ed) ) {
			quizzes = append(grades, q.BasicReponseMap())
		}
	}

	resp["id"] 				= classroom.ID
	resp["title"] 			= classroom.Title
	resp["subject_id"] 		= classroom.SubjectID
	resp["body"] 			= classroom.Body
	resp["created_at"] 		= classroom.CreatedAt
	resp["updated_at"]		= classroom.UpdatedAt
	resp["subject"] 		= classroom.Subject.ResponseMap()
	resp["teacher"]	 		= classroom.Teacher.BasicUserAndIDResponse()
	resp["student"] 		= students
	resp["posts"] 			= posts
	resp["grades"]			= grades
	resp["quizzes"]			= quizzes
	resp["totalStudents"]	= len(students)


	return resp
}

func (classroom *Classroom) BasicResponse() map[string]interface{} {
	resp := make(map[string]interface{})

	resp["id"] 			= classroom.ID
	resp["title"] 		= classroom.Title
	resp["body"] 		= classroom.Body
	resp["created_at"] 	= classroom.CreatedAt
	resp["updated_at"]	= classroom.UpdatedAt
	resp["subject"]		= classroom.Subject.ResponseMap()

	return resp
}

func (classroom *Classroom) SubjectAndStudentsResponse() map[string]interface{} {
	resp := make(map[string]interface{})
	var students []map[string]interface{}

	for _, s := range classroom.Students {
		students = append(students, s.BasicUserAndIDResponse())
	}

	resp["id"] 				= classroom.ID
	resp["title"] 			= classroom.Title
	resp["body"] 			= classroom.Body
	resp["created_at"] 		= classroom.CreatedAt
	resp["updated_at"]		= classroom.UpdatedAt
	resp["subject"]			= classroom.Subject.ResponseMap()
	resp["students"]		= students
	resp["totalStudents"]	= len(students)

	return resp
}

func (c *Classroom) AfterCreate(tx *gorm.DB) (err error) {
	
	for _, students := range c.Students {
		var gradeModel Grade

		if c.TeacherID == 0 {
			return errors.New("TEACHER ID IS NULL")
		}

		if c.SubjectID == nil {
			return errors.New("SUBJECT ID IS NULL")
		}
		
		gradeModel.StudentID 	= students.ID
		gradeModel.SchoolYearID = c.SchoolYearID
		gradeModel.TeacherID 	= c.TeacherID
		gradeModel.SubjectID	= *c.SubjectID
		gradeModel.ClassroomID	= c.ID

		err = tx.Create(&gradeModel).Error
		if err != nil {
			return err
		}
	}

	return err
}