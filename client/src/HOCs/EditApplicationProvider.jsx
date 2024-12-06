import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchSelectData,
  getOneApplication,
  submitUpdateApplication,
} from "../API/api";
import { ROUTER } from "../router.config";

const EditApplicationContext = createContext();

export const EditApplicationProvider = ({ children, id }) => {
  const [card, setCard] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectData, setSelectData] = useState({});
  const [vip, setVIP] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [submit, setSubmit] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async (data) => {
    setSubmit(true);
    setError("");
    const formData = new FormData();
    formData.append("id", card.id);
    formData.append("vip", vip);
    for (let key in data) {
      const fieldValue = data[key];
      formData.append(key, fieldValue?.value || fieldValue);
    }

    try {
      const res = await submitUpdateApplication(formData);
      if (res.data.result === true) {
        navigate(ROUTER.applications);
      }
    } catch (error) {
      setError("Ошибка при отправке данных. Повторите попытку позже.");
      setSelectedFile(null);
    } finally {
      setSubmit(false);
    }
  };

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

  const changeVIP = (e) => {
    e.preventDefault();
    setVIP((prev) => (prev === 0 ? 1 : 0));
  };

  const deleteImage = (e) => {
    e.preventDefault();
    setSelectedFile(null);
  };

  return (
    <EditApplicationContext.Provider
      value={{
        card,
        loading,
        error,
        selectData,
        vip,
        changeVIP,
        selectedFile,
        deleteImage,
        setSelectedFile,
        submitHandler,
        submit,
      }}
    >
      {children}
    </EditApplicationContext.Provider>
  );
};

export const useEditApplication = () => useContext(EditApplicationContext);
