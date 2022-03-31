package main

import (
    // "github.com/gin-contrib/cors"
    "portal/infrastructure"
    "portal/setup"
)

func init() {
    infrastructure.LoadEnv()
}

func main() {

    router := infrastructure.NewGinRouter() //router has been initialized and configured
    setup.InitializeServices(router) //passing router
    
    // router.Gin.Use(cors.Default())
    router.Gin.Run(":8000") //server started on 8000 port
}
