import React from "react";
import styles from "./RejectButton.module.css";

export default function RejectButton({ onClick }) {
  return (
    <button onClick={onClick} className={styles.button}>
      Отклонить
    </button>
  );
}
