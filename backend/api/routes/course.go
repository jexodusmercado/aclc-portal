package routes

import (
    "portal/api/controller"
    "portal/infrastructure"
	"portal/middleware"
)

type CourseRoute struct {
    Handler    infrastructure.GinRouter
    Controller controller.CourseController
}

func NewCourseRoute(
    controller controller.CourseController,
    handler infrastructure.GinRouter,
) CourseRoute {
    return CourseRoute{
        Handler:    handler,
        Controller: controller,
    }
}

//Setup -> setups user routes
func (c CourseRoute) Setup() {
    course := c.Handler.Gin.Group("/course")
    {
		course.Use(middleware.Authenticate())
        course.GET("", c.Controller.GetCourses)
        course.GET("/:id", c.Controller.GetCourse)
        course.POST("/", c.Controller.Create)
        course.PATCH("/:id", c.Controller.UpdateCourse)
    }

}
