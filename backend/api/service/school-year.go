package service

import (
	"portal/api/repository"
	"portal/models"
)

type SchoolYearService struct {
	repo repository.SchoolYearRepository
}

func NewSchoolYearService(repo repository.SchoolYearRepository) SchoolYearService {
	return SchoolYearService{
		repo: repo,
	}
}

func (u SchoolYearService) Create(schoolyear models.SchoolYearCreation) error {
	return u.repo.Create(schoolyear)
}

func (u SchoolYearService) Update(schoolyear models.SchoolYear) error {
	return u.repo.Update(schoolyear)
}

func (u SchoolYearService) FindAll(schoolyear models.SchoolYear, keyword string) (*[]models.SchoolYear, int64, error) {
	return u.repo.FindAll(schoolyear, keyword)
}

func (u SchoolYearService) Find(schoolyear models.SchoolYear) (models.SchoolYear, error) {
	return u.repo.Find(schoolyear)
}

func (u SchoolYearService) GetActiveYear() (models.SchoolYear, error) {
	return u.repo.GetActiveYear()
}

func (u SchoolYearService) ChangeActiveYear(schoolyear models.SchoolYear) error {
	return u.repo.ChangeActiveYear(schoolyear)
}

func (u SchoolYearService) DeleteSchoolYear(schoolyearID string) error {
	return u.repo.DeleteByID(schoolyearID)
}