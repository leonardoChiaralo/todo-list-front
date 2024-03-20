import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
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
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.1 }}
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
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="button"
          onClick={handleCancel}
        >
          Cancelar
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="submit"
        >
          Salvar
        </motion.button>
      </form>
    </motion.section>
  );
};

export default Form;
