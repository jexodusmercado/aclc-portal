package routes

import (
	"portal/api/controller"
	"portal/infrastructure"
	"portal/middleware"
)

type QuizRoute struct {
    Handler    infrastructure.GinRouter
    Controller controller.QuizController
}

func NewQuizRoute(
    controller controller.QuizController,
    handler infrastructure.GinRouter,
) QuizRoute {
    return QuizRoute{
        Handler:    handler,
        Controller: controller,
    }
}

//Setup -> setups user routes
func (c QuizRoute) Setup() {
    grade := c.Handler.Gin.Group("/quiz")
    {
		grade.Use(middleware.Authenticate())
		grade.POST("", c.Controller.Create)
    }

}
