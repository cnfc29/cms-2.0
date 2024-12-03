import styles from "./Status.module.css";

export default function Status({ status }) {
  const text =
    status === "approved" ? "Одобрен" : status === "rejected" ? "Отклонен" : "";

  return <div className={`${styles.container} ${styles[status]}`}>{text}</div>;
}
