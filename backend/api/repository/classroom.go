package repository

import (
    "portal/infrastructure"
    "portal/models"

    "gorm.io/gorm/clause"
)

//ClassroomRepository -> Classroom responsible for accessing database
type ClassroomRepository struct {
    db infrastructure.Database
}

//NewClassroomRepository -> creates a instance on ClassroomRepository
func NewClassroomRepository(db infrastructure.Database) ClassroomRepository {
    return ClassroomRepository{
        db: db,
    }
}

//CreateUser -> method for saving user to database
func (c ClassroomRepository) Create(classroom models.ClassroomCreation) error {

    var dbClassroom models.Classroom

    dbClassroom.Title 		= classroom.Title
	dbClassroom.Body		= classroom.Body
	dbClassroom.SubjectID	= classroom.SubjectID
	dbClassroom.IsActive	= true

    return c.db.DB.Create(&dbClassroom).Error
}

//FindAll -> method for returning all classrooms
func (c ClassroomRepository) FindAll(classroom models.Classroom, keyword string) (*[]models.Classroom, int64, error) {

    var classrooms []models.Classroom
    var totalRows int64 = 0

    queryBuilder := c.db.DB.Preload("Subject").Preload("Posts.User").Preload(clause.Associations).Order("created_at desc").Model(&models.Classroom{})

    if keyword != "" {
        queryKeyword := "%" + keyword + "%"
        queryBuilder = queryBuilder.Where(
            c.db.DB.Where("classroom.Title LIKE ? ", queryKeyword))
    }

    err := queryBuilder.
        Where(classroom).
        Find(&classrooms).
        Count(&totalRows).Error
    return &classrooms, totalRows, err
}

//Find -> Method for fetching post by id
func (u ClassroomRepository) Find(classroom models.Classroom) (models.Classroom, error) {
    var classrooms models.Classroom
    err := u.db.DB.
        Debug().
		Joins("Subject").
        Preload(clause.Associations).
        Model(&models.Classroom{}).
        Where(&classroom).
        Take(&classrooms).Error
    return classrooms, err
}

//Update -> Method for updating Post
func (u ClassroomRepository) Update(classroom models.Classroom) error {
    return u.db.DB.Save(&classroom).Error
}
