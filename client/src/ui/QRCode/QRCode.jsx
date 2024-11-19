import styles from "./QRCode.module.css";

export default function QRCode({ image }) {
  return (
    <div className={styles.image}>
      <img src={image} alt="" />
    </div>
  );
}
