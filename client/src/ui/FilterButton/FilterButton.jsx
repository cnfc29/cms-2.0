import React from "react";
import styles from "./FilterButton.module.css";

export default function FilterButton({ onClick, children, active }) {
  const buttonClass = `${styles.btn} ${active ? styles.active : ""}`;
  return (
    <button onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
}
