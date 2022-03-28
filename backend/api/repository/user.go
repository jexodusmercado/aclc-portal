package repository

import (
    "portal/infrastructure"
    "portal/models"
    "portal/util"
	
    "gorm.io/gorm/clause"
    "errors"
    "log"
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
func (u UserRepository) Create(user models.UserRegister) error {

    var dbUser models.User

	err := u.db.DB.Where("email = ?", user.Email).First(&dbUser).Error
	if err == nil {
		return errors.New("Email already exist")
	}

    dbUser.Email 		= user.Email
    dbUser.FirstName 	= user.FirstName
    dbUser.LastName 	= user.LastName
    dbUser.Password 	= user.Password
	dbUser.Username 	= user.Username
    dbUser.Birthday     = user.Birthday
	dbUser.Type			= user.Type
    dbUser.IsActive 	= true

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
func (u UserRepository) FindAll(user models.User, keyword string) (*[]models.User, int64, error) {

    var users []models.User    
    var totalRows int64 = 0

    queryBuilder := u.db.DB.Preload("Classrooms.Subject").Preload(clause.Associations).Order("created_at desc").Model(&models.User{})

    if keyword != "" {
        queryKeyword := "%" + keyword + "%"
        queryBuilder = queryBuilder.Where(
            u.db.DB.Where("user.first_name LIKE ? OR user.last_name LIKE ? ", queryKeyword, queryKeyword))
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
        Preload("Classrooms.Subject").
        Preload(clause.Associations).
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