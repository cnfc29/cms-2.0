import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./SignInPage.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  login: yup.string().required("Логин обязателен"),
  password: yup.string().required("Пароль обязателен"),
});

export default function SignInPage() {
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/applications");
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const signIn = async (data) => {
    try {
      const res = await axios.post(`${baseURL}/user/login`, data);
      if (res.data.result === true) {
        localStorage.setItem("user", true);
        navigate("/applications");
      } else if (res.data.result === false) {
        setError("Неправильный логин или пароль");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.parent}>
      <div className={styles.container}>
        <div className={styles.text}>Авторизация</div>
        <form onSubmit={handleSubmit(signIn)} className={styles.form}>
          <div className={styles.inputsList}>
            <input
              className={`${styles.input} ${
                errors.login ? styles.inputError : ""
              }`}
              type="text"
              placeholder="Логин"
              {...register("login")}
            />
            {errors.login && (
              <p className={styles.error}>{errors.login.message}</p>
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
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.btn}>
              Войти
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
