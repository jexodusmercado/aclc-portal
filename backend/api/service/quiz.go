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

func (u QuizService) Find(quiz models.Quiz) (models.Quiz, error) {
    return u.repo.Find(quiz)
}

func (u QuizService) FindAll() ([]models.Quiz, int64, error) {
    return u.repo.FindAll()
}

func (u QuizService) FindByClassroomID(quiz models.Quiz) ([]models.Quiz, error) {
    return u.repo.FindByClassroomID(quiz)
} 

func (u QuizService) FindByCreatorID(quiz models.Quiz) ([]models.Quiz, error) {
    return u.repo.FindByCreatorID(quiz)
}