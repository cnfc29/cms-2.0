import { approve, assignQRCodeFn, reject } from "../API/api";

export const approveHandler = async (id, updateStateCallback) => {
  try {
    const res = await approve(id);

    if (res.status === 200) {
      updateStateCallback(id);
    }
  } catch (error) {
    console.error("Ошибка при обновлении статуса заявки:", error);
  }
};

export const rejectHandler = async (id, updateStateCallback) => {
  try {
    const res = await reject(id);

    if (res.status === 200) {
      updateStateCallback(id);
    }
  } catch (error) {
    console.error("Ошибка при обновлении статуса заявки:", error);
  }
};

export const assignQRCodeHandler = async (id, updateStateCallback) => {
  try {
    const res = await assignQRCodeFn(id);

    if (res.data.result === true) {
      updateStateCallback(id, res.data.data.src);
    } else {
      console.warn("Не удалось получить QR-код из ответа");
    }
  } catch (error) {
    console.error("Ошибка при присвоении QR-кода:", error);
  }
};
