import React,{useState,useEffect} from 'react';
import logo from './logo.svg';
import Go from './img/right.png';
import './App.css';
import {getTodos, insertTodo, deleteTodo, editTodo} from './userFunction.js'


function App() {
  const [data, setData] = useState(['Lorem Ipsum is simply dummy text of the printing', 'jingjo'])
  const [arr, setArr] = useState([])
  const [input, setInput] = useState('')

  const userHandle = (e) => {
    setInput(e.target.value)
  }

  useEffect(()=> {
    const res = getTodos()
    res.then(data => setArr(data.data.reverse()))
  }, [])
  const inserNew = () => {
    const result = insertTodo(input)
    console.log(`result insertIodo ${result}`)
    /*let olddata = data
    let newdata = [...data, input]
    setInput('')
    setData(newdata)*/

  }
  const funcRemove = (index) => {
    const result = deleteTodo(index)
    /*let oldData = data
    let newData = oldData.filter((val, i) => i != index)
    setData(newData)*/
  }
  const edit = (index) => {
    let newval = prompt('new value')
    let newTodo = {
      _id: index,
      text: newval,
      completed: false
    }
    const res = editTodo(newTodo)
    console.log(res)
    /*let oldData = data
    oldData[index] = newval
    let newData = oldData
    setData([...newData])*/
  }
  const renderTodos = () => {
    return arr.map((item,keys) => (
          <div className="todo-item">
            <p>
              {item.Text}
            </p>
            <div className="bottom_menu">
              <button className="button_normal" onClick={()=>funcRemove(keys)}>Complete</button>
            <button className="button_normal" onClick={()=>funcRemove(item.ID)}>Remove</button>
          <button className="button_normal" onClick={()=>edit(item.ID)}>Edit</button>
            </div>
          </div>
    ))
  }

  const renderItem = () => {
    return data.map((item,keys) => (
          <div className="todo-item">
            <p>
              {item}
            </p>
            <div className="bottom_menu">
              <button className="button_normal" onClick={()=>funcRemove(keys)}>Complete</button>
              <button className="button_normal" onClick={()=>funcRemove(keys)}>Remove</button>
              <button className="button_normal" onClick={()=>edit(keys)}>Edit</button>
            </div>
          </div>
    ))
  }

  return (
    <div className="App">
          <img src={logo} className="App-logo" alt="logo" />
          <img src={Go} className="go-logo" alt="logo" />
        <button onClick={()=> {
          console.log(arr);
          }}>Button for test</button>
      <div className="header">
        TODOLIST | <a href="https://www.facebook.com/suthiphong.pinkartist?ref=bookmarks" target="_blank">FACEBOOK</a> | <a href="https://github.com/Suthiphong">GITHUB</a>
      </div>
      <div className="contain">
        <input className="text_input" value={input} onChange={userHandle} placeholder="type..." type="text" />
        <button className="button_add" onClick={inserNew}>Add</button>
      </div>
      <div className="todo-list">
        {renderTodos()}
      </div>
    </div>
  );
}

export default App;
