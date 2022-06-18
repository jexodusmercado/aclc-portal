package routes

import (
	"portal/api/controller"
	"portal/infrastructure"
	"portal/middleware"
)

type GradePeriodRoute struct {
    Handler    infrastructure.GinRouter
    Controller controller.GradePeriodController
}

func NewGradePeriodRoute(
    controller controller.GradePeriodController,
    handler infrastructure.GinRouter,
) GradePeriodRoute {
    return GradePeriodRoute{
        Handler:    handler,
        Controller: controller,
    }
}

//Setup -> setups user routes
func (c GradePeriodRoute) Setup() {
    grade := c.Handler.Gin.Group("/grade/:id/period")
    {
		grade.Use(middleware.Authenticate())
		grade.POST("", c.Controller.Create)
		grade.PATCH("", c.Controller.Update)
    }

}
