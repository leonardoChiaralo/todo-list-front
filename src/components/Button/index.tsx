import { useState } from "react";
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
      <input type="button" value="Criar Tarefa" onClick={showContainer} />
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
