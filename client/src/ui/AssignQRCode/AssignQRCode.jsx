import styles from "./AssignQRCode.module.css";

export default function AssignQRCode({ onClick }) {
  return (
    <button onClick={onClick} className={styles.button}>
      Присвоить QR
    </button>
  );
}
