package repository

import (
	"portal/infrastructure"
	"portal/models"
	// "gorm.io/gorm/clause"
)

type PostRepository struct {
    db infrastructure.Database
}

func NewPostRepository(db infrastructure.Database) PostRepository {
    return PostRepository{
        db: db,
    }
}

func (p PostRepository) Create(post models.PostCreation) error {

    var dbPost models.Post

    dbPost.Title		= post.Title
	dbPost.Body			= post.Body
	dbPost.UserID		= post.UserID
	dbPost.ClassroomID	= post.ClassroomID
    dbPost.Filename     = &post.Filename
    dbPost.Extension    = &post.Extension
	dbPost.IsActive		= true

    return p.db.DB.Create(&dbPost).Error
}

func (p PostRepository) FindAll(post models.Post, keyword string) (*[]models.Post, int64, error) {

    var posts []models.Post
    var totalRows int64 = 0

    queryBuilder := p.db.DB.Preload("Users").Preload("Classroom").Order("created_at desc").Model(&models.Classroom{})

    if keyword != "" {
        queryKeyword := "%" + keyword + "%"
        queryBuilder = queryBuilder.Where(
            p.db.DB.Where("classroom.Title LIKE ? ", queryKeyword))
    }

    err := queryBuilder.
        Where(post).
        Find(&posts).
        Count(&totalRows).Error
    return &posts, totalRows, err
}

func (p PostRepository) Find(post models.Post) (models.Post, error) {
    var posts models.Post
    err := p.db.DB.
        Debug().
		Preload("Users").
		Preload("Classroom").
        Model(&models.Post{}).
        Where(&post).
        Take(&posts).Error
    return posts, err
}

func (p PostRepository) Update(post models.Post) error {
    return p.db.DB.Save(&post).Error
}

func (c PostRepository) DeleteByID(PostID string) error {
	return c.db.DB.Delete(&models.Post{}, PostID).Error

}