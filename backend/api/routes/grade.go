package routes

import (
	"portal/api/controller"
	"portal/infrastructure"
	"portal/middleware"
)

type GradeRoute struct {
    Handler    infrastructure.GinRouter
    Controller controller.GradeController
}

func NewGradeRoute(
    controller controller.GradeController,
    handler infrastructure.GinRouter,
) GradeRoute {
    return GradeRoute{
        Handler:    handler,
        Controller: controller,
    }
}

//Setup -> setups user routes
func (c GradeRoute) Setup() {
    grade := c.Handler.Gin.Group("/grade")
    {
		grade.Use(middleware.Authenticate())
		grade.POST("", c.Controller.Create)
		grade.GET(":id", c.Controller.Find)
    }

}
