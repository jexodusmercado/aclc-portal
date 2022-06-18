package models

import (
	"portal/constants"

	"gorm.io/gorm"
)

type Grade struct {
	gorm.Model
	SubjectID		uint			`json:"subject_id"`
	SchoolYearID	uint			`json:"school_year_id"`
	StudentID		uint			`json:"student_id"`
	TeacherID		uint			`json:"teacher_id"`
	GradePeriods	[]GradePeriod	`json:"grade_periods"`
	ClassroomID		uint
	Student        	User			
	Teacher        	User			
	Subject   		Subject
	SchoolYear		SchoolYear
}

func (grade *Grade) TableName() string {
	return "grade"
}

type GradeCreation struct {
	TeacherID		uint	`form:"teacher_id" json:"teacher_id" binding:"required"`
	StudentID		uint	`form:"student_id" json:"student_id" binding:"required"`
	SubjectID		uint	`form:"subject_id" json:"subject_id" binding:"required"`
	SchoolYearID	uint	`form:"school_year_id" json:"school_year_id" binding:"required"`
}

func (u *Grade) ResponseMap() map[string]interface{} {
    resp := make(map[string]interface{})

	var periods []map[string]interface{}

	for _, s := range u.GradePeriods {
		periods = append(periods, s.ResponseMap())
	}

    resp["id"]				= u.ID
	resp["student"]			= u.Student.BasicUserAndIDResponse()
	resp["Teacher"]			= u.Teacher.BasicUserAndIDResponse()
	resp["subject"]			= u.Subject.ResponseMap()
	resp["school_year"]		= u.SchoolYear.ResponseMap()
	resp["grade_periods"]	= periods
	resp["created_at"]		= u.CreatedAt
	resp["updated_at"]		= u.UpdatedAt

	return resp
}

func (g Grade) AfterSave(tx *gorm.DB) (err error) {

	for _, v := range constants.PERIOD_TYPE {
		
		var gradePeriod GradePeriod

		gradePeriod.Period = v
		gradePeriod.GradeID = g.ID

		err = tx.Create(&gradePeriod).Error
		if err != nil {
			return err
		}

	}

	return err
}