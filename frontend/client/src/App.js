import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Item from "./components/item";
import "remixicon/fonts/remixicon.css";
import { RiLoader3Line } from "react-icons/ri"; 

function App() {
  const [text, setText] = useState("");
  const [todo, setToDo] = useState([]);
  const [isUpdate, setUpdate] = useState("");
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/get-todo");
      setToDo(res.data);
    } catch (err) {
      setError("Failed to fetch tasks. Please try again.");
    }
    setLoading(false);
  };

  const addUpdateToDo = async () => {
    if (!text.trim()) {
      setError("Task cannot be empty.");
      return;
    }
    setLoading(true);
    try {
      if (isUpdate === "") {
        await axios.post("http://localhost:5000/save-todo", { text, completed: false });
      } else {
        await axios.post("http://localhost:5000/update-todo", {
          _id: isUpdate,
          text,
        });
        setUpdate("");
      }
      setText("");
      fetchData();
    } catch (err) {
      setError("Failed to save task. Please try again.");
    }
    setLoading(false);
  };

  const deleteToDo = async (_id) => {
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/delete-todo", { _id });
      fetchData();
    } catch (err) {
      setError("Failed to delete task. Please try again.");
    }
    setLoading(false);
  };

  const toggleComplete = async (_id, completed) => {
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/update-todo", { _id, completed: !completed });
      fetchData();
    } catch (err) {
      setError("Failed to update task. Please try again.");
    }
    setLoading(false);
  };

  const clearCompleted = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/clear-completed");
      fetchData();
    } catch (err) {
      setError("Failed to clear completed tasks. Please try again.");
    }
    setLoading(false);
  };

  const filteredTasks = todo.filter((item) =>
    filter === "all"
      ? true
      : filter === "completed"
      ? item.completed
      : !item.completed
  );

  const completedTasks = todo.filter((item) => item.completed);
  const activeTasks = todo.filter((item) => !item.completed);

  return (
    <div className="App">
      <div className="Container">
        <div className="title">
          <h1>Your To-Do List</h1>
        </div>
        <div className="top">
          <input
            type="text"
            placeholder="What to do..."
            value={text}
            onChange={(e) => {
              setError(""); 
              setText(e.target.value);
            }}
          />
          <button className="add" onClick={addUpdateToDo}>
            {isUpdate ? "Update" : "Add"}
          </button>
        </div>
        <div className="filters">
          <button onClick={() => setFilter("all")} className={filter === "all" ? "active" : ""}>
            All
          </button>
          <button onClick={() => setFilter("active")} className={filter === "active" ? "active" : ""}>
            Active
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={filter === "completed" ? "active" : ""}
          >
            Completed
          </button>
        </div>

        {error && <p className="error">{error}</p>}
        
        {loading && (
          <div className="loading">
            <RiLoader3Line className="spinner" />
          </div>
        )}

        {filter === "all" && (
          <p className="filter-message">
            {todo.length === 0 ? "No tasks available. Start adding tasks!" : `${todo.length} tasks available.`}
          </p>
        )}

        {filter === "active" && (
          <p className="filter-message">
            {activeTasks.length === 0 ? "No active tasks." : `${activeTasks.length} active tasks.`}
          </p>
        )}

        {filter === "completed" && (
          <p className="filter-message">
            {completedTasks.length === 0 ? "No completed tasks." : `${completedTasks.length} completed tasks.`}
          </p>
        )}

        <div className="list">
          {filteredTasks.map((item) => (
            <Item
              key={item._id}
              text={item.text}
              completed={item.completed}
              toggleComplete={() => toggleComplete(item._id, item.completed)}
              remove={() => deleteToDo(item._id)}
              update={() => {
                setUpdate(item._id);
                setText(item.text);
              }}
            />
          ))}
        </div>

        {filter === "completed" && completedTasks.length > 0 && (
          <div className="clear-completed">
            <button onClick={clearCompleted}>Clear Completed</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
