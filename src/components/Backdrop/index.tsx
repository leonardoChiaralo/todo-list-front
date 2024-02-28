import { motion } from "framer-motion";
import { ReactNode } from "react";
import style from "./Backdrop.module.css";

interface IProps {
  children: ReactNode;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Backdrop = ({ children, onClick }: IProps) => {
  return (
    <motion.div
      className={style.backdrop}
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
