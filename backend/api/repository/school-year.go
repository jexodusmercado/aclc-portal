package repository

import (
	"errors"
	"fmt"
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

func (s SchoolYearRepository) ChangeActiveYear(schoolyear models.SchoolYear) error {
	var old_schoolyear models.SchoolYear

	err := s.db.DB.
		Debug().
		Preload("Users").
		Model(&models.SchoolYear{}).
		Where("is_active = ?", "1").
		Take(&old_schoolyear).Error
	
	if err != nil {
		return err
	}

	fmt.Println("inside repo")
	fmt.Println(old_schoolyear)

	old_schoolyear.IsActive = false

	err = s.db.DB.Save(&old_schoolyear).Error

	if err != nil {
		return err
	}

	schoolyear.IsActive = true

	return s.db.DB.Save(&schoolyear).Error
}

func (s SchoolYearRepository) GetActiveYear() (models.SchoolYear, error) {
	var schoolyears models.SchoolYear

	err := s.db.DB.
		Debug().
		Preload("Users").
		Model(&models.SchoolYear{}).
		Where("is_active = ?", "1").
		Take(&schoolyears).Error

	return schoolyears, err
}

func (c SchoolYearRepository) DeleteByID(SchoolYearID string) error {
	return c.db.DB.Delete(&models.SchoolYear{}, SchoolYearID).Error

}