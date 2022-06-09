package service

import (
	"portal/api/repository"
	"portal/models"
	// "portal/models"
)

type CommentService struct {
	repo repository.CommentRepository
}

func NewCommentService(repo repository.CommentRepository) CommentService {
	return CommentService{
		repo: repo,
	}
}

func (c CommentService) CreateComment(comment models.CommentCreation) error {
	return c.repo.Create(comment)
}

func (c CommentService) FindAllByPostID(PostID string) ([]models.Comment, int64, error) {
	return c.repo.FindAllByPostID(PostID)
}

func (c CommentService) UpdateComment(comment models.Comment) (models.Comment, error) {
	return c.repo.Update(comment)
}

func (c CommentService) DeleteComment(CommentID string) error {
	return c.repo.DeleteByID(CommentID)
}
