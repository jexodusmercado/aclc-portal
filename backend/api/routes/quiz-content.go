package routes

import (
	"portal/api/controller"
	"portal/infrastructure"
	"portal/middleware"
)

type QuizContentRoute struct {
    Handler    infrastructure.GinRouter
    Controller controller.QuizContentController
}

func NewQuizContentRoute(
    controller controller.QuizContentController,
    handler infrastructure.GinRouter,
) QuizContentRoute {
    return QuizContentRoute{
        Handler:    handler,
        Controller: controller,
    }
}

//Setup -> setups user routes
func (c QuizContentRoute) Setup() {
    grade := c.Handler.Gin.Group("/quiz/:id")
    {
		grade.Use(middleware.Authenticate())
		grade.POST("", c.Controller.Create)
        grade.POST("/answer/:contentID", c.Controller.Answer)
    }

}
