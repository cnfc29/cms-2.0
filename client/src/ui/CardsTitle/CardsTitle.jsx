import React from "react";
import styles from "./CardsTitle.module.css";

export default function CardsTitle({ type, total, search }) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {search
          ? "Результаты поиска"
          : type === "all"
          ? "Заявки"
          : type === "approved"
          ? "Одобренные анкеты"
          : "Отклоненные анкеты"}
      </div>
      <div className={`${styles.total} ${styles[type]}`}>{total}</div>
    </div>
  );
}
