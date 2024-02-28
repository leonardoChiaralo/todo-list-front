import { useState } from "react";
import { ITask } from "../../../interfaces/task";
import style from "./Item.module.css";
import Modal from "../../Modal";

interface IProps {
  key?: string;
  task: ITask;
  updateTask: (id: string, title: string, description: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  completeTask: (id: string) => Promise<void>;
}

const Item = ({ task, updateTask, deleteTask, completeTask }: IProps) => {
  const [showModal, setShowModal] = useState(false);

  const showContainer = () => {
    setShowModal(!showModal);
  };

  return (
    <section className={style.item}>
      <div>
        <button
          className={style.openModal}
          onClick={showContainer}
          style={{ textDecoration: task.isCompleted ? "line-through" : "" }}
        >
          {task.title}
        </button>
        {showModal && (
          <Modal
            task={task}
            showModal={showModal}
            setShowModal={setShowModal}
            updateTask={updateTask}
          />
        )}
      </div>

      <div>
        <button
          className={style.complete}
          onClick={() => completeTask(task._id)}
        >
          Completar
        </button>
        <button className={style.remove} onClick={() => deleteTask(task._id)}>
          Remover
        </button>
      </div>
    </section>
  );
};

export default Item;
