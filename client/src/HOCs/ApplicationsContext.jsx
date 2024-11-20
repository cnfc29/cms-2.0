import { createContext, useContext, useState, useEffect } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import { AllowedTypesMap, allowedTypes } from "./constant";
import {
  approve,
  reject,
  assignQRCodeFn,
  setVIPStatus,
  fetchApplications,
} from "../API/api";

const ApplicationsContext = createContext();

export const ApplicationProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const queryType = searchParams.get("type");

  const initialType =
    location.pathname === "/applications" && allowedTypes.includes(queryType)
      ? queryType
      : location.pathname === "/applications"
      ? AllowedTypesMap.all
      : null;

  const [selectedType, setSelectedType] = useState(initialType);
  const [applications, setApplications] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
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

  const approveHandler = async (id, updateStateCallback) => {
    try {
      const res = await approve(id);

      if (res.status === 200) {
        updateStateCallback(id);
      }
    } catch (error) {
      console.error("Ошибка при обновлении статуса заявки:", error);
    }
  };

  const rejectHandler = async (id, updateStateCallback) => {
    try {
      const res = await reject(id);

      if (res.status === 200) {
        updateStateCallback(id);
      }
    } catch (error) {
      console.error("Ошибка при обновлении статуса заявки:", error);
    }
  };

  const setVIP = async (id) => {
    try {
      const res = await setVIPStatus(id, 1);
      if (res.status === 200) {
        setApplications((prev) => ({
          ...prev,
          cards: prev.cards.map((card) =>
            card.id === id ? { ...card, vip: 1 } : card
          ),
        }));
      }
    } catch (error) {
      console.error("Ошибка при обновлении статуса VIP:", error);
    }
  };

  const deleteVIP = async (id) => {
    try {
      const res = await setVIPStatus(id, 0);
      if (res.status === 200) {
        setApplications((prev) => ({
          ...prev,
          cards: prev.cards.map((card) =>
            card.id === id ? { ...card, vip: 0 } : card
          ),
        }));
      }
    } catch (error) {
      console.error("Ошибка при обновлении статуса VIP:", error);
    }
  };

  const assignQRCode = async (id) => {
    try {
      const res = await assignQRCodeFn(id);

      if (res.data.result === true) {
        setApplications((prev) => ({
          ...prev,
          cards: prev.cards.map((card) =>
            card.id === id ? { ...card, qr_code: res.data.data.src } : card
          ),
        }));
      } else {
        console.warn("Не удалось получить QR-код из ответа");
      }
    } catch (error) {
      console.error("Ошибка при присвоении QR-кода:", error);
    }
  };

  useEffect(() => {
    if (location.pathname === "/applications" && queryType !== selectedType) {
      setSearchParams({ type: selectedType });
      setSearchQuery("");
    }
  }, [selectedType, queryType, setSearchParams, location.pathname]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user && location.pathname === "/applications") {
      navigate("/signin");
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    if (location.pathname === "/applications") {
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
        approveHandler,
        rejectHandler,
        assignQRCode,
        setVIP,
        deleteVIP,
        setFilter,
        setApplications,
      }}
    >
      {children}
    </ApplicationsContext.Provider>
  );
};

export const useApplications = () => useContext(ApplicationsContext);
