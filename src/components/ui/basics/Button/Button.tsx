import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button = ({ className, children, style, ...rest }: ButtonProps) => {
  return (
    <button
      style={{ ...style }}
      className={`${styles.button} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
