import React from "react";
import styles from "./ItemLink.module.css";

export default function ItemLink({ text, isActive, total, onClick }) {
  return (
    <div className={styles.wrapper} onClick={onClick}>
      <div className={styles.container}>
        <div className={`${styles.content} ${isActive ? styles.active : ""}`}>
          <div className={styles.total}>{total ? total : 0}</div>
          <div className={styles.text}>{text}</div>
        </div>
      </div>
    </div>
  );
}
