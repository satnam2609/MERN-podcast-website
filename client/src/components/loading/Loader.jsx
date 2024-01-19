import React from "react";
import "../Loader.css";

const Loader = () => {
  return (
    <div id="container">
      <label class="loading-title">Loading ...</label>
      <span class="loading-circle sp1">
        <span class="loading-circle sp2">
          <span class="loading-circle sp3"></span>
        </span>
      </span>
    </div>
  );
};

export default Loader;
