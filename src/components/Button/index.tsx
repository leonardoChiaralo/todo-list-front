import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
    <div>
      <section className={style.button}>
        <a href="#form">
          <motion.input
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            value="Criar Tarefa"
            onClick={showContainer}
          />
          <AnimatePresence>
            {showForm && (
              <Form
                id="form"
                createTask={createTask}
                showForm={showForm}
                setShowForm={setShowForm}
              />
            )}
          </AnimatePresence>
        </a>
      </section>
    </div>
  );
};

export default Button;
