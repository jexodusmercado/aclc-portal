package service
import (
    "portal/api/repository"
    "portal/models"
)

//Subject SubjectService struct
type SubjectService struct {
    repo repository.SubjectRepository
}

//NewSubjectService : get injected user repo
func NewSubjectService(repo repository.SubjectRepository) SubjectService {
    return SubjectService{
        repo: repo,
    }
}

// Create -> create subject entity
func (s SubjectService) CreateSubject(subject models.SubjectCreation) error {
    return s.repo.Create(subject)
}

// Update -> calls subject update method
func (s SubjectService) Update(subject models.Subject) error {
    return s.repo.Update(subject)
}

//FindAll -> calls Subject repo find all method
func (s SubjectService) FindAll(subject models.Subject, keyword string) (*[]models.Subject, int64, error) {
    return s.repo.FindAll(subject, keyword)
}

// Find -> calls subject repo find method
func (u SubjectService) Find(subject models.Subject) (models.Subject, error) {
    return u.repo.Find(subject)
}
