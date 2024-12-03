import { forwardRef } from "react";
import styles from "./Input.module.css";

const Input = forwardRef(
  ({ placeholder, label, type, error, ...rest }, ref) => {
    return (
      <div className={styles.inputContainer}>
        {label && <div className={styles.label}>{label}</div>}
        <input
          type={type}
          className={`${styles.input} ${error ? styles.inputError : ""}`}
          placeholder={!label ? placeholder : ""}
          ref={ref}
          {...rest}
        />
        {error && <span className={styles.errorText}>{error.message}</span>}
      </div>
    );
  }
);

export default Input;
