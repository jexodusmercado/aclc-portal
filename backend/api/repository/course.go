package repository

import (
    "portal/infrastructure"
    "portal/models"
    "errors"

    // "gorm.io/gorm/clause"
)

type CourseRepository struct {
    db infrastructure.Database
}

func NewCourseRepository(db infrastructure.Database) CourseRepository {
    return CourseRepository{
        db: db,
    }
}

func (c CourseRepository) Create(course models.CourseCreation, schoolyear models.SchoolYear) error {

    var dbCourse models.Course

    var schoolyears models.SchoolYear

    err := c.db.DB.
        Debug().
        Preload("Users").
        Model(&models.SchoolYear{}).
        Where(schoolyear).
        Take(&schoolyears).Error

	if err != nil {
		return err
	}

    isExisting := c.db.DB.Where("name = ?", course.Name).First(&dbCourse).Error
    if isExisting == nil {
        return errors.New("Course already exist")
    }

    dbCourse.Name		    = course.Name
	dbCourse.Description  = course.Description
	dbCourse.IsActive		= true
    dbCourse.SchoolYears = append([]models.SchoolYear{}, schoolyears)

    return c.db.DB.Create(&dbCourse).Error
}

func (c CourseRepository) FindAll(course models.Course, keyword string) (*[]models.Course, int64, error) {

    var courses []models.Course
    var totalRows int64 = 0

    queryBuilder := c.db.DB.Preload("Users").Order("created_at desc").Model(&models.Course{})

    if keyword != "" {
        queryKeyword := "%" + keyword + "%"
        queryBuilder = queryBuilder.Where(
            c.db.DB.Where("classroom.Title LIKE ? ", queryKeyword))
    }

    err := queryBuilder.
        Where(course).
        Find(&courses).
        Count(&totalRows).Error
    return &courses, totalRows, err
}

func (c CourseRepository) Find(course models.Course) (models.Course, error) {
    var courses models.Course
    err := c.db.DB.
        Debug().
		Preload("Users").
        Model(&models.Course{}).
        Where(&course).
        Take(&courses).Error
    return courses, err
}

func (c CourseRepository) Update(course models.Course) error {
    return c.db.DB.Save(&course).Error
}
