package Model

//Todo struct
type Todo struct {
	ID        string `bson:"_id"`
	Text      string `bson:"text"`
	Completed bool   `bson:"completed"`
}
