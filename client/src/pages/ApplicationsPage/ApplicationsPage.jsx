import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import ContentContainer from "../../ui/ContentContainer/ContentContainer";
import { useApplications } from "../../HOCs/ApplicationsContext";
import SearchInput from "../../ui/SearchInput/SearchInput";
import ApplicationsContainer from "../../ui/ApplicationsContainer/ApplicationsContainer";

export default function ApplicationsPage() {
  const { setSearchQuery, selectedType } = useApplications();

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
      <ApplicationsContainer localSearchQuery={localSearchQuery} />
    </ContentContainer>
  );
}
