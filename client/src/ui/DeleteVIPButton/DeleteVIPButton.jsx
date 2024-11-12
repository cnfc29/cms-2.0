import React from "react";
import styles from "./DeleteVIPButton.module.css";

export default function DeleteVIPButton({ onClick }) {
  return (
    <button onClick={onClick} className={styles.button}>
      Убрать VIP
    </button>
  );
}
