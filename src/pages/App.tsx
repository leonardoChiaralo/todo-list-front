import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ITask } from "../interfaces/task";
import "react-toastify/dist/ReactToastify.css";
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
      toast.success("Tarefa criada com sucesso!", {
        position: "top-center",
        theme: "colored",
      });
    } catch (err) {
      console.error(err);
      toast.error("Não foi possível criar a tarefa.", {
        position: "top-center",
        theme: "colored",
      });
    }
    await readTasks();
  };

  const readTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3030/tasks");
      setTasks(response.data);
    } catch (err) {
      console.error(err);
      toast.error("Não foi possível encontrar suas tarefas.", {
        position: "top-center",
        theme: "colored",
      });
    }
  };

  const updateTask = async (id: string, title: string, description: string) => {
    const newTask = {
      title,
      description,
    };

    try {
      await axios.put(`http://localhost:3030/tasks/${id}`, newTask);
      toast.success("Tarefa editada com sucesso!", {
        position: "top-center",
        theme: "colored",
      });
    } catch (event) {
      console.error(event);
      toast.error("Não possível editar a tarefa.", {
        position: "top-center",
        theme: "colored",
      });
    }
    await readTasks();
  };

  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3030/tasks/${id}`);
      toast.success("Tarefa removida com sucesso!", {
        position: "top-center",
        theme: "colored",
      });
    } catch (event) {
      console.error(event);
      toast.error("Não possível remover a tarefa.", {
        position: "top-center",
        theme: "colored",
      });
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
      toast.success("Tarefa atualizada com sucesso!", {
        position: "top-center",
        theme: "colored",
      });
    } catch (event) {
      console.error(event);
      toast.error("Não foi possível atualizar a tarefa.", {
        position: "top-center",
        theme: "colored",
      });
    }
  };

  return (
    <div className={style.App}>
      <ToastContainer />
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
