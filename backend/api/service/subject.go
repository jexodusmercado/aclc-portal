package service

import (
	"portal/api/repository"
	"portal/models"
)

type SubjectService struct {
    repo repository.SubjectRepository
}

func NewSubjectService(repo repository.SubjectRepository) SubjectService {
    return SubjectService{
        repo: repo,
    }
}

func (s SubjectService) CreateSubject(subject models.SubjectCreation) error {
    return s.repo.Create(subject)
}

func (s SubjectService) Update(subject models.Subject) error {
    return s.repo.Update(subject)
}

func (s SubjectService) FindAll(subject models.Subject, keyword string) (*[]models.Subject, int64, error) {
    return s.repo.FindAll(subject, keyword)
}

func (u SubjectService) Find(subject models.Subject) (models.Subject, error) {
    return u.repo.Find(subject)
}

func (u SubjectService) DeleteSubject(subjectID string) error {
	return u.repo.DeleteByID(subjectID)
}