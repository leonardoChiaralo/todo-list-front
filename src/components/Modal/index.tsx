import React, { useState } from "react";
import { ITask } from "../../interfaces/task";
import style from "./Modal.module.css";

interface IProps {
  task: ITask;
  showModal: boolean;
  setShowModal: (boolean: boolean) => void;
  updateTask: (id: string, title: string, description: string) => Promise<void>;
}

const Modal = ({ task, showModal, setShowModal, updateTask }: IProps) => {
  const [editing, setEditing] = useState(false);
  const [titleEdited, setTitleEdited] = useState(task.title);
  const [descriptionEdited, setDescriptionEdited] = useState(task.description);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if ((event.target as HTMLElement).classList.contains(style.background)) {
      setShowModal(false);
    }
  };

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

  return (
    <div
      className={style.background}
      onClick={handleClick}
      style={{ display: showModal ? "block" : "none" }}
    >
      <section className={style.modal}>
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
          <button onClick={handleEdit}>Editar</button>
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
          <button className={style.saveButton} onClick={handleSave}>
            Salvar
          </button>
        ) : (
          ""
        )}
      </section>
    </div>
  );
};

export default Modal;
