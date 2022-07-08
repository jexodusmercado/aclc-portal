package infrastructure

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"

	"net/http"
)

//GinRouter -> Gin Router
type GinRouter struct {
	Gin *gin.Engine
}

//NewGinRouter all the routes are defined here
func NewGinRouter() GinRouter {

	httpRouter := gin.Default()

	config := cors.DefaultConfig()
	// config.AllowAllOrigins = true
	config.AllowOrigins = []string{"http://localhost:3001", "http://localhost:3001/", "http://localhost:3000", "http://aclc-bucket.s3-website-ap-southeast-1.amazonaws.com/"}
	// config.AllowCredentials = true
	config.AddAllowMethods("OPTIONS")
	config.AllowHeaders = []string{
		"Origin",
		"Content-Length",
		"Content-Type",
		"Authorization",
	}

	httpRouter.Use(static.Serve("/public", static.LocalFile("./public", true)))

	httpRouter.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"data": "Up and Running..."})
	})

	httpRouter.Use(cors.New(config))

	return GinRouter{
		Gin: httpRouter,
	}

}
