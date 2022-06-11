package routes

import (
	"portal/api/controller"
	"portal/infrastructure"
	"portal/middleware"
)

type CommentRoute struct {
	Handler    infrastructure.GinRouter
	Controller controller.CommentController
}

func NewCommentRoute(
	controller controller.CommentController,
	handler infrastructure.GinRouter,
) CommentRoute {
	return CommentRoute{
		Handler:    handler,
		Controller: controller,
	}
}

func (c CommentRoute) Setup() {
	comment := c.Handler.Gin.Group("/comment")
	{
		comment.Use(middleware.Authenticate())
		comment.POST(":id", c.Controller.CreateComment)
		comment.GET(":id", c.Controller.FindAllByPostID)
		comment.PATCH(":id", c.Controller.UpdateComment)
		comment.DELETE(":id", c.Controller.DeleteByID)
	}

}
