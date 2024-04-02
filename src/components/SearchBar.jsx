import { useState } from "react";

const SearchBar = ({ searchableData, setResultMethod, searchingParams }) => {
  const [search, setSearch] = useState("");
  const handleSearchChange = (e) => {
    setSearch(e.target.value);

    let filteredData = searchableData.filter((elem) => {
      return searchingParams
        .map((param) => elem[param])
        .join(" ")
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setResultMethod(filteredData);
  };

  return (
    <input
      className="input"
      type="text"
      placeholder="Search"
      value={search}
      onChange={handleSearchChange}
    />
  );
};

export default SearchBar;
