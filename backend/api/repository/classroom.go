package repository

import (
	"log"
	"portal/infrastructure"
	"portal/models"

	"gorm.io/gorm"
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
func (c ClassroomRepository) Create(classroom models.ClassroomCreation, students []models.User) error {

	var dbClassroom models.Classroom
	var users []models.User

	dbClassroom.Title = classroom.Title
	dbClassroom.Body = classroom.Body
	dbClassroom.SubjectID = classroom.SubjectID
	dbClassroom.TeacherID = classroom.TeacherID
	dbClassroom.IsActive = true

	err := c.db.DB.Create(&dbClassroom).Error
	if err != nil {
		return err
	}

	for _, u := range students {
		var user models.User

		err := c.db.DB.
			Debug().
			Model(&models.User{}).
			Where(&u).
			Take(&user).Error

		if err != nil {
			log.Fatalf(err.Error())
		}

		users = append(users, user)

	}

	return c.db.DB.Model(&dbClassroom).Association("Students").Append(&users)
}

//FindAll -> method for returning all classrooms
func (c ClassroomRepository) FindAll(classroom models.Classroom, keyword string) (*[]models.Classroom, int64, error) {

	var classrooms []models.Classroom
	var totalRows int64 = 0

	queryBuilder := c.db.DB.Preload("Subject").
		Preload("Students.Course").
		Preload("Teacher").
		Preload("Posts.User").
		Order("created_at desc").
		Model(&models.Classroom{})

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
		Preload("Subject").
		Preload("Students.Course").
		Preload("Teacher").
		Preload("Posts.User").
		Model(&models.Classroom{}).
		Where(&classroom).
		Take(&classrooms).Error
	return classrooms, err
}

//Update -> Method for updating Post
func (u ClassroomRepository) Update(response models.ClassroomUpdate) (models.Classroom, error) {
	var teacher models.User
	var subject models.Subject
	var classroom models.Classroom
	var students []*models.User

	err := u.db.DB.
		Debug().
		Model(&models.Classroom{}).
		Where("ID = ?", response.ID).
		Take(&classroom).Error

	if response.TeacherID != nil {
		err = u.db.DB.
			Debug().
			Model(&models.User{}).
			Where("ID = ?", response.TeacherID).
			Take(&teacher).Error
		if err != nil {
			return classroom, err
		}
	}

	if response.SubjectID != nil {
		err = u.db.DB.
			Debug().
			Model(&models.Subject{}).
			Where("ID =", classroom.SubjectID).
			Take(&subject).Error
		if err != nil {
			return classroom, err
		}
	}

	for _, id := range response.StudentsID {
		var user *models.User

		err := u.db.DB.
			Debug().
			Model(&models.User{}).
			Where("ID = ?", id).
			Take(&user).Error

		if err != nil {
			log.Fatalf(err.Error())
		}

		students = append(students, user)
	}

	// classroom.TeacherID = response.TeacherID
	// classroom.SubjectID = response.SubjectID
	classroom.Students = students

	// err = u.db.DB.Model(&models.Classroom{}).Where(&classroom).Association("Teacher").Append(&teacher)
	// if err != nil {
	// 	return classroom, err
	// }
	// err = u.db.DB.Model(&models.Classroom{}).Where(&classroom).Association("Subject").Append(&subject)
	// if err != nil {
	// 	return classroom, err
	// }

	// err = u.db.DB.Model(&classroom).Association("Students").Delete(&classroom.Students)
	// if err != nil {
	// 	return classroom, err
	// }

	err = u.db.DB.Model(&classroom).Association("Students").Replace(&students)
	if err != nil {
		return classroom, err
	}

	err = u.db.DB.Session(&gorm.Session{FullSaveAssociations: true}).Updates(&classroom).Error
	if err != nil {
		return classroom, err
	}

	return classroom, nil

	// err = u.db.DB.Model(&models.Classroom{}).Where(&classroom).Updates(&classroom).Error
	// if err != nil {
	// 	return err
	// }

}
