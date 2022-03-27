package service
import (
    "portal/api/repository"
    "portal/models"
)

//Classroom ClassroomService struct
type ClassroomService struct {
    repo repository.ClassroomRepository
}

//NewClassroomService : get injected user repo
func NewClassroomService(repo repository.ClassroomRepository) ClassroomService {
    return ClassroomService{
        repo: repo,
    }
}

// Create -> create classroom entity
func (u ClassroomService) CreateClassroom(classroom models.ClassroomCreation) error {
    return u.repo.Create(classroom)
}

// Update -> calls postrepo update method
func (u ClassroomService) Update(classroom models.Classroom) error {
    return u.repo.Update(classroom)
}

//FindAll -> calls classroom repo find all method
func (u ClassroomService) FindAll(classroom models.Classroom, keyword string) (*[]models.Classroom, int64, error) {
    return u.repo.FindAll(classroom, keyword)
}

// Find -> calls post repo find method
func (u ClassroomService) Find(classroom models.Classroom) (models.Classroom, error) {
    return u.repo.Find(classroom)
}
