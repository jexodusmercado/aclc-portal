package setup

import (
	"portal/api/controller"
	"portal/api/repository"
	"portal/api/routes"
	"portal/api/service"
	"portal/infrastructure"
	"portal/models"
	"portal/util"

	"errors"
	"log"

	"gorm.io/gorm"
)

func InitializeServices(router infrastructure.GinRouter) {
	db := infrastructure.NewDatabase() // databse has been initialized and configured

	// user
	userRepository := repository.NewUserRepository(db)          // repository are being setup
	userService := service.NewUserService(userRepository)       // service are being setup
	userController := controller.NewUserController(userService) // controller are being set up
	userRoute := routes.NewUserRoute(userController, router)    // user routes are initialized
	userRoute.Setup()                                           // user routes are being setup

	//classroom
	classroomRepository := repository.NewClassroomRepository(db)
	classroomService := service.NewClassroomService(classroomRepository)
	classroomController := controller.NewClassroomController(classroomService)
	classroomRoute := routes.NewClassroomRoute(classroomController, router)
	classroomRoute.Setup()

	//subject
	subjectRepository := repository.NewSubjectRepository(db)
	subjectService := service.NewSubjectService(subjectRepository)
	subjectController := controller.NewSubjectController(subjectService)
	subjectRoute := routes.NewSubjectRoute(subjectController, router)
	subjectRoute.Setup()

	//posts
	postRepository := repository.NewPostRepository(db)
	postService := service.NewPostService(postRepository)
	postController := controller.NewPostController(postService)
	postRoute := routes.NewPostRoute(postController, router)
	postRoute.Setup()

	//course
	courseRepository := repository.NewCourseRepository(db)
	courseService := service.NewCourseService(courseRepository)
	courseController := controller.NewCourseController(courseService)
	courseRoute := routes.NewCourseRoute(courseController, router)
	courseRoute.Setup()

	//school-year
	schoolYearRepository := repository.NewSchoolYearRepository(db)
	schoolYearService := service.NewSchoolYearService(schoolYearRepository)
	schoolYearController := controller.NewSchoolYearController(schoolYearService)
	schoolYearRoute := routes.NewSchoolYearRoute(schoolYearController, router)
	schoolYearRoute.Setup()

	//comment
	commentRepository := repository.NewCommentRepository(db)
	commentService := service.NewCommentService(commentRepository)
	commentController := controller.NewCommentController(commentService)
	commentRoute := routes.NewCommentRoute(commentController, router)
	commentRoute.Setup()

	// migrating User model to datbase table
	if err := db.DB.AutoMigrate(
		&models.Course{},
		&models.Classroom{},
		&models.Subject{},
		&models.Post{},
		&models.Faculty{},
		&models.SchoolYear{},
		&models.StudentGrade{},
		&models.Department{},
		&models.User{},
		&models.Comment{},
	); err == nil && db.DB.Migrator().HasTable(&models.User{}) {

		if err := db.DB.First(&models.User{}).Error; errors.Is(err, gorm.ErrRecordNotFound) {
			// layout := time.RFC3339[:len("1994-12-17")]
			// t, err := time.Parse(constants.DATE_LAYOUT, "1994-12-17")
			// t, _ := time.Parse(constants.DATE_LAYOUT, "1994-12-17")
			// year, month, day := time.Time.Date(t)
			// if err != nil {
			// 	log.Fatalf(err.Error())
			// }

			hashPassword, err := util.HashPassword("password")
			if err != nil {
				log.Fatalf(err.Error())
			}

			//Insert seed data
			seedUser := []models.User{
				{
					FirstName: "ACLC",
					LastName:  "Admin",
					Username:  "11109111",
					Password:  hashPassword,
					Birthday:  "1994-12-17",
					Type:      "ADMIN",
					IsActive:  true,
				},
			}

			db.DB.Create(&seedUser)
		}

		if err := db.DB.First(&models.Course{}).Error; errors.Is(err, gorm.ErrRecordNotFound) {
			seedCourse := []models.Course{
				{
					Name:        "BSCS",
					Description: "Bachelor of Science in Computer Science",
					IsActive:    true,
				},
				{
					Name:        "BSIS",
					Description: "Bachelor of Science in Information Systems",
					IsActive:    true,
				},
				{
					Name:        "BSAR",
					Description: "Bachelor of Science in Architect",
					IsActive:    true,
				},
				{
					Name:        "BSIT",
					Description: "Bachelor of Science in Information Technology",
					IsActive:    true,
				},
				{
					Name:        "BSME",
					Description: "Bachelor of Science in Mechanical Engineering",
					IsActive:    true,
				},
			}
			db.DB.Create(&seedCourse)
		}

		if err := db.DB.First(&models.Subject{}).Error; errors.Is(err, gorm.ErrRecordNotFound) {
			//Insert seed data
			seedSubject := []models.Subject{
				{
					Name:     "Science",
					Code:     "SC100",
					Unit:     4,
					IsActive: true,
				},
				{
					Name:     "Filipino",
					Code:     "FP101",
					Unit:     2,
					IsActive: true,
				},
				{
					Name:     "English",
					Code:     "EN101",
					Unit:     2,
					IsActive: true,
				},
			}
			db.DB.Create(&seedSubject)
		}

		if err := db.DB.First(&models.SchoolYear{}).Error; errors.Is(err, gorm.ErrRecordNotFound) {
			//Insert seed data
			seedSchoolYear := []models.SchoolYear{
				{
					SchoolYear: "2022",
					Semester:   "First",
					IsActive:   true,
				},
				{
					SchoolYear: "2022",
					Semester:   "Second",
					IsActive:   false,
				},
				{
					SchoolYear: "2023",
					Semester:   "First",
					IsActive:   false,
				},
				{
					SchoolYear: "2023",
					Semester:   "Second",
					IsActive:   false,
				},
			}
			db.DB.Create(&seedSchoolYear)
		}
	}
}
