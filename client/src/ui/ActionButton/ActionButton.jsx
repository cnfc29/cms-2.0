import styles from "./ActionButton.module.css";
export default function ActionButton({ children, onClick }) {
  return (
    <div>
      <button onClick={onClick} className={styles.button}>
        {children}
      </button>
    </div>
  );
}
