import React, { forwardRef } from "react";
import Select from "react-select";
import "./CustomSelect.css";

const CustomSelect = forwardRef(
  ({ options, placeholder, onChange, value }, ref) => {
    const customStyles = {
      control: (provided) => ({
        ...provided,
        border: "none",
        boxShadow: "none",
        backgroundColor: "var(--inputBackgroundColor)",
        borderRadius: "12px",
        paddingLeft: "6px",
      }),
      menu: (provided) => ({
        ...provided,
        borderRadius: "12px",
        backgroundColor: "var(--backgroundOption)",
        boxShadow: "none",
        padding: "0px 4px",
        marginTop: "4px",
      }),
      option: (provided, state) => ({
        ...provided,
        borderRadius: "8px",
        backgroundColor: state.isSelected
          ? "var(--backgroundSelectedOrHoverOption)"
          : "var(--backgroundOption)",
        color: !state.isSelected ? "var(--colorOption)" : "",
        "&:hover": {
          backgroundColor: "var(--backgroundSelectedOrHoverOption)",
        },
        marginTop: "4px",
        "&:first-of-type": {
          marginTop: 0,
        },
      }),
      singleValue: (provided) => ({
        ...provided,
        color: "var(--allTextColor)",
      }),
      placeholder: (provided) => ({
        ...provided,
        color: "var(--inputPlaceholderColor)",
      }),
      dropdownIndicator: (provided) => ({
        ...provided,
        color: "var(--inputPlaceholderColor)",
        cursor: "pointer",
        "&:hover": {
          color: "var(--inputPlaceholderColor)",
        },
      }),
      indicatorSeparator: () => ({
        display: "none",
      }),
    };

    return (
      <Select
        ref={ref}
        options={options}
        styles={customStyles}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        classNamePrefix="customSelect"
      />
    );
  }
);

export default CustomSelect;
