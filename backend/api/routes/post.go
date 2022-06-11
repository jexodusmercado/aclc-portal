package routes

import (
	"portal/api/controller"
	"portal/infrastructure"
	"portal/middleware"
)

//PostRoute -> Route for user module
type PostRoute struct {
    Handler    infrastructure.GinRouter
    Controller controller.PostController
}

//NewPostRoute -> initializes new instance of UserRoute
func NewPostRoute(
    controller controller.PostController,
    handler infrastructure.GinRouter,
) PostRoute {
    return PostRoute{
        Handler:    handler,
        Controller: controller,
    }
}

//Setup -> setups user routes
func (c PostRoute) Setup() {
    classroom := c.Handler.Gin.Group("/classroom/:id")
    {
		post:= classroom.Group("/post")
		{
			post.Use(middleware.Authenticate())
			post.GET(":id", c.Controller.GetPost)
			post.POST("create", c.Controller.CreatePost)
			post.PATCH(":id", c.Controller.UpdatePost)
            post.POST("test", c.Controller.TestUpload)
            post.DELETE(":id", c.Controller.DeleteByID)
		}
    }
    
    download := c.Handler.Gin.Group("/download")
    {
        download.GET("/:filename", c.Controller.DownloadFile)
    }

}
