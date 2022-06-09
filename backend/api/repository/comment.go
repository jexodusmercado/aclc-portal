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

func (c CommentRepository) FindAllByPostID(comment models.Comment) ([]models.Comment, int64, error) {

	var comments []models.Comment
	var totalRows int64 = 0

	err := c.db.DB.
		Preload("Post").
		Preload("User").
		Order("created_at desc").
		Model(&models.Comment{}).
		Where("post_id = ?", comment.PostID).
		Find(&comments).
		Count(&totalRows).Error

	return comments, totalRows, err
}
