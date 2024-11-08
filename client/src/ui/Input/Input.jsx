import React, { forwardRef } from "react";
import styles from "./Input.module.css";

const Input = forwardRef(({ placeholder, type, ...rest }, ref) => {
  return (
    <input
      type={type}
      className={styles.input}
      placeholder={placeholder}
      ref={ref}
      {...rest}
    />
  );
});

export default Input;
