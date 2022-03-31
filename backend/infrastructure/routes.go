package infrastructure

import (
    "github.com/gin-contrib/cors"
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

    config.AllowOrigins = []string{"http://localhost:3000"}

    httpRouter.GET("/", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{"data": "Up and Running..."})
    })

    httpRouter.Use(cors.New(config))

    return GinRouter{
        Gin: httpRouter,
    }

}
