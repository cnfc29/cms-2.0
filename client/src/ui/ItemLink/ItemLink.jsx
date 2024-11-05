import React from "react";
import styles from "./ItemLink.module.css";

export default function ItemLink({ text, isActive, total, onClick }) {
  return (
    <div
      className={`${styles.wrapper} ${
        isActive ? styles.active : styles.noActive
      }`}
      onClick={onClick}
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.total}>{total}</div>
          <div className={styles.text}>{text}</div>
        </div>
      </div>
    </div>
  );
}
