import React, { useState } from "react";
import styles from "./MainPage.module.css";
import Input from "../../ui/Input/Input";
import DragAndDrop from "../../ui/DragAndDrop/DragAndDrop";
import RegistrationButton from "../../ui/RegistrationButton/RegistrationButton";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();

  return (
    <div className={styles.parent}>
      <div className={styles.container}>
        <div className={styles.text}>Регистрация</div>
        <form>
          <div className={styles.inputsList}>
            <Input placeholder="Фамилия" />
            <Input placeholder="Имя" />
            <Input placeholder="Отчество" />
            <Input placeholder="Организация" />
            <Input placeholder="Должность" />
            <Input placeholder="Телефон" />
            <Input placeholder="Почта" />
            <DragAndDrop
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
            />
            <RegistrationButton onClick={() => navigate("/success")} />
          </div>
        </form>
      </div>
    </div>
  );
}
