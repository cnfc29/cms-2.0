import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import styles from "./MainPage.module.css";
import Input from "../../ui/Input/Input";
import DragAndDrop from "../../ui/DragAndDrop/DragAndDrop";
import RegistrationButton from "../../ui/RegistrationButton/RegistrationButton";
import { useNavigate } from "react-router-dom";
import CustomSelect from "../../ui/CustomSelect/CustomSelect";
import axios from "axios";

export default function MainPage() {
  const { register, handleSubmit, control } = useForm();
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const options = [
    { value: "Очно", label: "Очно" },
    { value: "Онлайн", label: "Онлайн" },
  ];

  const submitHandler = async (data) => {
    const formData = new FormData();

    for (let key in data) {
      if (key === "participationFormat") {
        formData.append(key, data[key].value);
      } else {
        formData.append(key, data[key]);
      }
    }

    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      const res = await axios.post("/api/data", formData);

      console.log(formData);

      if (res.status === 201) {
        navigate("/success");
      }
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    }
  };

  return (
    <div className={styles.parent}>
      <div className={styles.container}>
        <div className={styles.text}>Регистрация</div>
        <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
          <div className={styles.inputsList}>
            <Input type="text" placeholder="Фамилия" {...register("surname")} />
            <Input type="text" placeholder="Имя" {...register("name")} />
            <Input
              type="text"
              placeholder="Отчество"
              {...register("patronymic")}
            />
            <Input
              type="text"
              placeholder="Организация"
              {...register("company")}
            />
            <Input
              type="text"
              placeholder="Должность"
              {...register("position")}
            />
            <Input type="tel" placeholder="Телефон" {...register("phone")} />
            <Input type="email" placeholder="Почта" {...register("email")} />
            <DragAndDrop
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
            />
            <Controller
              name="participationFormat"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  options={options}
                  placeholder="Формат участия"
                />
              )}
            />

            <RegistrationButton />
          </div>
        </form>
      </div>
    </div>
  );
}
