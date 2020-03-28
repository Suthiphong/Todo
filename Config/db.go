package Config

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var Collect *mongo.Collection

type DBConfig struct {
	ConnectionURL string
	Dbname        string
	Collec        string
}

func BuildConfig() *DBConfig {
	conf := DBConfig{
		ConnectionURL: "mongodb://localhost:27017",
		Dbname:        "assignmentGo",
		Collec:        "todo",
	}
	return &conf
}

func init() {
	client, err := mongo.NewClient(options.Client().ApplyURI(BuildConfig().ConnectionURL))
	if err != nil {
		log.Fatal(err)
	}
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}

	db := client.Database(BuildConfig().Dbname)
	Collect = db.Collection(BuildConfig().Collec)

}
