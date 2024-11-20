import { useRef, useState, useEffect } from "react";
import AssignQRCode from "../AssignQRCode/AssignQRCode";
import VIP from "../VIP/VIP";
import ButtonMenu from "../ButtonMenu/ButtonMenu";
import ImageIcon from "../ImageIcon/ImageIcon";
import QRCode from "../QRCode/QRCode";
import ApplicationButton from "../ApplicationButton/ApplicationButton";
import UserInfo from "../UserInfo/UserInfo";
import Status from "../Status/Status";
import styles from "./Card.module.css";
import { useApplications } from "../../HOCs/ApplicationsContext";
import { AllowedTypesMap } from "../../HOCs/constant";

export default function Card({ card }) {
  const {
    selectedType,
    approveHandler,
    rejectHandler,
    setVIP,
    deleteVIP,
    assignQRCode,
    setApplications,
  } = useApplications();

  const isApproved = selectedType === AllowedTypesMap.approved;
  const isRejected = selectedType === AllowedTypesMap.rejected;
  const isWithout = selectedType === AllowedTypesMap.without;
  const isAll = selectedType === AllowedTypesMap.all;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeDropdown);
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);

  const updateApprovedState = (id) => {
    setApplications((prev) => ({
      ...prev,
      cards: prev.cards.filter((card) => card.id !== id),
      without: prev.without - 1,
      approved: prev.approved + 1,
    }));
  };

  const updateApprovedStateMenu = (id) => {
    setApplications((prev) => ({
      ...prev,
      cards: prev.cards.filter((card) => card.id !== id),
      rejected: prev.rejected - 1,
      approved: prev.approved + 1,
    }));
  };

  const updateRejectedState = (id) => {
    setApplications((prev) => ({
      ...prev,
      cards: prev.cards.filter((card) => card.id !== id),
      without: prev.without - 1,
      rejected: prev.rejected + 1,
    }));
  };

  const updateRejectedStateMenu = (id) => {
    setApplications((prev) => ({
      ...prev,
      cards: prev.cards.filter((card) => card.id !== id),
      approved: prev.approved - 1,
      rejected: prev.rejected + 1,
    }));
  };

  const changeStatus = () => {
    if (card.status === "approved") {
      rejectHandler(card.id, updateRejectedStateMenu);
    } else if (card.status === "rejected") {
      approveHandler(card.id, updateApprovedStateMenu);
    }
    setIsDropdownOpen(false);
  };

  const changeVIP = () => {
    if (card.vip === 0) {
      setVIP(card.id);
    } else {
      deleteVIP(card.id);
    }
    setIsDropdownOpen(false);
  };

  return (
    <div className={styles.cardWrapper + " " + styles[selectedType]}>
      <div className={styles.cardContainer + " " + styles[selectedType]}>
        <div className={styles.cardContent}>
          <div className={styles.information}>
            {!isWithout &&
              (isRejected ||
                (isApproved && card.qr_code === 0) ||
                !isApproved) && (
                <button
                  className={styles.informationButton}
                  onClick={toggleDropdown}
                >
                  Информация
                </button>
              )}

            {isDropdownOpen && !isAll && (
              <div className={styles.popoverContent} ref={dropdownRef}>
                {(isApproved || isRejected) && (
                  <ButtonMenu onClick={changeStatus}>
                    {card.status === "approved"
                      ? "В отклоненные"
                      : "В одобренные"}
                  </ButtonMenu>
                )}

                {isApproved && (
                  <ButtonMenu onClick={changeVIP}>
                    {card.vip === 0 ? "Присвоить VIP" : "Убрать VIP"}
                  </ButtonMenu>
                )}
              </div>
            )}

            {isApproved && card.vip === 1 && <VIP />}
          </div>

          <div className={styles.iconsContainer}>
            <ImageIcon image={`https://test.draftnew.site${card.photo}`} />
            {isApproved && card.qr_code !== 0 && (
              <QRCode image={`https://test.draftnew.site${card.qr_code}`} />
            )}
          </div>
          <div className={styles.infoContainer}>
            <UserInfo card={card} />

            <div className={styles.buttons}>
              {isWithout && card.status === "without" && (
                <>
                  <ApplicationButton
                    type="approve"
                    onClick={() => approveHandler(card.id, updateApprovedState)}
                  >
                    Одобрить
                  </ApplicationButton>
                  <ApplicationButton
                    onClick={() => rejectHandler(card.id, updateRejectedState)}
                  >
                    Отклонить
                  </ApplicationButton>
                </>
              )}

              {(isApproved || isRejected) && <Status status={card.status} />}

              {isApproved && card.qr_code === 0 && (
                <AssignQRCode onClick={() => assignQRCode(card.id)} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
