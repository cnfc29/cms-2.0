import styles from "./SearchInput.module.css";
import { useApplications } from "../../HOCs/ApplicationsContext";
import { AllowedTypesMap } from "../../HOCs/constant";

const placeholderHelper = (type) => {
  let placeholder;
  switch (true) {
    case type === AllowedTypesMap.all:
      placeholder = "Поиск по всем анкетам";
      break;
    case type === AllowedTypesMap.without:
      placeholder = "Поиск по заявкам";
      break;
    case type === AllowedTypesMap.approved:
      placeholder = "Поиск по одобренным";
      break;
    case type === AllowedTypesMap.rejected:
      placeholder = "Поиск по отклоненным";
      break;

    default:
      break;
  }

  return placeholder;
};

export default function SearchInput({ value, onChange, onClear }) {
  const { selectedType } = useApplications();
  const placeholder = placeholderHelper(selectedType);
  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <div className={styles.iconSearch}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.63445 6.63422C7.80899 5.45981 9.402 4.80005 11.063 4.80005C12.724 4.80005 14.317 5.45981 15.4916 6.63422C16.6661 7.80863 17.326 9.40149 17.326 11.0624C17.326 12.5025 16.8299 13.8915 15.9323 15.0009L19.2 18.2683L18.2684 19.2L15.0004 15.9324C13.8912 16.8291 12.5026 17.3247 11.063 17.3247C9.402 17.3247 7.80899 16.665 6.63445 15.4906C5.45991 14.3162 4.80005 12.7233 4.80005 11.0624C4.80005 9.40149 5.45991 7.80863 6.63445 6.63422ZM11.063 6.1176C9.75139 6.1176 8.49349 6.63859 7.56606 7.56592C6.63862 8.49326 6.1176 9.75098 6.1176 11.0624C6.1176 12.3738 6.63862 13.6315 7.56606 14.5589C8.49349 15.4862 9.75139 16.0072 11.063 16.0072C12.3746 16.0072 13.6325 15.4862 14.56 14.5589C15.4874 13.6315 16.0084 12.3738 16.0084 11.0624C16.0084 9.75098 15.4874 8.49326 14.56 7.56592C13.6325 6.63859 12.3746 6.1176 11.063 6.1176Z"
            />
          </svg>
        </div>
        <input
          className={styles.input}
          name="search"
          type="text"
          autoComplete="off"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {value && (
          <button
            type="button"
            className={styles.iconClear}
            onClick={onClear}
            aria-label="Очистить поиск"
          >
            &times;
          </button>
        )}
      </div>
    </div>
  );
}
