import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import ContentContainer from "../../ui/ContentContainer/ContentContainer";
import { useApplications } from "../../HOCs/ApplicationsContext";

export default function ApplicationsPage() {
  const { applications, setSearchQuery, selectedType, loading } =
    useApplications();
  const [localSearchQuery, setLocalSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setLocalSearchQuery(e.target.value);
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    setLocalSearchQuery("");
  }, [selectedType]);

  return (
    <ContentContainer>
      <NavBar />
      <input
        type="search"
        placeholder="Поиск заявок"
        value={localSearchQuery}
        onChange={handleSearchChange}
      />
      {loading ? (
        <div>Загрузка...</div>
      ) : (
        <ul>
          {applications?.cards?.length === 0 && localSearchQuery ? (
            <li>По вашему запросу ничего не найдено</li>
          ) : applications?.cards?.length === 0 && !localSearchQuery ? (
            <li>Список заявок пуст</li>
          ) : (
            applications?.cards?.map((el) => <li key={el.id}>{el.name}</li>)
          )}
        </ul>
      )}
    </ContentContainer>
  );
}
