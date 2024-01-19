import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { currentAdmin } from "../../functions/admin";
import LoadingToRedirect from "../loading/LoadingToRedirect";
import AdminNav from "../nav/AdminNav";
import AdminHeader from "../nav/AdminHeader";
import { useMediaQuery, Box } from "@mui/material";
import Sidebar from "../nav/Sidebar";
const AdminRoutes = () => {
  const [ok, setOk] = useState(false);

  // Admin-nav state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const { admin } = useSelector((state) => state.Admin);
  const isNonMobile = useMediaQuery("(min-width:1280px)");

  useEffect(() => {
    if (admin && admin.token) {
      currentAdmin(admin.token)
        .then((res) => {
          // check if the response has the same email as the admin in redux
          if (res.data.email === admin.email) {
            setOk(true);
          }
        })
        .catch((err) => {
          console.log("ADMIN ROUTE ERR", err);
          setOk(false);
        });
    }
  }, [admin]);
  return ok ? <Sidebar /> : <LoadingToRedirect />;
};

export default AdminRoutes;
