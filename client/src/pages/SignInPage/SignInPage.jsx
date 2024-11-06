import React from "react";
import styles from "./SignInPage.module.css";

export default function SignInPage() {
  return (
    <div className={styles.parent}>
      <div className={styles.container}>
        <div className={styles.text}>Авторизация</div>
        <form className={styles.form}>
          <div className={styles.inputsList}>
            <input className={styles.input} type="text" placeholder="Логин" />
            <input
              className={styles.input}
              type="password"
              placeholder="Пароль"
            />
            <button className={styles.btn}>Войти</button>
          </div>
        </form>
      </div>
    </div>
  );
}
