package repository

import (
	"errors"
	"portal/infrastructure"
	"portal/models"

	"gorm.io/gorm/clause"
)

type SchoolYearRepository struct {
	db infrastructure.Database
}

func NewSchoolYearRepository(db infrastructure.Database) SchoolYearRepository {
	return SchoolYearRepository{
		db: db,
	}
}

func (s SchoolYearRepository) Create(schoolyear models.SchoolYearCreation) error {

	var dbSchoolYear models.SchoolYear

	isExisting := s.db.DB.Where("school_year = ?", schoolyear.SchoolYear).Where("semester = ?", schoolyear.Semester).First(&dbSchoolYear).Error
	if isExisting == nil {
		return errors.New("School year already exist")
	}

	dbSchoolYear.SchoolYear = schoolyear.SchoolYear
	dbSchoolYear.Semester = schoolyear.Semester
	dbSchoolYear.IsActive = true

	return s.db.DB.Create(&dbSchoolYear).Error
}

func (s SchoolYearRepository) FindAll(schoolyear models.SchoolYear, keyword string) (*[]models.SchoolYear, int64, error) {

	var schoolyears []models.SchoolYear
	var totalRows int64 = 0

	queryBuilder := s.db.DB.Preload(clause.Associations).Order("created_at desc").Model(&models.SchoolYear{})

	if keyword != "" {
		queryKeyword := "%" + keyword + "%"
		queryBuilder = queryBuilder.Where(
			s.db.DB.Where("classroom.Title LIKE ? ", queryKeyword))
	}

	err := queryBuilder.
		Where(schoolyear).
		Find(&schoolyears).
		Count(&totalRows).Error
	return &schoolyears, totalRows, err
}

func (s SchoolYearRepository) Find(schoolyear models.SchoolYear) (models.SchoolYear, error) {
	var schoolyears models.SchoolYear
	err := s.db.DB.
		Debug().
		Preload("Users").
		Model(&models.SchoolYear{}).
		Where(&schoolyear).
		Take(&schoolyears).Error
	return schoolyears, err
}

func (s SchoolYearRepository) Update(schoolyear models.SchoolYear) error {
	return s.db.DB.Save(&schoolyear).Error
}

func (s SchoolYearRepository) GetActiveYear() (models.SchoolYear, error) {
	var schoolyears models.SchoolYear

	queryBuilder := s.db.DB.Preload(clause.Associations).Order("created_at desc").Model(&models.SchoolYear{})

	err := queryBuilder.Where("schoolyear.IsActive = ACTIVE").Find(&schoolyears).Error

	return schoolyears, err
}
