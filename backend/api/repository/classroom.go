package repository

import (
	"fmt"
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
	var users []*models.User

	for _, u := range classroom.StudentID {
		var user *models.User

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

	dbClassroom.Title 			= 	classroom.Title
	dbClassroom.Body 			= 	classroom.Body
	dbClassroom.SubjectID 		= 	classroom.SubjectID
	dbClassroom.TeacherID		= 	classroom.TeacherID
	dbClassroom.SchoolYearID	=	*classroom.SchoolYearID
	dbClassroom.Students 		= 	users
	dbClassroom.IsActive 		= 	false

	return c.db.DB.Preload("Records").Create(&dbClassroom).Association("Students").Error

}

//FindAll -> method for returning all classrooms
func (c ClassroomRepository) FindAll(classroom models.Classroom, keyword string) (*[]models.Classroom, int64, error) {

	var classrooms []models.Classroom
	var totalRows int64 = 0

	queryBuilder := c.db.DB.
		Preload("Subject").
		Preload("Students.Course").
		Preload("Teacher").
		// Preload("Posts.User").
		// Preload("Posts.Comments.User").
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
		Preload("Posts.Comments.User").
		Preload("Quizzes").
		Preload("Quizzes.QuizContent").
		Model(&models.Classroom{}).
		Where(&classroom).
		Take(&classrooms).Error
	return classrooms, err
}

func (u ClassroomRepository) FindByTeacherID(classroom models.Classroom, keyword string) ([]models.Classroom, int64, error) {
	var classrooms []models.Classroom
	var totalRows int64 = 0

	queryBuilder := u.db.DB.
		Debug().
		Preload("Subject").
		Preload("Students.Course").
		Preload("Teacher").
		// Preload("Posts.User").
		// Preload("Posts.Comments.User").
		Order("created_at desc").
		Model(&models.Classroom{})

	
	if keyword != "" {
		queryKeyword := "%" + keyword + "%"
		queryBuilder = queryBuilder.Where(
			u.db.DB.Where("classroom.Title LIKE ? ", queryKeyword))
	}

	err := queryBuilder.
		Where(classroom).
		Find(&classrooms).
		Count(&totalRows).Error

	return classrooms, totalRows, err
}

func (u ClassroomRepository) FindByStudentID(studentId, keyword string) ([]models.Classroom, int64, error) {
	var classrooms []models.Classroom
	var totalRows int64 = 0

	queryBuilder := u.db.DB.
		Debug().
		Preload("Subject").
		Preload("Students.Course").
		Preload("Teacher").
		// Preload("Posts.User").
		// Preload("Posts.Comments.User").
		Order("created_at desc").
		Model(&models.Classroom{})

	
	if keyword != "" {
		queryKeyword := "%" + keyword + "%"
		queryBuilder = queryBuilder.Where(
			u.db.DB.Where("classroom.Title LIKE ? ", queryKeyword))
	}

	err := queryBuilder.
		Where("ID IN (SELECT classroom_id FROM students_classroom WHERE user_id = ?)", studentId).
		Find(&classrooms).
		Count(&totalRows).Error

	return classrooms, totalRows, err
}

func (u ClassroomRepository) GetStudentsByTeacherID(classroom models.Classroom, keyword, findCourseID, findClassroomID string, ) ([]models.User, error) {
	var students []models.User
	var classroomIDs []uint
	var studentCollection []models.User

	err := u.db.DB.
		Debug().
		Preload("Subject").
		Preload("Students.Course").
		Preload("Teacher").
		// Preload("Posts.User").
		// Preload("Posts.Comments.User").
		Order("created_at desc").
		Model(&models.Classroom{}).
		Where(classroom).
		Pluck("ID", &classroomIDs).
		Error


		for _, v := range classroomIDs {
			classroom.ID = v
			queryBuilder := u.db.DB.
				Debug().
				Preload("Course").
				Preload("Classroom", "teacher_id = ?", classroom.TeacherID).
				Preload("Classroom.Subject").
				Model(&classroom)

			if findCourseID != "" {
				queryBuilder = queryBuilder.Where("user.course_id = ? ", findCourseID)
			}

			if findClassroomID != "" {
				queryBuilder = queryBuilder.Where("students_classroom.classroom_id = ? ", findClassroomID)
			}

			if keyword != "" {
				queryKeyword := "%" + keyword + "%"
				queryBuilder = queryBuilder.Where("user.first_name LIKE ? ", queryKeyword).Or("user.last_name LIKE ? ", queryKeyword)
			}

			err = queryBuilder.
				Group("ID").
				Association("Students").
				Find(&students)

			studentCollection = append(studentCollection, students...)
		}
	

	return studentCollection, err
}

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

	if response.TeacherID != 0 {
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
			Where("ID = ?", response.SubjectID).
			Take(&subject).Error
		if err != nil {
			return classroom, err
		}
	}

	for _, id := range response.StudentID {
		var user *models.User

		err := u.db.DB.
			Debug().
			Model(&models.User{}).
			Where("ID = ?", id).
			Take(&user).Error

		fmt.Println("")
		fmt.Println("")
		fmt.Println(user)

		if err != nil {
			log.Fatalf(err.Error())
		}

		students = append(students, user)
	}

	classroom.Title = response.Title
	classroom.Students = students
	classroom.Subject = subject
	classroom.Teacher = teacher

	u.db.DB.Model(&models.Classroom{}).Where(&classroom).Association("Teacher").Append(&teacher)

	u.db.DB.Model(&models.Classroom{}).Where(&classroom).Association("Subject").Append(&subject)

	u.db.DB.Model(&classroom).Association("Students").Replace(&students)

	err = u.db.DB.Session(&gorm.Session{FullSaveAssociations: true}).Save(&classroom).Error
	if err != nil {
		return classroom, err
	}

	return classroom, nil
}

func (c ClassroomRepository) DeleteByID(ClassroomID string) error {
	return c.db.DB.Delete(&models.Classroom{}, ClassroomID).Error
}