package main

import (
    "portal/infrastructure"
    "portal/setup"
)

func init() {
    infrastructure.LoadEnv()
}

func main() {

    router := infrastructure.NewGinRouter() //router has been initialized and configured

    setup.InitializeServices(router) //passing router
    
    router.Gin.Run(":8000") //server started on 8000 port
}
