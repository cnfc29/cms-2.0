import styles from "./UserInfo.module.css";

export default function UserInfo({ card }) {
  return (
    <div className={styles.userInfo}>
      <div className={styles.userName}>
        {card.last_name}
        <br />
        {card.first_name + " " + card.middle_name}
      </div>
      <div className={styles.userDescription}>
        <div className={styles.userCompany}>
          <div>{card.organization}</div>
          <div>{card.post}</div>
        </div>
        <div className={styles.userContacts}>
          <div>{card.phone}</div>
          <div>{card.email}</div>
        </div>
        <div className={styles.userData}>
          <div>Формат участия: {card.participation_format}</div>
          <div className={styles.itemUserData}>
            <div>Сфера деятельности:</div>
            {card.field_of_activity}
          </div>
          <div className={styles.itemUserData}>
            <div>Экспертность:</div>
            {card.your_expertise}
          </div>
          <div>Участие в ИЦК: {card.participation_in_the_cic}</div>
        </div>
      </div>
    </div>
  );
}
