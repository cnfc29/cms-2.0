import styles from "./UpdateCard.module.css";
import Title from "../Title/Title";
import EditForm from "../EditForm/EditForm";
import { useEditApplication } from "../../HOCs/EditApplicationProvider";
export default function UpdateCard() {
  const { loading, error, submit } = useEditApplication();

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loading}>Загрузка ...</div>
      ) : error ? (
        <div className={styles.loading}>
          Произошла ошибка. Повторите позднее ...
        </div>
      ) : submit ? (
        <div className={styles.loading}>Отправляем данные ...</div>
      ) : (
        <>
          <Title />
          <EditForm />
        </>
      )}
    </div>
  );
}
