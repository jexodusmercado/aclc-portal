package service

import (
	"portal/api/repository"
	"portal/models"
)

type PostService struct {
    repo repository.PostRepository
}

func NewPostService(repo repository.PostRepository) PostService {
    return PostService{
        repo: repo,
    }
}

func (u PostService) Create(post models.PostCreation) error {
    return u.repo.Create(post)
}

func (u PostService) Update(post models.Post) error {
    return u.repo.Update(post)
}

func (u PostService) FindAll(post models.Post, keyword string) (*[]models.Post, int64, error) {
    return u.repo.FindAll(post, keyword)
}

func (u PostService) Find(post models.Post) (models.Post, error) {
    return u.repo.Find(post)
}

func (u PostService) DeletePost(postID string) error {
	return u.repo.DeleteByID(postID)
}