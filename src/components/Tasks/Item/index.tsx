import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

  const close = () => setShowModal(false);
  const open = () => setShowModal(true);

  return (
    <section className={style.item}>
      <div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          className={style.openModal}
          onClick={() => (showModal ? close() : open())}
          style={{ textDecoration: task.isCompleted ? "line-through" : "" }}
        >
          {task.title}
        </motion.button>
        <AnimatePresence initial={false} onExitComplete={() => null}>
          {showModal && (
            <Modal handleClose={close} task={task} updateTask={updateTask} />
          )}
        </AnimatePresence>
      </div>

      <div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={style.complete}
          onClick={() => completeTask(task._id)}
        >
          Completar
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={style.remove}
          onClick={() => deleteTask(task._id)}
        >
          Remover
        </motion.button>
      </div>
    </section>
  );
};

export default Item;
