import React from "react";
import styles from "./ContentContainer.module.css";

export default function ContentContainer({ children }) {
  return <div className={styles.container}>{children}</div>;
}
