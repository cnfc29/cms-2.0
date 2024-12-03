import Status from "../Status/Status";
import VIP from "../VIP/VIP";
import styles from "./Title.module.css";
export default function Title({ card, vip }) {
  return (
    <div className={styles.title}>
      <div className={styles.fio}>
        {card.last_name} {card.first_name} {card.middle_name}
      </div>
      <div className={styles.statusContainer}>
        <Status status={card.status} />
        {vip === 1 && <VIP />}
      </div>
    </div>
  );
}
