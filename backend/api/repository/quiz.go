package repository

import (
	"errors"
	"portal/infrastructure"
	"portal/models"
	// "gorm.io/gorm/clause"
)

type QuizRepository struct {
    db infrastructure.Database
}

func NewQuizRepository(db infrastructure.Database) QuizRepository {
    return QuizRepository{
        db: db,
    }
}

func (p QuizRepository) Create(quiz models.QuizCreation) (models.Quiz, error) {
	
	var quizModel models.Quiz
	var creator models.User
	var subject models.Subject
	var classroom models.Classroom

	err := p.db.DB.
	Debug().
	Model(&models.User{}).
	Where(quiz.CreatorID).
	Take(&creator).Error
	if err != nil {
		return quizModel, errors.New("USER NOT EXISTING")
	}

	err = p.db.DB.
	Debug().
	Model(&models.Subject{}).
	Where(quiz.SubjectID).
	Take(&subject).Error
	if err != nil {
		return quizModel, errors.New("SUBJECT NOT EXISTING")
	}

	err = p.db.DB.
	Debug().
	Model(&models.Classroom{}).
	Where(quiz.ClassroomID).
	Take(&classroom).Error
	if err != nil {
		return quizModel, errors.New("CLASSROOM NOT EXISTING")
	}

	quizModel.IsPublished 	= true
	quizModel.EndDate		= quiz.EndDate
	quizModel.CreatorID		= quiz.CreatorID
	quizModel.SubjectID		= quiz.SubjectID
	quizModel.ClassroomID	= quiz.ClassroomID
	quizModel.GradePeriodID = quiz.GradePeriodID

	err = p.db.DB.Create(&quizModel).Error
	if err != nil {
		return quizModel, err
	}

	return quizModel, nil

}

func (p QuizRepository) Find(quiz models.Quiz) (models.Quiz, error) { 

	var quizModel models.Quiz

	err := p.db.DB.
		Debug().
		Preload("Subject").
		Preload("Students").
		Preload("CreatedBy").
		Preload("Classroom").
		Preload("QuizContent").
		Model(&models.Quiz{}).
		Where(&quiz).
		Take(&quizModel).Error
		
	return quizModel, err

}

func (p QuizRepository) FindByClassroomID(quiz models.Quiz) ([]models.Quiz, error) {
	
	var quizzes []models.Quiz
	var totalRows int64 = 0

	err := p.db.DB.
		Debug().
		Preload("Subject").
		Preload("Students").
		Preload("CreatedBy").
		Preload("Classroom").
		Preload("QuizContent").
		Order("created_at desc").
		Model(&models.Quiz{}).
		Where(quiz).
		Find(&quizzes).
		Count(&totalRows).Error

	return quizzes, err
}

