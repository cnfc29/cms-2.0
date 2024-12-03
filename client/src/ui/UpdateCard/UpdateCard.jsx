import { useParams } from "react-router-dom";
import styles from "./UpdateCard.module.css";
import { useApplication } from "./hook";
import Title from "../Title/Title";
import EditForm from "../EditForm/EditForm";
export default function UpdateCard() {
  const { id } = useParams();

  const {
    card,
    loading,
    selectData,
    error,
    vip,
    changeVIP,
    selectedFile,
    deleteImage,
    setSelectedFile,
  } = useApplication(id);
  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loading}>Загрузка ...</div>
      ) : error ? (
        <div className={styles.loading}>
          Произошла ошибка. Повторите позднее ...
        </div>
      ) : (
        <>
          <Title card={card} vip={vip} />
          <EditForm
            card={card}
            selectData={selectData}
            changeVIP={changeVIP}
            vip={vip}
            selectedFile={selectedFile}
            deleteImage={deleteImage}
            setSelectedFile={setSelectedFile}
          />
        </>
      )}
    </div>
  );
}
