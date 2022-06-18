package repository

import (
	"portal/infrastructure"
	"portal/models"
	// "gorm.io/gorm/clause"
)

type GradePeriodRepository struct {
    db infrastructure.Database
}

func NewGradePeriodRepository(db infrastructure.Database) GradePeriodRepository {
    return GradePeriodRepository{
        db: db,
    }
}

func (c GradePeriodRepository) Create(grade models.GradePeriodCreation) (models.GradePeriod, error) {

	var gradePeriod models.GradePeriod

	gradePeriod.ClassStanding 	= grade.ClassStanding
	gradePeriod.Exam			= grade.Exam
	gradePeriod.Quiz1			= grade.Quiz1
	gradePeriod.Quiz2			= grade.Quiz2
	gradePeriod.Period			= grade.Period
	gradePeriod.GradeID			= grade.GradeID

    err := c.db.DB.Create(&gradePeriod).Error
	if err != nil {
		return gradePeriod, err
	}

	return gradePeriod, nil

}

func (c GradePeriodRepository) Update(grade models.GradePeriod) (models.GradePeriod, error) {
	
	err := c.db.DB.Updates(&grade).Error
	if err != nil {
		return grade, err
	}

	return grade, nil

}

func (c GradePeriodRepository) Find(grade models.GradePeriod) (models.GradePeriod, error) {

	var gradePeriod models.GradePeriod

	err := c.db.DB.
		Debug().
		Model(&models.GradePeriod{}).
		Where(&grade).
		Take(&gradePeriod).Error

	return gradePeriod, err

}