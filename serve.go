package main

import "net/http"

func main() {
 http.HandleFunc("/", func(w http.ResponseWriter, _){
	w.Write([]byte("hello"))
 })
 http.ListenAndServe(":8095", nil);
}
