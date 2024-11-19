import styles from "./ButtonMenu.module.css";

export default function ButtonMenu({ children, onClick }) {
  return (
    <button onClick={onClick} className={styles.button}>
      {children}
    </button>
  );
}
