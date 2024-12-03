import React, { forwardRef } from "react";
import Select from "react-select";
import "./CustomSelect.css";

const CustomSelect = forwardRef(
  (
    {
      options,
      placeholder,
      onChange,
      value,
      isSearchable,
      error,
      defaultValue,
    },
    ref
  ) => {
    const customStyles = {
      control: (provided) => ({
        ...provided,
        border: error ? `1px solid var(--errorColor)` : "none",
        boxShadow: "none",
        outline: "none",
        backgroundColor: "var(--inputBackgroundColor)",
        borderRadius: "12px",
        paddingLeft: "6px",
        transition: "0ms",
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
      <div className="selectContainer">
        <Select
          ref={ref}
          options={options}
          styles={customStyles}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          defaultValue={defaultValue}
          classNamePrefix="customSelect"
          isSearchable={isSearchable}
        />
        {error && <span className="errorText">{error.message}</span>}
      </div>
    );
  }
);

export default CustomSelect;
