import { useParams } from "react-router-dom";
import { EditApplicationProvider } from "../../HOCs/EditApplicationProvider";
import UpdateCard from "../UpdateCard/UpdateCard";
import styles from "./UpdateContainer.module.css";
export default function UpdateContainer() {
  const { id } = useParams();

  return (
    <div className={styles.container}>
      <div className={styles.title}>Редактирование</div>
      <EditApplicationProvider id={id}>
        <UpdateCard />
      </EditApplicationProvider>
    </div>
  );
}
