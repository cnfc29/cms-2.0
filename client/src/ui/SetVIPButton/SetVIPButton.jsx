import React from "react";
import styles from "./SetVIPButton.module.css";

export default function SetVIPButton({ onClick }) {
  return (
    <button onClick={onClick} className={styles.button}>
      Присвоить VIP
    </button>
  );
}
