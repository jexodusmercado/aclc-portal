package routes

import (
	"portal/api/controller"
	"portal/infrastructure"
	"portal/middleware"
)

//ClassroomRoute -> Route for user module
type ClassroomRoute struct {
    Handler    infrastructure.GinRouter
    Controller controller.ClassroomController
}

//NewClassroomRoute -> initializes new instance of UserRoute
func NewClassroomRoute(
    controller controller.ClassroomController,
    handler infrastructure.GinRouter,
) ClassroomRoute {
    return ClassroomRoute{
        Handler:    handler,
        Controller: controller,
    }
}

//Setup -> setups user routes
func (c ClassroomRoute) Setup() {
    classroom := c.Handler.Gin.Group("/classroom")
    {
        classroom.Use(middleware.Authenticate())
        classroom.POST("/create", c.Controller.CreateClassroom)
		classroom.GET("", c.Controller.GetClassrooms)
		classroom.GET(":id", c.Controller.GetClassroom)
        classroom.PATCH(":id", c.Controller.UpdateClassroom)
        classroom.DELETE(":id", c.Controller.DeleteByID)
        classroom.GET("teacher/:teacherID", c.Controller.FindByTeacherID)
    }

}
