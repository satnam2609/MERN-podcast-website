import React from "react";

const AdminHeader = ({ open, setOpen }) => {
  const handleOpen = () => setOpen(!open);
  console.log(open);
  return (
    <div className="flex justify-between items-center py-2 w-full fixed">
      <button className="m-2">
        <i
          class="fa-solid fa-bars text-2xl text-[#f8fafc]"
          onClick={() => handleOpen()}
        ></i>
      </button>

      <p className="text-xl text-white">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quod
        ad sequi!
      </p>
    </div>
  );
};

export default AdminHeader;
