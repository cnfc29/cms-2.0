import { useState } from "react";
import styles from "./ApprovedFilter.module.css";
import { useApplications } from "../../HOCs/ApplicationsContext";
import FilterButton from "../FilterButton/FilterButton";
import { filterButtons } from "./constant";

export default function ApprovedFilter() {
  const { setFilter } = useApplications();
  const [activeFilter, setActiveFilter] = useState("all");

  const handleFilterChange = (filter, filterValue) => {
    setFilter(filterValue);
    setActiveFilter(filter);
  };

  return (
    <>
      <div className={styles.container}>
        {filterButtons.map(({ label, value, filterKey }) => (
          <FilterButton
            key={filterKey}
            onClick={() => handleFilterChange(filterKey, value)}
            active={activeFilter === filterKey}
          >
            {label}
          </FilterButton>
        ))}
      </div>
    </>
  );
}
