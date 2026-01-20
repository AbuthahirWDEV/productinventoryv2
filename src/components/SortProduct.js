import React from "react";

const SortProduct = ({ sortOptions, onSort }) => {
  return (
    <label>
      SortProduct
      <select onChange={(e) => onSort(e.target.value)}>
        {sortOptions.map((options, index) => (
          <option key={index}>{options}</option>
        ))}
      </select>
    </label>
  );
};

export default SortProduct;
