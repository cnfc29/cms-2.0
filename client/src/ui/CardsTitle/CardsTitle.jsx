import styles from "./CardsTitle.module.css";
import { AllowedTypesMap } from "../../HOCs/constant";

const cardTitleHelper = (type, search) => {
  let cardTitle;
  switch (true) {
    case search:
      cardTitle = "Результаты поиска";
      break;
    case type === AllowedTypesMap.all:
      cardTitle = "Все анкеты";
      break;
    case type === AllowedTypesMap.without:
      cardTitle = "Заявки";
      break;
    case type === AllowedTypesMap.approved:
      cardTitle = "Одобренные анкеты";
      break;
    case type === AllowedTypesMap.rejected:
      cardTitle = "Отклоненные анкеты";
      break;

    default:
      break;
  }

  return cardTitle;
};

export default function CardsTitle({ type, total, search }) {
  const cardTitle = cardTitleHelper(type, search);
  return (
    <div className={styles.container}>
      <div className={styles.title}>{cardTitle}</div>
      <div className={`${styles.total} ${styles[type]}`}>
        {total ? total : 0}
      </div>
    </div>
  );
}
