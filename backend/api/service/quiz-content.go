package service

import (
	"portal/api/repository"
	"portal/models"
)

type QuizContentService struct {
    repo repository.QuizContentRepository
}

func NewQuizContentService(repo repository.QuizContentRepository) QuizContentService {
    return QuizContentService{
        repo: repo,
    }
}

func (u QuizContentService) Create(quiz models.QuizContentCreation) (models.QuizContent, error) {
	return u.repo.Create(quiz)
}

func (u QuizContentService) Answer(quiz models.UserInputQuizContent) error {
    var answer models.AnsweredBy

    answer.QuizID = quiz.QuizID
    answer.UserID = quiz.UserID

    err := u.repo.AnsweredBy(answer)
    if err != nil {
        return err
    }
    
    return u.repo.Answer(quiz)
}
