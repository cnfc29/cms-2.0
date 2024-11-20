import { useApplications } from "../../HOCs/ApplicationsContext";
import ApprovedFilter from "../ApprovedFilter/ApprovedFilter";
import CardsTitle from "../CardsTitle/CardsTitle";
import Card from "../Card/Card";
import styles from "./ApplicationsContainer.module.css";
import { AllowedTypesMap } from "../../HOCs/constant";

export default function ApplicationsContainer({ localSearchQuery }) {
  const { selectedType, applications, loading } = useApplications();

  const isApproved = selectedType === AllowedTypesMap.approved;

  return (
    <div className={styles.applicationsContainer}>
      <CardsTitle
        type={selectedType}
        search={!!localSearchQuery}
        total={applications?.cards?.length}
      />
      {isApproved && <ApprovedFilter />}
      <div className={styles.applicationsList}>
        {loading || applications.cards === null ? (
          <div className={styles.emptyList}>Загрузка...</div>
        ) : (
          <>
            {applications?.cards?.length === 0 && localSearchQuery ? (
              <div className={styles.emptyList}>
                По вашему запросу ничего не найдено
              </div>
            ) : applications?.cards?.length === 0 && !localSearchQuery ? (
              <div className={styles.emptyList}>Список анкет пока пуст</div>
            ) : (
              applications?.cards?.map((card) => (
                <Card key={card.id} card={card} />
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
}
