import { useState, useEffect } from "react";
import { fetchSelectData } from "../API/api";

export const useFetchData = () => {
  const [selectData, setSelectData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchSelectData();
        setSelectData(result);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.error(
          "Ошибка при получении данных, попробуйте позже ...",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return { selectData, loading, error };
};
