import styles from "./NavBar.module.css";
import ItemLink from "../../ui/ItemLink/ItemLink";
import { useApplications } from "../../HOCs/ApplicationsContext";
import { AllowedTypesMap } from "../../HOCs/constant";
import settingsIcon from "@images/components/NavBar/images/settingsIcon.svg";

export default function NavBar() {
  const { selectedType, setSelectedType, applications } = useApplications();

  return (
    <div className={styles.container}>
      <div className={styles.settings}>
        <span>Настройки</span>
        <img src={settingsIcon} alt="" />
      </div>
      <div className={styles.linksList}>
        <ItemLink
          text="Все анкеты"
          total={applications.all}
          isActive={selectedType === AllowedTypesMap.all}
          onClick={() => setSelectedType(AllowedTypesMap.all)}
        />
        <ItemLink
          text="Заявки"
          total={applications.without}
          isActive={selectedType === AllowedTypesMap.without}
          onClick={() => setSelectedType(AllowedTypesMap.without)}
        />
        <ItemLink
          text="Одобренные"
          total={applications.approved}
          isActive={selectedType === AllowedTypesMap.approved}
          onClick={() => setSelectedType(AllowedTypesMap.approved)}
        />
        <ItemLink
          text="Отклоненные"
          total={applications.rejected}
          isActive={selectedType === AllowedTypesMap.rejected}
          onClick={() => setSelectedType(AllowedTypesMap.rejected)}
        />
      </div>
    </div>
  );
}
