package repository

import (
	"portal/infrastructure"
	"portal/models"
	"portal/util"

	"log"

	"gorm.io/gorm/clause"
)

//UserRepository -> UserRepository resposible for accessing database
type UserRepository struct {
	db infrastructure.Database
}

//NewUserRepository -> creates a instance on UserRepository
func NewUserRepository(db infrastructure.Database) UserRepository {
	return UserRepository{
		db: db,
	}
}

//CreateUser -> method for saving user to database
func (u UserRepository) CreateUser(user models.UserRegister) error {

	var dbUser models.User

	dbUser.Email = user.Email
	dbUser.FirstName = user.FirstName
	dbUser.LastName = user.LastName
	dbUser.Password = user.Password
	dbUser.Username = user.Username
	dbUser.Birthday = user.Birthday
	dbUser.Type = user.Type
	dbUser.IsActive = true

	return u.db.DB.Create(&dbUser).Error
}

//CreateUser -> method for saving user to database
func (u UserRepository) CreateStudent(user models.StudentRegister, schoolyear models.SchoolYear) error {

	var dbUser models.User
	var schoolyears *models.SchoolYear

	err := u.db.DB.
		Debug().
		Model(&models.SchoolYear{}).
		Where(&schoolyear).
		Take(&schoolyears).Error
	if err != nil {
		log.Fatalf(err.Error())
	}

	dbUser.Email = user.Email
	dbUser.FirstName = user.FirstName
	dbUser.LastName = user.LastName
	dbUser.Password = user.Password
	dbUser.Username = user.Username
	dbUser.Birthday = user.Birthday
	dbUser.Type = user.Type
	dbUser.CourseID = user.CourseID
	dbUser.IsActive = true
	dbUser.SchoolYear = append([]*models.SchoolYear{}, schoolyears)

	return u.db.DB.Create(&dbUser).Error
}

//LoginUser -> method for returning user
func (u UserRepository) Login(user models.UserLogin) (*models.User, error) {

	var dbUser models.User
	username := user.Username
	password := user.Password

	err := u.db.DB.Where("username = ?", username).First(&dbUser).Error
	if err != nil {
		return nil, err
	}

	hashErr := util.CheckPasswordHash(password, dbUser.Password)
	if hashErr != nil {
		return nil, hashErr
	}

	return &dbUser, nil
}

//FindAll -> method for returning all users
func (u UserRepository) FindAll(user models.User, keyword, userType, courseId string) (*[]models.User, int64, error) {

	var users []models.User
	var totalRows int64 = 0

	queryBuilder := u.db.DB.Preload("Course").Preload(clause.Associations).Order("created_at desc").Model(&models.User{})

	if keyword != "" {
		queryKeyword := "%" + keyword + "%"
		numericKeyword := keyword + "%"
		queryBuilder = queryBuilder.Where(
			u.db.DB.
				Where("user.username LIKE ? OR user.first_name LIKE ? OR user.last_name LIKE ?", numericKeyword, queryKeyword, queryKeyword)).
			Where("user.type = ? ", userType)
	}

	if courseId != "" {
		queryKeyword := "%" + keyword + "%"
		numericKeyword := keyword + "%"

		queryBuilder = queryBuilder.Where(
			u.db.DB.
				Where("user.username LIKE ? OR user.first_name LIKE ? OR user.last_name LIKE ?", numericKeyword, queryKeyword, queryKeyword)).
			Where("type = ? ", userType).
			Where("user.course_id = ?", courseId)
	}

	if userType != "" {
		queryBuilder = queryBuilder.Where("type = ? ", userType)
	}

	err := queryBuilder.
		Where(user).
		Find(&users).
		Count(&totalRows).Error
	return &users, totalRows, err
}

//Find -> Method for fetching post by id
func (u UserRepository) Find(user models.User) (models.User, error) {
	var users models.User
	err := u.db.DB.
		Debug().
		// Preload("Classrooms.Subject").
		// Preload(clause.Associations).
		Model(&models.User{}).
		Where(&user).
		Take(&users).Error
	return users, err
}

//Update -> Method for updating Post
func (u UserRepository) Update(user models.User) error {
	return u.db.DB.Save(&user).Error
}

func (u UserRepository) AddUserToClassroom(user models.User, classroom models.Classroom) error {
	var users models.User
	var classrooms models.Classroom
	err := u.db.DB.
		Debug().
		Model(&models.User{}).
		Where(&user).
		Take(&users).Error
	if err != nil {
		log.Fatalf(err.Error())
	}

	err = u.db.DB.
		Debug().
		Model(&models.Classroom{}).
		Where(&classroom).
		Take(&classrooms).Error
	if err != nil {
		log.Fatalf(err.Error())
	}

	return u.db.DB.Model(&users).Association("Classrooms").Append(&classrooms)
}

// func (u UserRepository) AddUserToSchoolYear(user models.User, schoolyear models.SchoolYear) error {
//     var users models.User
//     var schoolyear models.SchoolYear

//     err := u.db.DB.
//         Debug().
//         Model(&models.User{}).
//         Where(&user).
//         Take(&users).Error

// }
