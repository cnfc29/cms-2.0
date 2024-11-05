import React from "react";
import styles from "./RegistrationButton.module.css";

export default function RegistrationButton({ onClick }) {
  return (
    <button type="submit" className={styles.btn} onClick={onClick}>
      Регистрация
    </button>
  );
}
