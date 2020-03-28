package main

import (
	"local/backend/route"

	"github.com/gin-gonic/gin"
)

func main() {
	server := gin.Default()
	todo := server.Group("/todo")
	route.Todo(todo)

	server.Run()
}
