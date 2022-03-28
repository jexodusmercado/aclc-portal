package setup

import (
    "portal/api/controller"
    "portal/api/repository"
    "portal/api/routes"
    "portal/api/service"
    "portal/infrastructure"
    "portal/models"
    "portal/util"
    
    "gorm.io/gorm"
    "errors"
    "time"
    "log"
)

func InitializeServices(router infrastructure.GinRouter) {
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

    //posts
    postRepository   := repository.NewPostRepository(db)
    postService      := service.NewPostService(postRepository)
    postController   := controller.NewPostController(postService)
    postRoute        := routes.NewPostRoute(postController, router)
    postRoute.Setup()


    // migrating User model to datbase table
    if err := db.DB.AutoMigrate(&models.User{}, &models.Classroom{}, &models.Subject{}, &models.Post{}); err == nil && db.DB.Migrator().HasTable(&models.User{}) {
        if err := db.DB.First(&models.User{}).Error; errors.Is(err, gorm.ErrRecordNotFound) {
            layout := time.RFC3339[:len("1994-12-17")]
            t, err := time.Parse(layout, "1994-12-17")
            if err != nil {
                log.Fatalf(err.Error())
            }

            hashPassword, err := util.HashPassword("password")
            if err != nil {
                log.Fatalf(err.Error())
            }
            //Insert seed data
            seedUser := []models.User{
                {
                    FirstName: "ACLC",
                    LastName: "Admin",
                    Username: "11109111",
                    Password: hashPassword,
                    Birthday: t,
                    Type: "admin",
                },
                {
                    FirstName: "Exo",
                    LastName: "Mercado",
                    Username: "11223344",
                    Password: hashPassword,
                    Birthday: t,
                    Type: "teacher",
                },
                {
                    FirstName: "Aza",
                    LastName: "Lansangan",
                    Username: "44332211",
                    Password: hashPassword,
                    Birthday: t,
                    Type: "student",
                },
            }
            db.DB.Create(&seedUser)
        }

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
}