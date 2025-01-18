export default function Item({ text, completed, toggleComplete, remove, update }) {
    return (
      <div className={`item ${completed ? "completed" : ""}`}>
        <div className="text" onClick={toggleComplete}>
          <i
            className={`ri-check-line ${completed ? "ri-check-fill" : ""}`}
            aria-label="Mark as completed"
            title="Mark as completed"
          ></i>
          {completed ? <s>{text}</s> : text} 
        </div>
        <div className="icons">
          <i
            className="ri-pencil-fill"
            onClick={update}
            aria-label="Edit task"
            title="Edit"
          ></i>
          <i
            className="ri-delete-bin-7-fill"
            onClick={remove}
            aria-label="Delete task"
            title="Delete"
          ></i>
        </div>
      </div>
    );
  }
  