import { useEffect, useState } from "react";
import { ITask } from "../interfaces/task";
import axios from "axios";
import style from "./App.module.css";
import Header from "../components/Header";
import Tasks from "../components/Tasks";
import Button from "../components/Button";

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    readTasks();
  }, []);

  const createTask = async (title: string, description: string) => {
    const newTask = {
      title,
      description,
      isCompleted: false,
    };

    try {
      await axios.post("http://localhost:3030/tasks", newTask);
    } catch (event) {
      console.error(event);
    }
    await readTasks();
  };

  const readTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3030/tasks");
      setTasks(response.data);
    } catch (event) {
      console.error(event);
    }
  };

  const updateTask = async (id: string, title: string, description: string) => {
    const newTask = {
      title,
      description,
    };

    try {
      await axios.put(`http://localhost:3030/tasks/${id}`, newTask);
    } catch (event) {
      console.error(event);
    }
    await readTasks();
  };

  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3030/tasks/${id}`);
    } catch (event) {
      console.error(event);
    }
    await readTasks();
  };

  const completeTask = async (id: string) => {
    try {
      await axios.patch(`http://localhost:3030/tasks/${id}`);
      setTasks(tasksAntigas =>
        tasksAntigas.map(task => ({
          ...task,
          isCompleted: task._id === id ? !task.isCompleted : task.isCompleted,
        })),
      );
    } catch (event) {
      console.error(event);
    }
  };

  return (
    <div className={style.App}>
      <Header />
      <Tasks
        tasks={tasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
        completeTask={completeTask}
      />
      <Button createTask={createTask} />
    </div>
  );
}

export default App;
