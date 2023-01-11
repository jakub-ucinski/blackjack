import React, { FC, InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: FC<InputProps> = ({ className, ...props }) => {
  return <input className={`${styles.Input} ${className || ""}`} {...props} />;
};

export default Input;
