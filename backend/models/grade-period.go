package models

import (
	"gorm.io/gorm"
)

type GradePeriod struct {
	gorm.Model
	Period			string	`gorm:"default:null;" json:"period"`
	Quiz1			uint	`gorm:"default:0;" json:"quiz1"`
	Quiz2			uint    `gorm:"default:0;" json:"quiz2"`
	Exam			uint	`gorm:"default:0;" json:"exam"`
	ClassStanding	uint	`gorm:"default:0;" json:"class_standing"`
	GradeID        	uint
}

func (grade_period *GradePeriod) TableName() string {
	return "grade_period"
}

type GradePeriodCreation struct {
	Period			string	`form:"period" json:"period" binding:"required"`
	Quiz1			uint	`form:"quiz1" json:"quiz1"`
	Quiz2			uint    `form:"quiz2" json:"quiz2"`
	Exam			uint	`form:"exam" json:"exam"`
	ClassStanding	uint	`form:"class_standing" json:"class_standing"`
	GradeID        	uint	`form:"grade_id"`
}

type UpdateGradePeriodCreation struct {
	ID				uint	`form:"id" json:"id"`
	Period			string	`form:"period" json:"period"`
	Quiz1			uint	`form:"quiz1" json:"quiz1"`
	Quiz2			uint    `form:"quiz2" json:"quiz2"`
	Exam			uint	`form:"exam" json:"exam"`
	ClassStanding	uint	`form:"class_standing" json:"class_standing"`
}

func (u *GradePeriod) ResponseMap() map[string]interface{} {
    resp := make(map[string]interface{})

    resp["id"]				= u.ID
	resp["period"]			= u.Period
	resp["quiz1"]			= u.Quiz1
	resp["quiz2"]			= u.Quiz2
	resp["exam"]			= u.Exam
	resp["class_standing"]	= u.ClassStanding
	resp["created_at"]		= u.CreatedAt
	resp["updated_at"]		= u.UpdatedAt
	
	return resp
}
