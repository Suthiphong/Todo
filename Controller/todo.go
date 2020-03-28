package Controller

//package main

import (
	"context"
	"log"

	"local/backend/Config"
	"local/backend/Model"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func GetTodos(c *gin.Context) {
	findOptions := options.Find()
	var results []*Model.Todo
	cur, err := Config.Collect.Find(context.TODO(), bson.D{{}}, findOptions)
	if err != nil {
		log.Fatal(err)
	}
	for cur.Next(context.TODO()) {
		var elem Model.Todo
		err := cur.Decode(&elem)
		if err != nil {
			log.Fatal(err)
		}
		results = append(results, &elem)
	}

	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}
	cur.Close(context.TODO())
	c.JSON(200, results)
}

func InsertData(c *gin.Context) {
	var todo Model.Todo
	c.Bind(&todo)
	result, err := Config.Collect.InsertOne(context.TODO(), bson.D{
		{Key: "text", Value: todo.Text},
		{Key: "completed", Value: false},
	})
	if err != nil {
		log.Fatal(err)
	}

	c.JSON(200, result)
}

func DeleteData(c *gin.Context) {
	//c.JSON(200, c.Param("id"))
	idPrimitive, err := primitive.ObjectIDFromHex(c.Param("id"))
	deleteResult, err := Config.Collect.DeleteOne(context.TODO(), bson.D{
		{Key: "_id", Value: idPrimitive},
	})
	if err != nil {
		log.Fatal(err)
	}
	c.JSON(200, deleteResult)

}

func EditData(c *gin.Context) {
	var todo Model.Todo
	c.Bind(&todo)
	idPrimitive, err := primitive.ObjectIDFromHex(todo.ID)
	filter := bson.D{
		{Key: "_id", Value: idPrimitive},
	}
	update := bson.D{
		{"$set", bson.D{
			{Key: "text", Value: todo.Text},
			{Key: "completed", Value: todo.Completed},
		}},
	}

	updateResult, err := Config.Collect.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		log.Fatal(err)
	}

	c.JSON(200, updateResult)
}
