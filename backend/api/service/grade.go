package service

import (
	"portal/api/repository"
	"portal/models"
)

type GradeService struct {
    repo repository.GradeRepository
}

func NewGradeService(repo repository.GradeRepository) GradeService {
    return GradeService{
        repo: repo,
    }
}

func (u GradeService) Create(grade models.GradeCreation) (models.Grade, error) {
	return u.repo.Create(grade)
	
}

func (u GradeService) Find(grade models.Grade) (models.Grade, error) {
	return u.repo.Find(grade)
}