import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import debounce from "lodash.debounce";
import { AllowedTypesMap } from "./constant";
import { fetchApplications } from "../API/api";
import { ROUTER } from "../router.config";
import { useSearchType } from "./SearchTypeProvider";

const ApplicationsContext = createContext();

export const ApplicationProvider = ({ children }) => {
  const { selectedType, setSearchQuery, searchQuery, setSelectedType } =
    useSearchType();

  const location = useLocation();

  const [applications, setApplications] = useState({});
  const [forceUpdate, setForceUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({});

  const debouncedSearch = debounce((query) => {
    setSearchQuery(query);
  }, 500);

  const resetSearchQuery = () => {
    setSearchQuery("");
    setApplications((prev) => ({ ...prev, cards: null }));
  };

  useEffect(() => {
    if (
      location.pathname === ROUTER.applications ||
      location.pathname.includes(ROUTER.application)
    ) {
      const loadApplications = async () => {
        try {
          setLoading(true);
          const data = await fetchApplications({
            type: selectedType === AllowedTypesMap.all ? "" : selectedType,
            search: searchQuery,
            page: 1,
            limit: 1000,
            filter,
          });
          setApplications(data);
        } catch (error) {
          console.error("Ошибка при загрузке заявок:", error);
        } finally {
          setLoading(false);
        }
      };

      loadApplications();
    }
  }, [selectedType, searchQuery, forceUpdate, filter, location.pathname]);

  return (
    <ApplicationsContext.Provider
      value={{
        selectedType,
        setSelectedType: (type) => {
          if (type !== selectedType || forceUpdate) {
            setSelectedType(type);
            setForceUpdate(false);
            resetSearchQuery();
            setFilter({});
          } else {
            setForceUpdate(true);
          }
        },
        applications,
        loading,
        setSearchQuery: debouncedSearch,
        setFilter,
        setApplications,
      }}
    >
      {children}
    </ApplicationsContext.Provider>
  );
};

export const useApplications = () => useContext(ApplicationsContext);
