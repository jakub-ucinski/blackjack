import React, { ButtonHTMLAttributes, FC } from "react";
import styles from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FC<ButtonProps> = ({ className, children, ...props }) => {
  return (
    <button className={`${styles.Button} ${className ?? ""}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
