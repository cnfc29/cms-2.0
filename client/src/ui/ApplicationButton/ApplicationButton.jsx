import styles from "./ApplicationButton.module.css";

export default function ApplicationButton({ onClick, children, type }) {
  const buttonClass = type === "approve" ? styles.approve : styles.reject;
  return (
    <button onClick={onClick} className={`${styles.button} ${buttonClass}`}>
      {children}
    </button>
  );
}
