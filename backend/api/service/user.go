package service

import (
	"portal/api/repository"
	"portal/models"
)

//UserService UserService struct
type UserService struct {
	repo repository.UserRepository
}

//NewUserService : get injected user repo
func NewUserService(repo repository.UserRepository) UserService {
	return UserService{
		repo: repo,
	}
}

//Save -> saves users entity
func (u UserService) CreateUser(user models.UserRegister) error {
	return u.repo.CreateUser(user)
}

//SaveStudent -> saves users entity
func (u UserService) CreateStudent(user models.StudentRegister, schoolyear models.SchoolYear) error {
	return u.repo.CreateStudent(user, schoolyear)
}

//Login -> Gets validated user
func (u UserService) LoginUser(user models.UserLogin) (*models.User, error) {
	return u.repo.Login(user)
}

// Update -> calls user update method
func (u UserService) Update(user models.User) error {
	return u.repo.Update(user)
}

// Find -> calls post repo find method
func (u UserService) Find(user models.User) (models.User, error) {
	return u.repo.Find(user)
}

//FindAll -> calls post repo find all method
func (u UserService) FindAll(user models.User, keyword, userType, courseId string) (*[]models.User, int64, error) {
	return u.repo.FindAll(user, keyword, userType, courseId)
}

//Adding Users to classroom -> saves many2many relations from users to classroom
func (u UserService) AddUserToClassroom(user models.User, classroom models.Classroom) error {
	return u.repo.AddUserToClassroom(user, classroom)
}
