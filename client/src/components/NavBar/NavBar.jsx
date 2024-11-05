import React from "react";
import styles from "./NavBar.module.css";
import ItemLink from "../../ui/ItemLink/ItemLink";
import { useApplications } from "../../HOCs/ApplicationsContext";

export default function NavBar() {
  const { selectedType, setSelectedType, applications } = useApplications();
  return (
    <div className={styles.container}>
      <ItemLink
        text="Заявки"
        total={applications.all}
        isActive={selectedType === "all"}
        onClick={() => setSelectedType("all")}
      />
      <ItemLink
        text="Одобренные"
        total={applications.approved}
        isActive={selectedType === "approved"}
        onClick={() => setSelectedType("approved")}
      />
      <ItemLink
        text="Отклоненные"
        total={applications.rejected}
        isActive={selectedType === "rejected"}
        onClick={() => setSelectedType("rejected")}
      />
    </div>
  );
}
