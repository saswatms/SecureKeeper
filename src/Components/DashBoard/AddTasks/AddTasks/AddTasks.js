import { useEffect, useState } from "react";
import "./AddTasks.css";
import TaskCard from "./TaskCard";

const AddTasks = () => {
  const [isInputEnabled, setIsInputEnabled] = useState(false);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const [curTask, setCurTask] = useState([]);

  const [tasks, setTasks] = useState([]);

  const isValid = () => {
    if (title && note) {
      return true;
    } else {
      alert("Entry Fields Can't Be Empty");
    }
  };

  const onAddTasksInLocalStorage = (task) => {
    localStorage.setItem("tasks", JSON.stringify(task));
  };
  const localStorageTaskItem = JSON.parse(localStorage.getItem("tasks"));
  useEffect(() => {
    if (localStorageTaskItem) {
      setTasks(localStorageTaskItem);
    }
  }, [localStorageTaskItem, title]);

  const OnAddHandler = () => {
    let validate = isValid();
    if (validate) {
      let taskItem = {
        title,
        note,
        id: curTask.id,
      };
      if (isEditEnabled) {
        onAddTasksInLocalStorage([taskItem, ...tasks]);
        setTasks([taskItem, ...tasks]);
        setTitle("");
        setNote("");
        setIsInputEnabled(false);
        setIsEditEnabled(false);
      } else {
        let taskItem = {
          id: tasks.length + 1,
          title,
          note,
        };

        onAddTasksInLocalStorage([taskItem, ...tasks]);
        setTasks([taskItem, ...tasks]);
        setTitle("");
        setNote("");
        setIsInputEnabled(false);
      }
    }
  };

  const deleteHandler = (curTask) => {
    const newArray = tasks.filter((data) => data.id !== curTask.id);
    setTasks(newArray);
    localStorage.setItem("tasks", JSON.stringify(newArray));
  };

  const onEditClickHandler = (curTask) => {
    setCurTask(curTask);
    setIsEditEnabled(true);
    setIsInputEnabled(true);
    setTitle(curTask.title);
    setNote(curTask.note);
    deleteHandler(curTask);
  };

  return (
    <div>
      <div className="addTasks">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onClick={() => {
            setIsInputEnabled(true);
          }}
          className="addInput"
          type="text"
          placeholder="Title"
        />
        {isInputEnabled ? (
          <>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Take a note..."
              className="addInput resize"
            />
            <button onClick={() => OnAddHandler()}>+</button>
          </>
        ) : null}
      </div>

      <div
        style={{
          display: "flex",
          margin: "50px auto 0px auto",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {tasks.length
          ? tasks.map((data, index) => (
            <TaskCard
              key={index}
              data={data}
              deleteHandler={deleteHandler}
              onEditClickHandler={onEditClickHandler}
            />
          ))
          : null}
      </div>
    </div>
  );
};

export default AddTasks;
