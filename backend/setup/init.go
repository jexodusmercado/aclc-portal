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

	//grade
	gradeRepository := repository.NewGradeRepository(db)
	gradeService := service.NewGradeService(gradeRepository)
	gradeController := controller.NewGradeController(gradeService)
	gradeRoute := routes.NewGradeRoute(gradeController, router)
	gradeRoute.Setup()

	//grade-period
	gradePeriodRepository := repository.NewGradePeriodRepository(db)
	gradePeriodService := service.NewGradePeriodService(gradePeriodRepository)
	gradePeriodController := controller.NewGradePeriodController(gradePeriodService)
	gradePeriodRoute := routes.NewGradePeriodRoute(gradePeriodController, router)
	gradePeriodRoute.Setup()

	//quiz
	quizRepository := repository.NewQuizRepository(db)
	quizService := service.NewQuizService(quizRepository)
	quizController := controller.NewQuizController(quizService)
	quizRoute := routes.NewQuizRoute(quizController, router)
	quizRoute.Setup()

	//quiz-content
	quizContentRepository := repository.NewQuizContentRepository(db)
	quizContentService := service.NewQuizContentService(quizContentRepository)
	quizContentController := controller.NewQuizContentController(quizContentService)
	quizContentRoute := routes.NewQuizContentRoute(quizContentController, router)
	quizContentRoute.Setup()

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
		&models.Grade{},
		&models.GradePeriod{},
		&models.Quiz{},
		&models.QuizContent{},
	); err == nil && db.DB.Migrator().HasTable(&models.User{}) {

		if err := db.DB.First(&models.User{}).Error; errors.Is(err, gorm.ErrRecordNotFound) {

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
