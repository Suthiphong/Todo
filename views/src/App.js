import React,{useState,useEffect} from 'react';
import logo from './logo.svg';
import Go from './img/right.png';
import './App.css';
import {getTodos, insertTodo, deleteTodo, editTodo} from './userFunction.js'
function App() {
  const [data, setData] = useState(['Lorem Ipsum is simply dummy text of the printing', 'jingjo'])
  const [arr, setArr] = useState([])
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState(false)

  const userHandle = (e) => {
    setInput(e.target.value)
  }

  useEffect(()=> {
     requestServer()
  }, [])

  const requestServer = () => {
    const res = getTodos()
    res.then(data => setArr([...data.data]))

  }

  const inserNew = async () => {
    const result = await insertTodo(input)
    if(result.data.InsertedID.length > 0) {
      let newArr = [...arr,{
        ID:result.data.InsertedID,
        Text: input,
        Completed: false
      }]
      setArr([...newArr])
      setInput('')
    }
  }

  const funcRemove = async (el) => {
    const result = await deleteTodo(el)
    if(result.data.DeletedCount != 0) {
      let oldData = arr
      let fil = oldData.filter(i => i.ID != el)
      setArr([...fil])
    }
  }
  const edit = async (index) => {
    let newval = prompt('new value')
    let newTodo = {
      ID: index,
      Text: newval,
      Completed: false
    }

    const res = await editTodo(newTodo)
    if(res.data.ModifiedCount != 0) {
      requestServer()
    }
  }
  const ComHandle = async (el) => {
    let newTodo = {
      ID: el.ID,
      Text: el.Text,
      Completed:  !el.Completed
    }
    const res = await editTodo(newTodo)
    if(res.data.ModifiedCount != 0) {
      requestServer()
    }
  }
  const renderTodos = () => {
    let fill = (filter) ? arr.filter( el => el.Completed == true) : arr
    return (
      fill.map((item,keys) => (
          <div className="todo-item">
            <p>
              {(item.Completed) ? <s>{item.Text}</s> : item.Text}
            </p>
            <div className="bottom_menu">
            <button className="button_normal" onClick={()=>ComHandle(item)}>{!(item.Completed) ? "Complete" : "Undo"}</button>
            <button className="button_normal" onClick={()=>funcRemove(item.ID, keys)}>Remove</button>
            <button className="button_normal" onClick={()=>edit(item.ID)}>Edit</button>
            </div>
          </div>
    )))
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
      <div style={{
          color:'#bebebe'
        }}>
        React + Golang + MongoDB
      </div>
          <img src={logo} className="App-logo" alt="logo" />
          <img src={Go} className="go-logo" alt="logo" />
      <div className="header">
        TODOLIST | <a href="https://www.facebook.com/suthiphong.pinkartist?ref=bookmarks" target="_blank">FACEBOOK</a> | <a href="https://github.com/Suthiphong/Todo" target="_blank">GITHUB</a>
      </div>
      <div className="contain">
        <input className="text_input" value={input} onChange={userHandle} placeholder="type..." type="text" />
        <button className="button_add" onClick={inserNew}>Add</button>
        <div style={{marginTop:10}}>
          <label style={{color:'#bebebe'}}>filter : </label>
          <button className={(!filter) ? "UsedAct" : "UsedNo"} onClick={()=> {
              setFilter(!filter)
            }}>Use</button>
        </div>
      </div>
      <div className="todo-list">
        {renderTodos()}
      </div>
    </div>
  );
}

export default App;
