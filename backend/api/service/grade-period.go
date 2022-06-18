package service

import (
	"portal/api/repository"
	"portal/models"
)

type GradePeriodService struct {
    repo repository.GradePeriodRepository
}

func NewGradePeriodService(repo repository.GradePeriodRepository) GradePeriodService {
    return GradePeriodService{
        repo: repo,
    }
}

func (u GradePeriodService) Create(grade models.GradePeriodCreation) (models.GradePeriod, error) {
	return u.repo.Create(grade)
	
}

func (u GradePeriodService) Update(grade models.GradePeriod) (models.GradePeriod, error) {
	return u.repo.Update(grade)
}

func (u GradePeriodService) Find(grade models.GradePeriod) (models.GradePeriod, error) {
	return u.repo.Find(grade)
}