import styles from "./Status.module.css";

export default function Status({ status }) {
  const text =
    status === "approved"
      ? "Одобрено"
      : status === "rejected"
      ? "Отклонено"
      : "";

  return <div className={`${styles.container} ${styles[status]}`}>{text}</div>;
}
