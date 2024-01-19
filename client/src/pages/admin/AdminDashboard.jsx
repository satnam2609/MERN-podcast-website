import React from "react";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const { admin } = useSelector((state) => state.Admin);

  if (admin && admin.token) {
    return (
      <div className="flex items-center h-screen  text-white">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque eum
        ducimus voluptates.
      </div>
    );
  }
  return <></>;
};

export default AdminDashboard;
