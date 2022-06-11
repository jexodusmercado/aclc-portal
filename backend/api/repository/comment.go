package repository

import (
	"portal/infrastructure"
	"portal/models"
)

type CommentRepository struct {
	db infrastructure.Database
}

func NewCommentRepository(db infrastructure.Database) CommentRepository {
	return CommentRepository{
		db: db,
	}
}

func (c CommentRepository) Create(comment models.CommentCreation) error {

	var dbComment models.Comment
	var post models.Post
	var user models.User

	err := c.db.DB.
		Debug().
		Model(&models.Post{}).
		Where("ID = ?", comment.PostID).
		Take(&post).Error
	if err != nil {
		return err
	}

	err = c.db.DB.
		Debug().
		Model(&models.User{}).
		Where("ID = ?", comment.UserID).
		Take(&user).Error
	if err != nil {
		return err
	}

	dbComment.Message = comment.Message
	dbComment.PostID = comment.PostID
	dbComment.UserID = comment.UserID
	dbComment.Post = post
	dbComment.User = user

	return c.db.DB.Create(&dbComment).Error

}

func (c CommentRepository) Update(comment models.Comment) error {

	err := c.db.DB.
		Model(&comment).
		Updates(&comment).Error

	return err

}

func (c CommentRepository) FindAllByPostID(PostID string) ([]models.Comment, int64, error) {

	var comments []models.Comment
	var totalRows int64 = 0

	err := c.db.DB.
		Preload("Post").
		Preload("User").
		Order("created_at desc").
		Model(&models.Comment{}).
		Where("post_id = ?", PostID).
		Find(&comments).
		Count(&totalRows).Error

	return comments, totalRows, err
}

func (c CommentRepository) FindByID(CommentID string) (models.Comment, error) {
	var comment models.Comment

	err := c.db.DB.First(&comment, CommentID).Error
	if err != nil {
		return comment, err
	}

	return comment, nil

}

func (c CommentRepository) DeleteByID(CommentID string) error {

	return c.db.DB.Delete(&models.Comment{}, CommentID).Error

}
