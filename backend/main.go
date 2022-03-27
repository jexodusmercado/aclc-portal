package main

import (
    "portal/api/controller"
    "portal/api/repository"
    "portal/api/routes"
    "portal/api/service"
    "portal/infrastructure"
    "portal/models"

    "gorm.io/gorm"
    "errors"
)

func init() {
    infrastructure.LoadEnv()
}

func main() {

    router := infrastructure.NewGinRouter() //router has been initialized and configured
    db := infrastructure.NewDatabase() // databse has been initialized and configured
	
	// user
	userRepository  := repository.NewUserRepository(db) // repository are being setup
	userService     := service.NewUserService(userRepository) // service are being setup
	userController  := controller.NewUserController(userService) // controller are being set up
	userRoute       := routes.NewUserRoute(userController, router) // user routes are initialized
	userRoute.Setup() // user routes are being setup

    //classroom
    classroomRepository := repository.NewClassroomRepository(db)
    classroomService    := service.NewClassroomService(classroomRepository)
    classroomController := controller.NewClassroomController(classroomService)
    classroomRoute      := routes.NewClassroomRoute(classroomController, router)
    classroomRoute.Setup()

    //subject
    subjectRepository   := repository.NewSubjectRepository(db)
    subjectService      := service.NewSubjectService(subjectRepository)
    subjectController   := controller.NewSubjectController(subjectService)
    subjectRoute        := routes.NewSubjectRoute(subjectController, router)
    subjectRoute.Setup()

    // migrating User model to datbase table
    if err := db.DB.AutoMigrate(&models.User{}, &models.Classroom{}, &models.Subject{}); err == nil && db.DB.Migrator().HasTable(&models.User{}) {
        if err := db.DB.First(&models.Subject{}).Error; errors.Is(err, gorm.ErrRecordNotFound) {
            //Insert seed data
            seedSubject := []models.Subject{
                {
                    Name:           "Science",
                    SubjectCode:    "SC100",
                    IsActive:       true,
                },
                {
                    Name:           "Filipino",
                    SubjectCode:    "FP101",
                    IsActive:       true,
                },
                {
                    Name:           "English",
                    SubjectCode:    "EN101",
                    IsActive:       true,
                },
            }
            db.DB.Create(&seedSubject)
        }
    }
    router.Gin.Run(":8000") //server started on 8000 port
}
