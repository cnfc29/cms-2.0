import React, { forwardRef } from "react";
import styles from "./Input.module.css";

const Input = forwardRef(({ placeholder, type, error, ...rest }, ref) => {
  return (
    <div className={styles.inputContainer}>
      <input
        type={type}
        className={`${styles.input} ${error ? styles.inputError : ""}`}
        placeholder={placeholder}
        ref={ref}
        {...rest}
      />
      {error && <span className={styles.errorText}>{error.message}</span>}
    </div>
  );
});

export default Input;
