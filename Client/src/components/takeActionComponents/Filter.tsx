import React, { useState } from "react";
import "../css/filter.scss";
import arrow from "../../assets/takeActionsAssets/cheveron-down.png";

interface FilterProps {
  title: string;
  options: string[];
  selectedOptions: string[];
  onChange: (selectedOptions: string[]) => void;
}

const Filter: React.FC<FilterProps> = ({
  title,
  options,
  selectedOptions,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionChange = (option: string) => {
    const newSelectedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((o) => o !== option)
      : [...selectedOptions, option];
    onChange(newSelectedOptions);
  };

  return (
    <div className={`filter-component `}>
      <div
        className={`filter-header ${isOpen ? "open" : ""}`}
        onClick={handleToggle}
      >
        <span className={`filter-title `}>{title}</span>
        <img src={arrow} alt="Toggle Dropdown" className="dropdown-arrow" />
      </div>
      {isOpen && (
        <div className={`filter-options`}>
          {options.map((option) => (
            <div className="filter-option" key={option}>
              <div className="checkbox">
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleOptionChange(option)}
                />
              </div>
              <label key={option}>{option}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filter;
