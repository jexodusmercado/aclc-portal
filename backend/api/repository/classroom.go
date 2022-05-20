package repository

import (
	"log"
	"portal/infrastructure"
	"portal/models"
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

    dbClassroom.Title 		= classroom.Title
	dbClassroom.Body		= classroom.Body
	dbClassroom.SubjectID	= classroom.SubjectID
    dbClassroom.TeacherID   = classroom.TeacherID
	dbClassroom.IsActive	= true

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
func (u ClassroomRepository) Update(classroom models.Classroom) error {
    var teacher models.User
    var students []models.User
    var subject models.Subject

    for _, student := range classroom.Students {
        var user models.User

        err := u.db.DB.
            Debug().
            Model(&models.User{}).
            Where(&student).
            Take(&user).Error

        if err != nil {
            log.Fatalf(err.Error())
        }

        students = append(students, user)

    }

    err := u.db.DB.
        Debug().
        Model(&models.Subject{}).
        Where(&classroom.Subject).
        Take(&subject).Error
    if err != nil {
        return err
    }

    err = u.db.DB.
        Debug().
        Model(&models.User{}).
        Where(&classroom.Teacher).
        Take(&teacher).Error
    if err != nil {
        return err
    }

    u.db.DB.Association("Teacher").Replace()
    return u.db.DB.Select("*").
        Omit("ID").
        Updates(&classroom).Error
}
