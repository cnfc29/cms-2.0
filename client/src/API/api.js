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

export const submitFormRegistration = async (formData) => {
  const response = await api.post("/application/add", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response;
};

export const signIn = async (data) => {
  const response = await api.post("/user/login", data);
  return response;
};

export const approve = async (id) => {
  const response = await api.post("/application/approved", {
    id: +id,
    status: 1,
  });
  return response;
};

export const reject = async (id) => {
  const response = await api.post("/application/approved", {
    id: +id,
    status: 0,
  });
  return response;
};

export const setVIPStatus = async (id, status) => {
  const response = await api.post("/application/vip", {
    id: +id,
    status,
  });
  return response;
};

export const assignQRCodeFn = async (id) => {
  const response = await api.post("/application/qr", {
    id: +id,
    status: 1,
  });
  return response;
};

export const fetchApplications = async ({
  type = "",
  search = "",
  page = 1,
  limit = 1000,
  filter = {},
}) => {
  try {
    const response = await api.get("/application/list", {
      params: { type, search, page, limit, filter },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении заявок:", error);
    throw error;
  }
};

export const getOneApplication = async (id) => {
  try {
    const res = await api("/application/item", { params: { id } });
    return res.data;
  } catch (error) {
    console.error("Ошибка при получении заявки:", error.message);
    throw error;
  }
};

export const submitUpdateApplication = async (formData) => {
  const response = await api.post("/application/edit", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response;
};

export default api;
