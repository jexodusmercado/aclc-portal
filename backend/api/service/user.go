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
    return u.repo.Create(user)
}

//Login -> Gets validated user
func (u UserService) LoginUser(user models.UserLogin) (*models.User, error) {
    return u.repo.Login(user)
}

// Update -> calls postrepo update method
func (u UserService) Update(user models.User) error {
    return u.repo.Update(user)
}

// Find -> calls post repo find method
func (u UserService) Find(user models.User) (models.User, error) {
    return u.repo.Find(user)
}

//FindAll -> calls post repo find all method
func (u UserService) FindAll(user models.User, keyword string) (*[]models.User, int64, error) {
    return u.repo.FindAll(user, keyword)
}