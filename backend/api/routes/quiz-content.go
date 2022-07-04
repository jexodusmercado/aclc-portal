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
	quizContent := c.Handler.Gin.Group("/quiz/:id")
	{
		quizContent.Use(middleware.Authenticate())
		quizContent.GET("content/:contentID", c.Controller.Find)
		quizContent.POST("", c.Controller.Create)
		quizContent.PATCH("content/:contentID", c.Controller.UpdateByID)
		quizContent.POST("answer/:contentID", c.Controller.Answer)
		quizContent.DELETE("delete/:contentID", c.Controller.DeleteByID)
	}

}
