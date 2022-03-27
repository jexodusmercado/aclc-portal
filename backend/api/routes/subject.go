package routes

import (
    "portal/api/controller"
    "portal/infrastructure"
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
    classroom := c.Handler.Gin.Group("/classrooms")
    {
		classroom.GET("/", c.Controller.GetSubjects)
		classroom.GET("/:id", c.Controller.GetSubject)
        classroom.POST("/create", c.Controller.CreateSubject)
    }

}
