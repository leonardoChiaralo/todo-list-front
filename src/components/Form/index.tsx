import { FormEvent, useState } from "react";
import style from "./Form.module.css";

interface IProps {
  createTask: (title: string, description: string) => void;
  showForm: boolean;
  setShowForm: (boolean: boolean) => void;
}

const Form = ({ createTask, showForm, setShowForm }: IProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (!title) return;
    createTask(title, description);
    setTitle("");
    setDescription("");
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <section
      className={style.form}
      style={{ display: showForm ? "block" : "none" }}
    >
      <form onSubmit={handleSubmit}>
        <input
          autoFocus
          type="text"
          value={title}
          onChange={event => setTitle(event.target.value)}
          placeholder="Escreva sua tarefa aqui!"
          required
        />
        <textarea
          value={description}
          rows={8}
          cols={35}
          onChange={event => setDescription(event.target.value)}
          placeholder="Descreva sua tarefa"
          required
        />
        <button type="button" onClick={handleCancel}>
          Cancelar
        </button>
        <button type="submit">Salvar</button>
      </form>
    </section>
  );
};

export default Form;
