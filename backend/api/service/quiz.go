package service

import (
	"portal/api/repository"
	"portal/models"
)

type QuizService struct {
    repo repository.QuizRepository
}

func NewQuizService(repo repository.QuizRepository) QuizService {
    return QuizService{
        repo: repo,
    }
}

func (u QuizService) Create(quiz models.QuizCreation) (models.Quiz, error) {
	return u.repo.Create(quiz)
}