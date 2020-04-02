package main

import (
	"local/backend/route"

	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
)

func main() {
	server := gin.Default()
	server.Use(cors.Default())
	
	todo := server.Group("/todo")
	route.Todo(todo)
	server.Run()
}
