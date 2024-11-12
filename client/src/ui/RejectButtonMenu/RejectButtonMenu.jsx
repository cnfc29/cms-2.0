import React from "react";
import styles from "./RejectButtonMenu.module.css";

export default function RejectButtonMenu({ onClick }) {
  return (
    <button onClick={onClick} className={styles.button}>
      В отклоненные
    </button>
  );
}
