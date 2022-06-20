package repository

import (
	"errors"
	"fmt"
	"portal/infrastructure"
	"portal/models"
	"strings"
	// "gorm.io/gorm/clause"
)

type QuizContentRepository struct {
    db infrastructure.Database
}

func NewQuizContentRepository(db infrastructure.Database) QuizContentRepository {
    return QuizContentRepository{
        db: db,
    }
}

func (p QuizContentRepository) Create(quiz models.QuizContentCreation) (models.QuizContent, error) {
	
	var quizContent models.QuizContent

	quizContent.QuizID			= quiz.QuizID
	quizContent.QuestionType 	= quiz.QuestionType
	quizContent.Question 		= quiz.Question
	quizContent.Answer 			= strings.ToLower(strings.TrimSpace(quiz.Answer))

	err := p.db.DB.Create(&quizContent).Error
	if err != nil {
		return quizContent, err
	}

	return quizContent, nil

}

func (p QuizContentRepository) Answer(quiz models.UserInputQuizContent) error {
	var quizContent models.QuizContent

	quizContent.ID = quiz.ID
	userInput := strings.ToLower(strings.TrimSpace(quiz.UserInput))

	err := p.db.DB.Model(quizContent).Update("UserInput", userInput).Error
	if err != nil {
		return errors.New("CANNOT PROCESS ANSWER")
	}


	return nil
}

func (p QuizContentRepository) AnsweredBy(answer models.AnsweredBy) error {

	var quiz 	models.Quiz
	var user 	models.User

	err := p.db.DB.
		Model(&models.User{}).
		Where("ID = ?", answer.UserID).
		Take(&user).Error
		
	if err != nil {
		return errors.New("CANNOT FIND USER")
	}

	quiz.ID = answer.QuizID

	err = p.db.DB.
	Model(&quiz).
	Association("Students").
	Append(&user)
	if err != nil {
		fmt.Println(err)
		return errors.New("CANNOT APPEND STUDENT")
	}

	return nil

}