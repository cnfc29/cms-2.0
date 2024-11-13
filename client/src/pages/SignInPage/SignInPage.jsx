import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./SignInPage.module.css";
import axios from "axios";

const schema = yup.object().shape({
  username: yup.string().required("Логин обязателен"),
  password: yup
    .string()
    .min(6, "Пароль должен содержать минимум 6 символов")
    .required("Пароль обязателен"),
});

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const registrationHandler = (data) => {
    // const res = axios.post("http://localhost:3001/signin", data);

    console.log("Данные формы:", data);
  };

  return (
    <div className={styles.parent}>
      <div className={styles.container}>
        <div className={styles.text}>Авторизация</div>
        <form
          onSubmit={handleSubmit(registrationHandler)}
          className={styles.form}
        >
          <div className={styles.inputsList}>
            <input
              className={`${styles.input} ${
                errors.username ? styles.inputError : ""
              }`}
              type="text"
              placeholder="Логин"
              {...register("username")}
            />
            {errors.username && (
              <p className={styles.error}>{errors.username.message}</p>
            )}

            <input
              className={`${styles.input} ${
                errors.password ? styles.inputError : ""
              }`}
              type="password"
              placeholder="Пароль"
              {...register("password")}
            />
            {errors.password && (
              <p className={styles.error}>{errors.password.message}</p>
            )}

            <button type="submit" className={styles.btn}>
              Войти
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
