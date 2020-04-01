import axios from 'axios'

export const getTodos = () => {
  return axios
  .get("http://localhost:8080/todo/")
  .then( res=> {
    return res
  })
}

export const insertTodo = (data) => {
  return axios
  .post("http://localhost:8080/todo/", {
    text: data
  })
  .then( res => {
    return res
  })
}

export const editTodo = (data) => {
  return axios
  .put("http://localhost:8080/todo/", data)
  .then( res => {
    return res
  })

}

export const deleteTodo = (id) => {
  return axios
  .delete(`http://localhost:8080/todo/${id}`)
  .then( res => {
    return res
  })
}
