import React, { useEffect, useRef, useState } from "react";
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
import Status from "../../ui/Status/Status";
import AssignQRCode from "../../ui/AssignQRCode/AssignQRCode";
import VIP from "../../ui/VIP/VIP";
import RejectButtonMenu from "../../ui/RejectButtonMenu/RejectButtonMenu";
import SetVIPButton from "../../ui/SetVIPButton/SetVIPButton";
import DeleteVIPButton from "../../ui/DeleteVIPButton/DeleteVIPButton";
import ApproveButtonMenu from "../../ui/ApproveButtonMenu/ApproveButtonMenu";
import ApprovedFilter from "../../ui/ApprovedFilter/ApprovedFilter";
import { useNavigate } from "react-router-dom";

export default function ApplicationsPage() {
  const [activeDropdownId, setActiveDropdownId] = useState(null);
  const dropdownRefs = useRef({});

  const navigate = useNavigate();

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
        {selectedType === AllowedTypesMap.approved && <ApprovedFilter />}
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
                            {selectedType !== AllowedTypesMap.without &&
                              (selectedType === AllowedTypesMap.rejected ||
                                (selectedType === AllowedTypesMap.approved &&
                                  card.qr_code === 0) ||
                                selectedType !== AllowedTypesMap.approved) && (
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
                                  {selectedType === AllowedTypesMap.approved &&
                                    card.status === "approved" && (
                                      <RejectButtonMenu
                                        onClick={() => {
                                          rejectHandlerMenu(card.id);
                                          setActiveDropdownId(null);
                                        }}
                                      />
                                    )}

                                  {selectedType === AllowedTypesMap.rejected &&
                                    card.status === "rejected" && (
                                      <ApproveButtonMenu
                                        onClick={() => {
                                          approveHandlerMenu(card.id);
                                          setActiveDropdownId(null);
                                        }}
                                      />
                                    )}

                                  {selectedType ===
                                    AllowedTypesMap.approved && (
                                    <>
                                      {card.vip === 0 ? (
                                        <SetVIPButton
                                          onClick={() => {
                                            setVIP(card.id);
                                            setActiveDropdownId(null);
                                          }}
                                        />
                                      ) : (
                                        <DeleteVIPButton
                                          onClick={() => {
                                            deleteVIP(card.id);
                                            setActiveDropdownId(null);
                                          }}
                                        />
                                      )}
                                    </>
                                  )}
                                </div>
                              )}

                            {card.vip === 1 &&
                              selectedType === AllowedTypesMap.approved && (
                                <VIP />
                              )}
                          </div>
                        }
                        <div className={styles.iconsContainer}>
                          <ImageIcon
                            image={`https://test.draftnew.site${card.photo}`}
                          />
                          {selectedType === AllowedTypesMap.approved &&
                            card.qr_code !== 0 && (
                              <QRCode
                                image={`https://test.draftnew.site${card.qr_code}`}
                              />
                            )}
                        </div>
                        <div className={styles.infoContainer}>
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
                                <div>
                                  Формат участия: {card.participation_format}
                                </div>
                                <div className={styles.itemUserData}>
                                  <div>Сфера деятельности:</div>
                                  {card.field_of_activity}
                                </div>
                                <div>
                                  Участие в ИЦК: {card.participation_in_the_cic}
                                </div>
                                <div className={styles.itemUserData}>
                                  <div>Экспертность:</div>
                                  {card.your_expertise}
                                </div>
                              </div>
                            </div>
                          </div>

                          {selectedType === AllowedTypesMap.without &&
                            card.status === "without" && (
                              <div className={styles.buttons}>
                                <ApproveButton
                                  onClick={() => approveHandler(card.id)}
                                />
                                <RejectButton
                                  onClick={() => rejectHandler(card.id)}
                                />
                              </div>
                            )}

                          {(selectedType === AllowedTypesMap.approved ||
                            selectedType === AllowedTypesMap.rejected) && (
                            <div className={styles.buttons}>
                              <Status status={card.status} />
                              {selectedType !== AllowedTypesMap.rejected &&
                                card.qr_code === 0 && (
                                  <AssignQRCode
                                    onClick={() => assignQRCode(card.id)}
                                  />
                                )}
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
