import styles from "./ImageIcon.module.css";
import userIcon from "@images/ui/ImageIcon/images/user-icon.svg";

export default function ImageIcon({ image, big }) {
  return (
    <div className={`${styles.image} ${big ? styles.big : ""}`}>
      <img src={image} alt="" />
    </div>
  );
}
