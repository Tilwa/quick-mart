"use client";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import "./DropdownFilter.css";

const DropdownFilter = ({ title, options, selectedOptions, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (option) => {
    onChange(title, option);
  };

  const colorMap = {
    Red: "#FF0000",
    Blue: "#0000FF",
    Green: "#008000",
    Black: "#000000",
    White: "#FFFFFF",
    Yellow: "#FFFF00",
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
        <div className="dropdown-options">
          {options.map((option, index) =>
            title === "Color" ? (
              <label key={index} className="checkbox-option color-option">
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                />
                <span
                  className="color-circle"
                  style={{ backgroundColor: colorMap[option] || "#387478" }}
                ></span>
                {option}
              </label>
            ) : (
              <label key={index} className="checkbox-option">
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                />
                {option}
              </label>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownFilter;
