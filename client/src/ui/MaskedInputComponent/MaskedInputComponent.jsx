import React, { forwardRef, useRef, useImperativeHandle } from "react";
import MaskedInput from "react-text-mask";
import styles from "../Input/Input.module.css";

const MaskedInputComponent = forwardRef(
  ({ placeholder, error, ...rest }, ref) => {
    const inputRef = useRef();

    // Передаем метод focus на ref компонента
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

    return (
      <div className={styles.inputContainer}>
        <MaskedInput
          {...rest}
          mask={mask}
          placeholder={placeholder}
          className={`${styles.input} ${error ? styles.inputError : ""}`}
          ref={inputRef} // Передаем ref на внутренний input
        />
        {error && <span className={styles.errorText}>{error.message}</span>}
      </div>
    );
  }
);

export default MaskedInputComponent;
