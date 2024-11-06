import React from "react";
import styles from "./Input.module.css";

export default function Input({ placeholder, type }) {
  return (
    <input type={type} className={styles.input} placeholder={placeholder} />
  );
}
