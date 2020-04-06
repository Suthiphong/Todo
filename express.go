package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	gin.SetMode(gin.ReleaseMode)
	r.GET("/", func(c *gin.Context) {
	  c.JSON(200, "hello world")
	})
	r.Run(":8080")
}
