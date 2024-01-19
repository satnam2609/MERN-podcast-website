import React, { useState } from "react";
import { useTheme } from "@mui/material";
const Subscribe = () => {
  const [email, setEmail] = useState("");
  const theme = useTheme();
  const handleChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail("");
  };
  return (
    <div className="flex justify-center items-center mt-4 mb-4 self-start">
      <input
        type="email"
        placeholder="Enter your email"
        className="lg:p-2 p-2 w-full  rounded-l-md lg:rounded-l-lg md:text-xl "
        style={{
          backgroundColor: theme.palette.primary[200],
        }}
        value={email}
        onChange={handleChange}
      />

      <button
        type="submit"
        className="bg-[#ea580c] rounded-r-md p-2 lg:rounded-r-lg lg:pt-2  lg:pb-2 lg:pr-7 lg:pl-7 text-md md:text-xl text-slate-50"
        onSubmit={handleSubmit}
      >
        Subscribe
      </button>
    </div>
  );
};

export default Subscribe;
