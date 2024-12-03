import React, { forwardRef, useRef, useImperativeHandle } from "react";
import MaskedInput from "react-text-mask";
import styles from "../Input/Input.module.css";

const MaskedInputComponent = forwardRef(
  ({ placeholder, error, label, ...rest }, ref) => {
    const inputRef = useRef();

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current.inputElement.focus();
      },
    }));

    const mask = [
      "+",
      "7",
      " ",
      "(",
      /[1-9]/,
      /\d/,
      /\d/,
      ")",
      " ",
      /\d/,
      /\d/,
      /\d/,
      "-",
      /\d/,
      /\d/,
      "-",
      /\d/,
      /\d/,
    ];

    const handleFocus = (e) => {
      if (e.target.value === "") {
        e.target.value = "+7 (";
      }
    };

    const handleBlur = (e) => {
      if (e.target.value === "+7 (") {
        e.target.value = "";
      }
    };

    return (
      <div className={styles.inputContainer}>
        {label && <div className={styles.label}>{label}</div>}
        <MaskedInput
          {...rest}
          mask={mask}
          placeholder={placeholder}
          className={`${styles.input} ${error ? styles.inputError : ""}`}
          ref={inputRef}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {error && <span className={styles.errorText}>{error.message}</span>}
      </div>
    );
  }
);

export default MaskedInputComponent;
