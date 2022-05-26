package routes

import (
	"portal/api/controller"
	"portal/infrastructure"
	"portal/middleware"
)

//SubjectRoute -> Route for user module
type SubjectRoute struct {
    Handler    infrastructure.GinRouter
    Controller controller.SubjectController
}

//NewSubjectRoute -> initializes new instance of UserRoute
func NewSubjectRoute(
    controller controller.SubjectController,
    handler infrastructure.GinRouter,
) SubjectRoute {
    return SubjectRoute{
        Handler:    handler,
        Controller: controller,
    }
}

//Setup -> setups user routes
func (c SubjectRoute) Setup() {
    subjects := c.Handler.Gin.Group("/subject")
    {
		subjects.Use(middleware.Authenticate())
		subjects.GET("", c.Controller.GetSubjects)
		subjects.GET("/:id", c.Controller.GetSubject)
        subjects.POST("/create", c.Controller.CreateSubject)
    }

}
