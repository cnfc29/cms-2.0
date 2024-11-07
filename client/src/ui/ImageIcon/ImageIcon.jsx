import React from "react";
import styles from "./ImageIcon.module.css";

export default function ImageIcon({ image }) {
  return (
    <div className={styles.image}>
      <img src={image} alt="" />
    </div>
  );
}
