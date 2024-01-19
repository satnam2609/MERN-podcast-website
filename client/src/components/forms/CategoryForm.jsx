import React, { useState, useEffect } from "react";

import "./CategoryForm.css";
const CategoryForm = ({ name, setName, handleSubmit, textBtn }) => {
  const handleChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  return (
    <form
      className="flex flex-col items-start justify-start  mt-8"
      onSubmit={handleSubmit}
    >
      <div class="form__group field">
        <input
          type="input"
          className="form__field"
          placeholder="Name"
          required=""
          value={name}
          onChange={handleChange}
        />
        <label for="name" class="form__label">
          Name
        </label>
      </div>

      <button
        className="rounded-lg text-xl bg-[#ea580c] text-white py-2 pl-5 pr-5 mt-3 hover:bg-[#f97316] transition-all"
        type="submit"
      >
        {textBtn}
      </button>
    </form>
  );
};

export default CategoryForm;
