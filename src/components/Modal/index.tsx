import React, { useState } from "react";
import { motion } from "framer-motion";
import { ITask } from "../../interfaces/task";
import style from "./Modal.module.css";
import Backdrop from "../Backdrop";

interface IProps {
  task: ITask;
  handleClose: () => void;
  updateTask: (id: string, title: string, description: string) => Promise<void>;
}

const Modal = ({ task, handleClose, updateTask }: IProps) => {
  const [editing, setEditing] = useState(false);
  const [titleEdited, setTitleEdited] = useState(task.title);
  const [descriptionEdited, setDescriptionEdited] = useState(task.description);

  const handleEdit = () => {
    editing === true ? setEditing(false) : setEditing(true);
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleEdited(event.target.value);
  };

  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescriptionEdited(event.target.value);
  };

  const handleSave = () => {
    updateTask(task._id, titleEdited, descriptionEdited);
    setEditing(false);
  };

  const status = task.isCompleted ? "Completa" : "A Fazer";

  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "-100vh",
      opacity: 0,
    },
  };

  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        className={style.modal}
        onClick={event => event.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className={style.titleContainer}>
          {editing ? (
            <input
              autoFocus
              className={style.editTitle}
              type="text"
              value={titleEdited}
              onChange={handleChangeTitle}
            />
          ) : (
            <h2 className={style.title}>{titleEdited}</h2>
          )}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleEdit}
          >
            Editar
          </motion.button>
        </div>
        <div className={style.descriptionContainer}>
          <p className={style.status}>{status}</p>
          {editing ? (
            <textarea
              className={style.editDescription}
              value={descriptionEdited}
              rows={10}
              cols={48}
              onChange={handleChangeDescription}
            />
          ) : (
            <p className={style.description}>{task.description}</p>
          )}
        </div>
        {editing ? (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={style.saveButton}
            onClick={handleSave}
          >
            Salvar
          </motion.button>
        ) : (
          ""
        )}
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
