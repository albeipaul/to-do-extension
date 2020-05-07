import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [value, setValue] = useState("");

  const addTask = (text) => {
    const newTasks = [...tasks, { text }];

    localStorage.setItem("todos", JSON.stringify(newTasks));

    setTasks(newTasks);
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];

    newTasks[index].isCompleted = !newTasks[index].isCompleted;

    localStorage.setItem("todos", JSON.stringify(newTasks));

    setTasks(newTasks);
  };

  const removeTask = (index) => {
    const newTasks = [...tasks];

    newTasks.splice(index, 1);

    localStorage.setItem("todos", JSON.stringify(newTasks));

    setTasks(newTasks);
  };

  useEffect(() => {
    const todos = localStorage.getItem("todos");

    if (todos) {
      setTasks(JSON.parse(todos));
    } else {
      setTasks([
        {
          text: "Learn ReactJS",
          isCompleted: false,
        },
        {
          text: "Use ReactJS to build a Chrome extension",
          isCompleted: false,
        },
      ]);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    value && addTask(value);
    setValue("");
  };

  return (
    <div className="todo-list">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          placeholder="Enter a title for this task…"
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </form>
      {/* add todo */}

      <div className="todos-container">
        {(tasks.length &&
          tasks.map((task, index) => (
            <div className="todo" key={index}>
              <span
                onClick={() => toggleTask(index)}
                className={
                  task.isCompleted ? "todo-text todo-completed" : "todo-text"
                }
              >
                {task.text}
              </span>
              <button onClick={() => removeTask(index)}>
                <FontAwesomeIcon icon={faMinus} />
              </button>
            </div>

            // show all todos with a map
          ))) || (
          <div className="no-todos">
            Hooray, no tasks left!{" "}
            <span role="img" aria-label="party-emoji">
              🎉
            </span>
          </div>

          // no tasks left message
        )}
      </div>
    </div>
  );
}

export default App;
