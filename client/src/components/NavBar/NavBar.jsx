import styles from "./NavBar.module.css";
import ItemLink from "../../ui/ItemLink/ItemLink";
import { useApplications } from "../../HOCs/ApplicationsContext";
import { AllowedTypesMap } from "../../HOCs/constant";
import settingsIcon from "@images/components/NavBar/images/settingsIcon.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTER } from "../../router.config";

export default function NavBar() {
  const { selectedType, setSelectedType, applications } = useApplications();

  const location = useLocation();
  const navigate = useNavigate();

  const navigateHandler = (type) => {
    if (location.pathname === ROUTER.applications) {
      setSelectedType(type);
    } else {
      navigate(ROUTER.applications);
      setSelectedType(type);
    }
  };

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
          onClick={() => navigateHandler(AllowedTypesMap.all)}
        />
        <ItemLink
          text="Заявки"
          total={applications.without}
          isActive={selectedType === AllowedTypesMap.without}
          onClick={() => navigateHandler(AllowedTypesMap.without)}
        />
        <ItemLink
          text="Одобренные"
          total={applications.approved}
          isActive={
            selectedType === AllowedTypesMap.approved &&
            location.pathname === ROUTER.applications
          }
          onClick={() => navigateHandler(AllowedTypesMap.approved)}
        />
        <ItemLink
          text="Отклоненные"
          total={applications.rejected}
          isActive={selectedType === AllowedTypesMap.rejected}
          onClick={() => navigateHandler(AllowedTypesMap.rejected)}
        />
      </div>
    </div>
  );
}
