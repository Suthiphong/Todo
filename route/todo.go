package route

import (
	"local/backend/Controller"

	"github.com/gin-gonic/gin"
)

/*
	SOMEENDPOINT ROUTE /todo
	GET 	/ =>  TODOS
	POST 	/ =>  CreateTodo
	PUT 	/ =>  UPDATE
	DELETE  / =>  REMOTE

*/

func Todo(router *gin.RouterGroup) {
	router.GET("/", Controller.GetTodos)
	router.POST("/", Controller.InsertData)
	router.PUT("/", Controller.EditData)
	router.DELETE("/:id", Controller.DeleteData)
}
