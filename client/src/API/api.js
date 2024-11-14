import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchSelectData = async () => {
  const endpoints = [
    {
      key: "participationFormat",
      url: "/application/getListParticipationFormat",
    },
    { key: "fieldOfActivity", url: "/application/getListFieldOfActivity" },
    { key: "listYourExpertise", url: "/application/getListYourExpertise" },
    {
      key: "listParticipationInTheCIC",
      url: "/application/getListParticipationInTheCIC",
    },
    {
      key: "listParticipantStatus",
      url: "/application/getListParticipantStatus",
    },
  ];

  const responses = await Promise.all(
    endpoints.map((endpoint) => api.get(endpoint.url))
  );

  return responses.reduce((acc, res, index) => {
    acc[endpoints[index].key] = res.data;
    return acc;
  }, {});
};

export const submitForm = async (formData) => {
  const response = await api.post("/application/add", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response;
};

export default api;
