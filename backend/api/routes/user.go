package routes

import (
    "portal/api/controller"
    "portal/infrastructure"
    "portal/middleware"
)

//UserRoute -> Route for user module
type UserRoute struct {
    Handler    infrastructure.GinRouter
    Controller controller.UserController
}

//NewUserRoute -> initializes new instance of UserRoute
func NewUserRoute(
    controller controller.UserController,
    handler infrastructure.GinRouter,
) UserRoute {
    return UserRoute{
        Handler:    handler,
        Controller: controller,
    }
}

//Setup -> setups user routes
func (u UserRoute) Setup() {
    auth := u.Handler.Gin.Group("/auth")
    {
        auth.POST("/f/register", u.Controller.CreateUser)
        auth.POST("/s/register", u.Controller.CreateStudent)
        auth.POST("/login", u.Controller.LoginUser)
    }

    user := u.Handler.Gin.Group("/users")
    {
        user.Use(middleware.Authenticate())
        user.GET("", u.Controller.GetUsers)
        user.GET("/:id", u.Controller.GetUser)
        user.PATCH("/:id", u.Controller.UpdateUser)
        user.POST("/classroom", u.Controller.AddUsertoClassroom)
    }
}
