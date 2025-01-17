import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Item from "./components/item";
import "remixicon/fonts/remixicon.css";

function App() {
  const [text,setText] = useState("");
  const [todo,setToDo] = useState([]);
  const [isUpdate,setUpdate] = useState("");

  useEffect(()=>{
    axios.get("http://localhost:5000/get-todo").then((res)=>setToDo(res.data)).catch((err)=>console.log(err));
  })

  const addUpdateToDo = ()=>{
    if(isUpdate === ""){
      axios.post("http://localhost:5000/save-todo", {text}).then((res)=>{
      console.log(res.data); 
      setText("");
    })
      .catch((err)=>console.log(err));
    }
    else{
      axios.post("http://localhost:5000/update-todo", {_id:isUpdate, text})
      .then((res)=>{
        console.log(res.data); 
        setUpdate("");
      })
        .catch((err)=>console.log(err));
    }
  }

  const deleteToDo = (_id)=>{
      axios.post("http://localhost:5000/delete-todo", {_id}).then((res)=>{
      console.log(res.data); 
    })
      .catch((err)=>console.log(err));
  };

  const updateToDo = (_id, text)=>{
   setUpdate(_id);
   setText(text);
}

  return (
    <div className="App">
      <div className="Container">
      <div className="title">
       <h1>ToDo List</h1>
       </div>
       <div className="top">
       <input type="text" placeholder="Write your todo..." value={text} onChange={(e)=>setText(e.target.value)}/>
       <div className="add" onClick={addUpdateToDo}>
        {isUpdate? "Update" : "Add"}
       </div>
       </div>
       <div className="list">
        {todo.map((item)=>(
          <Item
          key={item._id}
          text={item.text}
          remove={()=>deleteToDo(item._id)}
          update={()=>updateToDo(item._id, item.text)}
          />
        ))}
       </div>
      </div>
    </div>
  );
}

export default App;
