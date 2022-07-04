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
    quiz := c.Handler.Gin.Group("/quiz")
    {
		quiz.Use(middleware.Authenticate())
		quiz.POST("", c.Controller.Create)
        quiz.GET(":id", c.Controller.Find)
        quiz.GET("", c.Controller.FindAll)
        quiz.GET("classroom/:id", c.Controller.FindByClassroomID)
        quiz.GET("creator/:id", c.Controller.FindByCreatorID)
        quiz.DELETE(":id", c.Controller.DeleteByID)
        quiz.PATCH(":id", c.Controller.UpdateByID)
    }
}
