import { ITask } from "../../interfaces/task";
import Item from "./Item";
import style from "./Tasks.module.css";

interface IProps {
  tasks: ITask[];
  updateTask: (id: string, title: string, description: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  completeTask: (id: string) => Promise<void>;
}

const Tasks = ({ tasks, updateTask, deleteTask, completeTask }: IProps) => {
  return (
    <section className={style.tasks}>
      <h2 className={style.title}>Tarefas</h2>
      {tasks.map(task => (
        <Item
          key={task._id}
          task={task}
          updateTask={updateTask}
          deleteTask={deleteTask}
          completeTask={completeTask}
        />
      ))}
    </section>
  );
};

export default Tasks;
