import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { AllowedTypesMap, allowedTypes } from "./constant";
import { ROUTER } from "../router.config";

const SearchTypeContext = createContext();

export const SearchTypeProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const queryType = searchParams.get("type");

  const initialType =
    location.pathname === ROUTER.applications &&
    allowedTypes.includes(queryType)
      ? queryType
      : location.pathname === ROUTER.applications
      ? AllowedTypesMap.all
      : AllowedTypesMap.approved;

  const [selectedType, setSelectedType] = useState(initialType);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (location.pathname === ROUTER.applications) {
      setSearchParams({ type: selectedType });
      setSearchQuery("");
    }
  }, [selectedType, setSearchParams, location.pathname]);

  return (
    <SearchTypeContext.Provider
      value={{ selectedType, setSelectedType, searchQuery, setSearchQuery }}
    >
      {children}
    </SearchTypeContext.Provider>
  );
};

export const useSearchType = () => useContext(SearchTypeContext);
