import { ButtonHTMLAttributes } from "react";
import styles from "./styles.module.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, ...props }: ButtonProps) => (
  <button className={styles.button} {...props}>
    {children}
  </button>
);
