import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./SignInPage.module.css";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../API/api";

const schema = yup.object().shape({
  login: yup.string().required("Логин обязателен"),
  password: yup.string().required("Пароль обязателен"),
});

export default function SignInPage({ setUser }) {
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const signInHandler = async (data) => {
    try {
      const res = await signIn(data);
      if (res.data.result === true) {
        localStorage.setItem("user", true);
        setUser(true);
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
        <form onSubmit={handleSubmit(signInHandler)} className={styles.form}>
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
