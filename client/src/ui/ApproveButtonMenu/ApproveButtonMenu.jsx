import React from "react";
import styles from "./ApproveButtonMenu.module.css";

export default function ApproveButtonMenu({ onClick }) {
  return (
    <button onClick={onClick} className={styles.button}>
      В одобренные
    </button>
  );
}
