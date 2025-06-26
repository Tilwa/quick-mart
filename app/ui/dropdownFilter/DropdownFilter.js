"use client";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import "./DropdownFilter.css";

const DropdownFilter = ({
  title,
  options,
  selectedOptions,
  onChange,
  isColor = false,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (option) => {
    onChange(title, option);
  };

  return (
    <div className="dropdown-checkbox-container">
      <div className="dropdown-header" onClick={toggleDropdown}>
        <p className="dropdown-title">{title}</p>
        <span className="dropdown-icon">
          {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </span>
      </div>

      {isOpen && (
        <div className="dropdown-menu">
          {isColor
            ? options.map((color) => (
                <div key={color.id} className="color-options-list">
                  <span
                    key={color.id}
                    className={`color-circle-selectable ${
                      selectedOptions.includes(color.name) ? "selected" : ""
                    }`}
                    title={color.name}
                    style={{ backgroundColor: color.hexCode }}
                    onClick={() => handleCheckboxChange(color.name)}
                  >
                    {" "}
                    {/* {color.name} */}
                  </span>{" "}
                  <span className="color-name-selectable">{color.name}</span>
                </div>
              ))
            : options.map((option, index) => (
                <label key={index} className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(option)}
                    onChange={() => handleCheckboxChange(option)}
                  />
                  {option}
                </label>
              ))}

          {/* 👇 Here you handle custom UI like price range */}
          {children && (
            <div className="custom-dropdown-content">{children}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownFilter;
