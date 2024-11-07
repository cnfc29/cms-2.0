import React, { useEffect, useState } from "react";
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
import ApproveButton from "../../ui/ApproveButton/ApproveButton";
import RejectButton from "../../ui/RejectButton/RejectButton";

export default function ApplicationsPage() {
  const { applications, setSearchQuery, selectedType, loading } =
    useApplications();
  const [localSearchQuery, setLocalSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setLocalSearchQuery(e.target.value);
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setLocalSearchQuery("");
    setSearchQuery("");
  };

  useEffect(() => {
    setLocalSearchQuery("");
  }, [selectedType]);

  return (
    <ContentContainer>
      <NavBar />
      <SearchInput
        selectedType={selectedType}
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
        <div className={styles.applicationsList}>
          {loading ? (
            <div>Загрузка...</div>
          ) : (
            <>
              {applications?.cards?.length === 0 && localSearchQuery ? (
                <div>По вашему запросу ничего не найдено</div>
              ) : applications?.cards?.length === 0 && !localSearchQuery ? (
                <div>Список анкет пока пуст</div>
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
                        <div className={styles.iconsContainer}>
                          <ImageIcon image={card.image} />
                          {card.qr && selectedType !== "all" && (
                            <QRCode image={card.qr} />
                          )}
                        </div>
                        <div className={styles.infoContainer}>
                          <div className={styles.userInfo}>
                            <div className={styles.userName}>
                              {card.surname}
                              <br />
                              {card.name + " " + card.patronymic}
                            </div>
                            <div className={styles.userDescription}>
                              <div className={styles.userCompany}>
                                <div>{card.company}</div>
                                <div>{card.position}</div>
                              </div>
                              <div className={styles.userContacts}>
                                <div>{card.phone}</div>
                                <div>{card.email}</div>
                              </div>
                              <div className={styles.userData}>
                                <div>
                                  Формат участия: {card.participationFormat}
                                </div>
                                <div className={styles.itemUserData}>
                                  <div>Сфера деятельности:</div>
                                  {card.fieldActivity}
                                </div>
                                <div>
                                  Участие в ИЦК: {card.participationICK}
                                </div>
                                <div className={styles.itemUserData}>
                                  <div>Экспертность:</div>
                                  {card.expertise}
                                </div>
                              </div>
                            </div>
                          </div>

                          {selectedType === AllowedTypesMap.without && (
                            <div className={styles.buttons}>
                              <ApproveButton />
                              <RejectButton />
                            </div>
                          )}

                          {(selectedType === AllowedTypesMap.approved ||
                            selectedType === AllowedTypesMap.rejected) && (
                            <div className={styles.buttons}>
                              {card.status === true
                                ? "Одобрен"
                                : card.status === false
                                ? "Отклонен"
                                : ""}
                            </div>
                          )}
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
