import React from "react";
import styles from "./ApproveButton.module.css";

export default function ApproveButton({ onClick }) {
  return (
    <button onClick={onClick} className={styles.button}>
      Одобрить
    </button>
  );
}
