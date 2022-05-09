package routes

import (
	"portal/api/controller"
	"portal/infrastructure"
	"portal/middleware"
)

type SchoolYearRoute struct {
	Handler    infrastructure.GinRouter
	Controller controller.SchoolYearController
}

func NewSchoolYearRoute(
	controller controller.SchoolYearController,
	handler infrastructure.GinRouter,
) SchoolYearRoute {
	return SchoolYearRoute{
		Handler:    handler,
		Controller: controller,
	}
}

//Setup -> setups user routes
func (c SchoolYearRoute) Setup() {
	schoolyear := c.Handler.Gin.Group("/school-year")
	{
		schoolyear.Use(middleware.Authenticate())
		schoolyear.GET("", c.Controller.GetSchoolYears)
		schoolyear.GET("/:id", c.Controller.GetSchoolYear)
		schoolyear.POST("", c.Controller.Create)
		schoolyear.PATCH("/:id", c.Controller.UpdateSchoolYear)
		schoolyear.GET("/active", c.Controller.GetActiveYear)
		schoolyear.GET("/change-active/:id", c.Controller.ChangeActiveYear)
	}
}
