import React from "react";

const SearchBar = ({ searchQuery, onSearchQuery }) => {
  return (
    <label>
      Searchbar..
      <input
        type="text"
        placeholder="search the item..."
        value={searchQuery}
        onChange={(e) => onSearchQuery(e.target.value)}
      />
    </label>
  );
};

export default SearchBar;
