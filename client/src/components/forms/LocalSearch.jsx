import React from "react";
import "./CategoryForm.css";

const LocalSearch = ({ search, setSearch }) => {
  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value.toLowerCase());
  };
  return (
    <div>
      <div class="form__group field">
        <input
          className="form__field"
          placeholder="Filter"
          required=""
          type="search"
          value={search}
          onChange={handleSearchChange}
        />
        <label for="name" class="form__label">
          Filter
        </label>
      </div>
    </div>
  );
};

export default LocalSearch;
