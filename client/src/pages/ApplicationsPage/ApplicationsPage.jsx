import React, { useEffect, useState } from "react";
import styles from "./ApplicationsPage.module.css";
import NavBar from "../../components/NavBar/NavBar";
import ContentContainer from "../../ui/ContentContainer/ContentContainer";
import { useApplications } from "../../HOCs/ApplicationsContext";
import SearchInput from "../../ui/SearchInput/SearchInput";
import CardsTitle from "../../ui/CardsTitle/CardsTitle";

export default function ApplicationsPage() {
  const { applications, setSearchQuery, selectedType, loading } =
    useApplications();
  const [localSearchQuery, setLocalSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setLocalSearchQuery(e.target.value);
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setLocalSearchQuery("");
    setSearchQuery("");
  };

  useEffect(() => {
    setLocalSearchQuery("");
  }, [selectedType]);

  return (
    <ContentContainer>
      <NavBar />
      <SearchInput
        value={localSearchQuery}
        onChange={handleSearchChange}
        onClear={handleClearSearch}
      />
      <div className={styles.applicationsContainer}>
        {localSearchQuery ? (
          <CardsTitle
            type={selectedType}
            search={true}
            total={applications?.cards?.length}
          />
        ) : (
          <CardsTitle type={selectedType} total={applications?.cards?.length} />
        )}
        <div className={styles.applicationsList}>
          {loading ? (
            <div>Загрузка...</div>
          ) : (
            <>
              {applications?.cards?.length === 0 && localSearchQuery ? (
                <div>По вашему запросу ничего не найдено</div>
              ) : applications?.cards?.length === 0 && !localSearchQuery ? (
                <div>Список анкет пока пуст</div>
              ) : (
                applications?.cards?.map((el) => (
                  <div className={styles.cardWrapper + " " + styles[selectedType]} key={el.id}>
                    <div className={styles.cardContainer + " " + styles[selectedType]} onClick={() => window.open(el.link)}>{el.name}</div>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </ContentContainer>
  );
}
