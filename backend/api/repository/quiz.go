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

	err = p.db.DB.Create(&quizModel).Error
	if err != nil {
		return quizModel, err
	}

	return quizModel, nil

}