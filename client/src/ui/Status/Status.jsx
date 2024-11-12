import React from "react";
import styles from "./Status.module.css";

export default function Status({ status }) {
  return (
    <div className={styles.container + " " + styles[status]}>
      {status === "approved"
        ? "Одобрено"
        : status === "rejected"
        ? "Отклонено"
        : ""}
    </div>
  );
}
