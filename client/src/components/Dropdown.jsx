import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

const Dropdown = ({ text, values }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleClose = (category) => {
    navigate("/blog/" + category);
    setIsOpen(false);
  };

  return (
    <div className="relative" onClick={() => navigate("/blogs")}>
      <button
        className=" text-xl lg:text-2xl cursor-pointer text-[#c1c0bf] hover:text-[#ea580c] font-bold text-left transition-all self-start tracking-wide leading-relaxed"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {text}
      </button>
      <Transition
        show={isOpen}
        enter="transition-opacity duration-100"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className="absolute   mt-2 py-2 w-48 bg-[#121212] rounded-lg shadow-lg"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Dropdown menu items */}
          {values &&
            values.length > 0 &&
            values.map((value) => {
              return (
                <a
                  href={`/blog/${value._id}`}
                  className="block px-4 py-2 text-xl text-[#ea580c] hover:bg-[#ea580c] hover:text-slate-50"
                  onClick={() => handleClose(value._id)}
                  key={value.key}
                >
                  {value.name}
                </a>
              );
            })}
        </div>
      </Transition>
    </div>
  );
};

export default Dropdown;
