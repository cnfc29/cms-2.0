import React, { useState } from "react";
import styles from "./ApprovedFilter.module.css";
import { useApplications } from "../../HOCs/ApplicationsContext";

export default function ApprovedFilter() {
  const { setFilter } = useApplications();
  const [activeFilter, setActiveFilter] = useState("all");

  const handleFilterChange = (filter, filterValue) => {
    setFilter(filterValue);
    setActiveFilter(filter);
  };

  return (
    <div className={styles.container}>
      <button
        onClick={() => handleFilterChange("all", {})}
        className={`${styles.btn} ${
          activeFilter === "all" ? styles.active : ""
        }`}
      >
        Все
      </button>
      <button
        onClick={() => handleFilterChange("qr1", { qr: 1 })}
        className={`${styles.btn} ${
          activeFilter === "qr1" ? styles.active : ""
        }`}
      >
        есть QR
      </button>
      <button
        onClick={() => handleFilterChange("qr0", { qr: 0 })}
        className={`${styles.btn} ${
          activeFilter === "qr0" ? styles.active : ""
        }`}
      >
        нет QR
      </button>
      <button
        onClick={() => handleFilterChange("vip", { vip: 1 })}
        className={`${styles.btn} ${
          activeFilter === "vip" ? styles.active : ""
        }`}
      >
        VIP
      </button>
    </div>
  );
}
