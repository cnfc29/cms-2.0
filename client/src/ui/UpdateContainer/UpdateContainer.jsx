import UpdateCard from "../UpdateCard/UpdateCard";
import styles from "./UpdateContainer.module.css";
export default function UpdateContainer() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Редактирование</div>
      <UpdateCard />
    </div>
  );
}
