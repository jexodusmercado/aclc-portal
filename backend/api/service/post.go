package service
import (
    "portal/api/repository"
    "portal/models"
)

//Post PostService struct
type PostService struct {
    repo repository.PostRepository
}

//NewPostService : get injected post repo
func NewPostService(repo repository.PostRepository) PostService {
    return PostService{
        repo: repo,
    }
}

// Create -> create classroom entity
func (u PostService) Create(post models.PostCreation) error {
    return u.repo.Create(post)
}

// Update -> calls postrepo update method
func (u PostService) Update(post models.Post) error {
    return u.repo.Update(post)
}

//FindAll -> calls post repo find all method
func (u PostService) FindAll(post models.Post, keyword string) (*[]models.Post, int64, error) {
    return u.repo.FindAll(post, keyword)
}

// Find -> calls post repo find method
func (u PostService) Find(post models.Post) (models.Post, error) {
    return u.repo.Find(post)
}
