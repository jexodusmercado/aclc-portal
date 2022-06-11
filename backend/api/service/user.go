package service

import (
	"portal/api/repository"
	"portal/models"
)

type UserService struct {
	repo repository.UserRepository
}

func NewUserService(repo repository.UserRepository) UserService {
	return UserService{
		repo: repo,
	}
}

func (u UserService) CreateUser(user models.UserRegister, schoolyear models.SchoolYear) error {
	return u.repo.CreateUser(user, schoolyear)
}

func (u UserService) CreateStudent(user models.StudentRegister, schoolyear models.SchoolYear) error {
	return u.repo.CreateStudent(user, schoolyear)
}

func (u UserService) LoginUser(user models.UserLogin) (*models.User, error) {
	return u.repo.Login(user)
}

func (u UserService) Update(user models.User) error {
	return u.repo.Update(user)
}

func (u UserService) Find(user models.User) (models.User, error) {
	return u.repo.Find(user)
}

func (u UserService) FindAll(user models.User, keyword, userType, courseId string) (*[]models.User, int64, error) {
	return u.repo.FindAll(user, keyword, userType, courseId)
}

func (u UserService) AddUserToClassroom(user models.User, classroom models.Classroom) error {
	return u.repo.AddUserToClassroom(user, classroom)
}

func (u UserService) DeleteUser(userID string) error {
	return u.repo.DeleteByID(userID)
}