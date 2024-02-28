import { useState } from "react";
import { motion } from "framer-motion";
import style from "./Button.module.css";
import Form from "../Form";

interface IProps {
  createTask: (title: string, description: string) => Promise<void>;
}

const Button = ({ createTask }: IProps) => {
  const [showForm, setShowForm] = useState(false);

  const showContainer = () => {
    setShowForm(!showForm);
  };

  return (
    <section className={style.button}>
      <motion.input
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        type="button"
        value="Criar Tarefa"
        onClick={showContainer}
      />
      {showForm && (
        <Form
          createTask={createTask}
          showForm={showForm}
          setShowForm={setShowForm}
        />
      )}
    </section>
  );
};

export default Button;
