import React, { createContext, useContext, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import debounce from "lodash.debounce";

const ApplicationsContext = createContext();

const allowedTypes = ["all", "approved", "rejected"];

export const ApplicationProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryType = searchParams.get("type");
  const initialType = allowedTypes.includes(queryType) ? queryType : "all";

  const [selectedType, setSelectedType] = useState(initialType);
  const [applications, setApplications] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const debouncedSearch = debounce((query) => {
    setSearchQuery(query);
  }, 500);

  const resetSearchQuery = () => {
    setSearchQuery("");
    setApplications((prev) => ({ ...prev, cards: [] }));
  };

  useEffect(() => {
    if (queryType !== selectedType) {
      setSearchParams({ type: selectedType });
      setSearchQuery("");
    }
  }, [selectedType, queryType, setSearchParams]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/applications", {
        params: { type: selectedType, search: searchQuery },
      })
      .then((res) => setApplications(res.data))
      .catch((error) => console.error("Ошибка при получении данных:", error))
      .finally(() => setLoading(false));
  }, [selectedType, searchQuery]);

  return (
    <ApplicationsContext.Provider
      value={{
        selectedType,
        setSelectedType: (type) => {
          if (type !== selectedType) {
            setSelectedType(type);
            resetSearchQuery();
          }
        },
        applications,
        loading,
        setSearchQuery: debouncedSearch,
      }}
    >
      {children}
    </ApplicationsContext.Provider>
  );
};

export const useApplications = () => useContext(ApplicationsContext);
