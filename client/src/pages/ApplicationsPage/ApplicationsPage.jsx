import { useEffect, useRef, useState } from "react";
import styles from "./ApplicationsPage.module.css";
import NavBar from "../../components/NavBar/NavBar";
import ContentContainer from "../../ui/ContentContainer/ContentContainer";
import {
  AllowedTypesMap,
  useApplications,
} from "../../HOCs/ApplicationsContext";
import SearchInput from "../../ui/SearchInput/SearchInput";
import CardsTitle from "../../ui/CardsTitle/CardsTitle";
import ImageIcon from "../../ui/ImageIcon/ImageIcon";
import QRCode from "../../ui/QRCode/QRCode";
import Status from "../../ui/Status/Status";
import AssignQRCode from "../../ui/AssignQRCode/AssignQRCode";
import VIP from "../../ui/VIP/VIP";
import ApprovedFilter from "../../ui/ApprovedFilter/ApprovedFilter";
import ApplicationButton from "../../ui/ApplicationButton/ApplicationButton";
import UserInfo from "../../ui/UserInfo/UserInfo";
import ButtonMenu from "../../ui/ButtonMenu/ButtonMenu";

export default function ApplicationsPage() {
  const [activeDropdownId, setActiveDropdownId] = useState(null);
  const dropdownRefs = useRef({});

  const {
    applications,
    setSearchQuery,
    selectedType,
    loading,
    approveHandler,
    approveHandlerMenu,
    rejectHandler,
    assignQRCode,
    rejectHandlerMenu,
    setVIP,
    deleteVIP,
  } = useApplications();

  const [localSearchQuery, setLocalSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setLocalSearchQuery(e.target.value);
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setLocalSearchQuery("");
    setSearchQuery("");
  };

  const toggleDropdown = (id) => {
    setActiveDropdownId((prevId) => (prevId === id ? null : id));
  };

  const isApproved = selectedType === AllowedTypesMap.approved;
  const isRejected = selectedType === AllowedTypesMap.rejected;
  const isWithout = selectedType === AllowedTypesMap.without;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        activeDropdownId &&
        dropdownRefs.current[activeDropdownId] &&
        !dropdownRefs.current[activeDropdownId].contains(event.target)
      ) {
        setActiveDropdownId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDropdownId]);

  useEffect(() => {
    setLocalSearchQuery("");
  }, [selectedType]);

  return (
    <ContentContainer>
      <NavBar />
      <SearchInput
        value={localSearchQuery}
        onChange={handleSearchChange}
        onClear={handleClearSearch}
      />
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
                  <div
                    className={styles.cardWrapper + " " + styles[selectedType]}
                    key={card.id}
                  >
                    <div
                      className={
                        styles.cardContainer + " " + styles[selectedType]
                      }
                    >
                      <div className={styles.cardContent}>
                        {
                          <div className={styles.information}>
                            {!isWithout &&
                              (isRejected ||
                                (isApproved && card.qr_code === 0) ||
                                !isApproved) && (
                                <button
                                  className={styles.informationButton}
                                  onClick={() => toggleDropdown(card.id)}
                                  ref={(el) =>
                                    (dropdownRefs.current[card.id] = el)
                                  }
                                >
                                  Информация
                                </button>
                              )}

                            {activeDropdownId === card.id &&
                              selectedType !== AllowedTypesMap.all && (
                                <div
                                  className={styles.popoverContent}
                                  ref={(el) =>
                                    (dropdownRefs.current[card.id] = el)
                                  }
                                >
                                  {(isApproved || isRejected) && (
                                    <ButtonMenu
                                      onClick={() => {
                                        if (card.status === "approved") {
                                          rejectHandlerMenu(card.id);
                                        } else if (card.status === "rejected") {
                                          approveHandlerMenu(card.id);
                                        }
                                        setActiveDropdownId(null);
                                      }}
                                    >
                                      {card.status === "approved"
                                        ? "В отклоненные"
                                        : card.status === "rejected"
                                        ? "В одобренные"
                                        : ""}
                                    </ButtonMenu>
                                  )}

                                  {isApproved && (
                                    <ButtonMenu
                                      onClick={() => {
                                        if (card.vip === 0) {
                                          setVIP(card.id);
                                        } else {
                                          deleteVIP(card.id);
                                        }
                                        setActiveDropdownId(null);
                                      }}
                                    >
                                      {card.vip === 0
                                        ? "Присвоить VIP"
                                        : "Убрать VIP"}
                                    </ButtonMenu>
                                  )}
                                </div>
                              )}

                            {isApproved && card.vip === 1 && <VIP />}
                          </div>
                        }
                        <div className={styles.iconsContainer}>
                          <ImageIcon
                            image={`https://test.draftnew.site${card.photo}`}
                          />
                          {isApproved && card.qr_code !== 0 && (
                            <QRCode
                              image={`https://test.draftnew.site${card.qr_code}`}
                            />
                          )}
                        </div>
                        <div className={styles.infoContainer}>
                          <UserInfo card={card} />

                          <div className={styles.buttons}>
                            {isWithout && card.status === "without" && (
                              <>
                                <ApplicationButton
                                  type="approve"
                                  onClick={() => approveHandler(card.id)}
                                >
                                  Одобрить
                                </ApplicationButton>
                                <ApplicationButton
                                  onClick={() => rejectHandler(card.id)}
                                >
                                  Отклонить
                                </ApplicationButton>
                              </>
                            )}

                            {(isApproved || isRejected) && (
                              <Status status={card.status} />
                            )}

                            {isApproved && card.qr_code === 0 && (
                              <AssignQRCode
                                onClick={() => assignQRCode(card.id)}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </ContentContainer>
  );
}
