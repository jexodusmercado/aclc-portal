package service

import (
	"portal/api/repository"
	"portal/models"
)

type ClassroomService struct {
	repo repository.ClassroomRepository
}

func NewClassroomService(repo repository.ClassroomRepository) ClassroomService {
	return ClassroomService{
		repo: repo,
	}
}

func (u ClassroomService) CreateClassroom(classroom models.ClassroomCreation, students []models.User) error {
	return u.repo.Create(classroom, students)
}

func (u ClassroomService) Update(classroom models.ClassroomUpdate) (models.Classroom, error) {
	return u.repo.Update(classroom)
}

func (s UserService) FindUser(user models.User) (models.User, error) {
	return s.repo.Find(user)
}

func (u ClassroomService) FindAll(classroom models.Classroom, keyword string) (*[]models.Classroom, int64, error) {
	return u.repo.FindAll(classroom, keyword)
}

func (u ClassroomService) Find(classroom models.Classroom) (models.Classroom, error) {
	return u.repo.Find(classroom)
}

func (u ClassroomService) FindByTeacherID(classroom models.Classroom, keyword string) ([]models.Classroom, int64, error) {
	return u.repo.FindByTeacherID(classroom, keyword)
}

func (u ClassroomService) DeleteClassroom(classroomID string) error {
	return u.repo.DeleteByID(classroomID)
}