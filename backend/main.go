package main

import (
    "portal/api/controller"
    "portal/api/repository"
    "portal/api/routes"
    "portal/api/service"
    "portal/infrastructure"
    "portal/models"
)

func init() {
    infrastructure.LoadEnv()
}

func main() {

    router := infrastructure.NewGinRouter() //router has been initialized and configured
    db := infrastructure.NewDatabase() // databse has been initialized and configured
    postRepository := repository.NewPostRepository(db) // repository are being setup
    postService := service.NewPostService(postRepository) // service are being setup
    postController := controller.NewPostController(postService) // controller are being set up
    postRoute := routes.NewPostRoute(postController, router) // post routes are initialized
    postRoute.Setup() // post routes are being setup
	
	// add up these 
	userRepository := repository.NewUserRepository(db)
	userService := service.NewUserService(userRepository)
	userController := controller.NewUserController(userService)
	userRoute := routes.NewUserRoute(userController, router)
	userRoute.Setup()

    db.DB.AutoMigrate(&models.Post{}, &models.User{}) // migrating Post model to datbase table
    router.Gin.Run(":8000") //server started on 8000 port
}
