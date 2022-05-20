package models

import (
	"gorm.io/gorm"
	// "time"
)

//StudentGrade -> StudentGrade struct to save user on database
type StudentGrade struct {
	gorm.Model
	SubjectID    uint
	Subject      Subject
	StudentID    uint
	FacultyID    uint
	CourseID     uint
	SchoolYearID uint
	Faculty      User `gorm:"foreginKey:FacultyID"`
	Student      User `gorm:"foreignKey:StudentID"`
	Course       Course
	SchoolYear   SchoolYear
	PrelimID     uint
	MidtermID    uint
	PrefinalsID  uint
	FinalsID     uint
	Remarks      string
}

//TableName -> returns the table name of StudentGrade Model
func (grade *StudentGrade) TableName() string {
	return "studentgrade"
}

//Create Subject
type StudentGradeRegister struct {
	StudentID    uint `form:"student_id" binding:"required"`
	SubjectID    uint `form:"subject_id" binding:"required"`
	FacultyID    uint `form:"faculty_id" binding:"required"`
	CourseID     uint `form:"course_id" binding:"required"`
	SchoolYearID uint `form:"school_year_id" binding:"required"`
}

//Insert Grade Period
type StudentGradePeriodRegister struct {
	PrelimID    uint `form:"prelim_id"`
	MidtermID   uint `form:"midterm_id"`
	PrefinalsID uint `form:"prefinals_id"`
	FinalsID    uint `form:"finals_id"`
}

// // //ResponseMap -> response map method of User
// func (subject *Subject) ResponseMap() map[string]interface{} {
//     resp := make(map[string]interface{})

//     resp["ID"]  			= subject.ID
//     resp["name"]          	= subject.Name
//     resp["code"]  	        = subject.Code
//     resp["is_active"]       = subject.IsActive
//     resp["created_at"]  	= subject.CreatedAt
//     resp["updated_at"]  	= subject.UpdatedAt

//     return resp
// }
