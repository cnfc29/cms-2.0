import { useState, useEffect } from "react";
import { getOneApplication, fetchSelectData } from "../../API/api";

export const useApplication = (id) => {
  const [card, setCard] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectData, setSelectData] = useState({});
  const [vip, setVIP] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("ID заявки отсутствует");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const application = await getOneApplication(id);
        setCard(application);
      } catch (err) {
        setError(err.message || "Ошибка при загрузке данных");
      }
    };

    const getData = async () => {
      try {
        const data = await fetchSelectData();
        setSelectData(data);
      } catch (error) {
        setError(error.message || "Ошибка при получении данных для селектов");
      }
    };

    const loadData = async () => {
      await Promise.all([fetchData(), getData()]);
      setLoading(false);
    };

    loadData();
  }, [id]);

  useEffect(() => {
    if (card && card.vip !== undefined) {
      setVIP(card.vip);
    }
  }, [card]);

  useEffect(() => {
    setSelectedFile(card.photo);
  }, [card]);

  const changeVIP = () => {
    setVIP((prev) => (prev === 0 ? 1 : 0));
  };

  const deleteImage = () => {
    setSelectedFile(null);
  };

  return {
    card,
    loading,
    error,
    selectData,
    vip,
    changeVIP,
    selectedFile,
    deleteImage,
    setSelectedFile
  };
};
