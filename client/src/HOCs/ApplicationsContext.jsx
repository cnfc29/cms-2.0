import React, { createContext, useContext, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import debounce from "lodash.debounce";

const ApplicationsContext = createContext();

const allowedTypes = ["all", "without", "approved", "rejected"];

export const AllowedTypesMap = {
  all: "all",
  without: "without",
  approved: "approved",
  rejected: "rejected",
};

export const ApplicationProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryType = searchParams.get("type");
  const initialType = allowedTypes.includes(queryType)
    ? queryType
    : AllowedTypesMap.all;

  const [selectedType, setSelectedType] = useState(initialType);
  const [applications, setApplications] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [forceUpdate, setForceUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({});

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const debouncedSearch = debounce((query) => {
    setSearchQuery(query);
  }, 500);

  const resetSearchQuery = () => {
    setSearchQuery("");
    setApplications((prev) => ({ ...prev, cards: null }));
  };

  const approveHandler = async (id) => {
    try {
      const res = await axios.post(`${baseURL}/approved`, {
        id: +id,
        status: 1,
      });

      if (res.status === 200) {
        setApplications((prev) => ({
          ...prev,
          cards: prev.cards.filter((card) => card.id !== id),
          without: prev.without - 1,
          approved: prev.approved + 1,
        }));
      }
    } catch (error) {
      console.error("Ошибка при обновлении статуса заявки:", error);
    }
  };

  const approveHandlerMenu = async (id) => {
    try {
      const res = await axios.post(`${baseURL}/approved`, {
        id: +id,
        status: 1,
      });

      if (res.status === 200) {
        setApplications((prev) => ({
          ...prev,
          cards: prev.cards.filter((card) => card.id !== id),
          rejected: prev.rejected - 1,
          approved: prev.approved + 1,
        }));
      }
    } catch (error) {
      console.error("Ошибка при обновлении статуса заявки:", error);
    }
  };

  const rejectHandler = async (id) => {
    try {
      const res = await axios.post(`${baseURL}/approved`, {
        id: +id,
        status: 0,
      });

      if (res.status === 200) {
        setApplications((prev) => ({
          ...prev,
          cards: prev.cards.filter((card) => card.id !== id),
          without: prev.without - 1,
          rejected: prev.rejected + 1,
        }));
      }
    } catch (error) {
      console.error("Ошибка при отклонении заявки:", error);
    }
  };

  const rejectHandlerMenu = async (id) => {
    try {
      const res = await axios.post(`${baseURL}/approved`, {
        id: +id,
        status: 0,
      });

      if (res.status === 200) {
        setApplications((prev) => ({
          ...prev,
          cards: prev.cards.filter((card) => card.id !== id),
          approved: prev.approved - 1,
          rejected: prev.rejected + 1,
        }));
      }
    } catch (error) {
      console.error("Ошибка при отклонении заявки:", error);
    }
  };

  const setVIP = async (id) => {
    try {
      const res = await axios.post(`${baseURL}/vip`, {
        id: +id,
        status: 1,
      });
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
      const res = await axios.post(`${baseURL}/vip`, {
        id: +id,
        status: 0,
      });
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
      const res = await axios.post(`${baseURL}/qr`, { id: +id, status: 1 });

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
    if (queryType !== selectedType) {
      setSearchParams({ type: selectedType });
      setSearchQuery("");
    }
  }, [selectedType, queryType, setSearchParams]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseURL}/list`, {
        params: {
          type: selectedType === AllowedTypesMap.all ? "" : selectedType,
          search: searchQuery,
          page: 1,
          limit: 1000,
          filter: filter,
        },
      })
      .then((res) => setApplications(res.data))
      .catch((error) => console.error("Ошибка при получении данных:", error))
      .finally(() => setLoading(false));
  }, [selectedType, searchQuery, forceUpdate, filter]);

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
        approveHandlerMenu,
        rejectHandler,
        rejectHandlerMenu,
        assignQRCode,
        setVIP,
        deleteVIP,
        setFilter,
      }}
    >
      {children}
    </ApplicationsContext.Provider>
  );
};

export const useApplications = () => useContext(ApplicationsContext);
