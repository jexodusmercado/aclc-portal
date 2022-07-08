package repository

import (
	"errors"
	"portal/infrastructure"
	"portal/models"
	// "gorm.io/gorm/clause"
)

type GradeRepository struct {
    db infrastructure.Database
}

func NewGradeRepository(db infrastructure.Database) GradeRepository {
    return GradeRepository{
        db: db,
    }
}

func (c GradeRepository) Create(grade models.GradeCreation) (models.Grade, error) {

	var teacher 		models.User
	var student 		models.User
	var subject 		models.Subject
	var schoolyear 		models.SchoolYear
	var gradeModel		models.Grade

	err := c.db.DB.
	Debug().
	Model(&models.User{}).
	Where(grade.TeacherID).
	Take(&teacher).Error

	if err != nil {
		return gradeModel, errors.New("TEACHER NOT EXISTING")
	}

	err = c.db.DB.
	Debug().
	Model(&models.User{}).
	Where(grade.StudentID).
	Take(&student).Error
	
	if err != nil {
		return gradeModel, errors.New("STUDENT NOT EXISTING")
	}

	err = c.db.DB.
	Debug().
	Model(&models.Subject{}).
	Where(grade.SubjectID).
	Take(&subject).Error

	if err != nil {
		return gradeModel, errors.New("SUBJECT NOT EXISTING")
	}

	err = c.db.DB.
	Debug().
	Model(&models.SchoolYear{}).
	Where(grade.SchoolYearID).
	Take(&schoolyear).Error

	if err != nil {
		return gradeModel, errors.New("SCHOOL YEAR NOT EXISTING")
	}


    gradeModel.SchoolYear	= schoolyear
	gradeModel.Student  	= student
	gradeModel.Teacher		= teacher
	gradeModel.Subject		= subject

    err = c.db.DB.Create(&gradeModel).Error
	if err != nil {
		return gradeModel, err
	}

	return gradeModel, nil

}

func (c GradeRepository) Find(grade models.Grade) (models.Grade, error) {
	
	var gradeModel models.Grade

	err := c.db.DB.
		Debug().
		Preload("GradePeriods").
		Preload("Student").
		Preload("Teacher").
		Preload("Subject").
		Preload("SchoolYear").
		Model(&models.Grade{}).
		Where(&grade).
		Take(&gradeModel).Error

	return gradeModel, err

}