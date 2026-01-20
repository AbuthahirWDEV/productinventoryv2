import React from "react";

const FilterByCategory = ({ categoryOptions, onFilter }) => {
  const FilterCategoryOptions = ["All", ...categoryOptions];
  return (
    <label>
        FilterByCategory : 
      <select onChange={(e) => onFilter(e.target.value)}>
        {FilterCategoryOptions.map((option, index) => (
          <option key={index}>{option}</option>
        ))}
      </select>
    </label>
  );
};

export default FilterByCategory;
