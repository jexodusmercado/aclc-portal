package repository

import (
	"portal/infrastructure"
	"portal/models"

	"errors"
)

type SubjectRepository struct {
    db infrastructure.Database
}

func NewSubjectRepository(db infrastructure.Database) SubjectRepository {
    return SubjectRepository{
        db: db,
    }
}

func (s SubjectRepository) Create(subject models.SubjectCreation) error {

    var dbSubject models.Subject

	err := s.db.DB.Where("code = ?", subject.Code).First(&dbSubject).Error
	if err == nil {
		return errors.New("Subject code already exist")
	}

    dbSubject.Name	 		= subject.Name
    dbSubject.Code 	        = subject.Code
    dbSubject.Unit          = subject.Unit
    dbSubject.IsActive 		= true

    return s.db.DB.Create(&dbSubject).Error
}


func (s SubjectRepository) FindAll(subject models.Subject, keyword string) (*[]models.Subject, int64, error) {

    var subjects []models.Subject    
    var totalRows int64 = 0

    queryBuilder := s.db.DB.Order("created_at desc").Model(&models.Subject{})

    if keyword != "" {
        queryKeyword := "%" + keyword + "%"
        queryBuilder = queryBuilder.Where(
            s.db.DB.Where("user.title LIKE ? ", queryKeyword))
    }

    err := queryBuilder.
        Where(subject).
        Find(&subjects).
        Count(&totalRows).Error
    return &subjects, totalRows, err
}

func (s SubjectRepository) Find(subject models.Subject) (models.Subject, error) {
    var subjects models.Subject
    err := s.db.DB.
        Debug().
        Model(&models.Subject{}).
        Where(&subject).
        Take(&subjects).Error
    return subjects, err
}

func (s SubjectRepository) Update(subject models.Subject) error {
    return s.db.DB.Save(&subject).Error
}

func (c SubjectRepository) DeleteByID(SubjectID string) error {
	return c.db.DB.Delete(&models.Subject{}, SubjectID).Error

}