import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useMediaQuery, useTheme } from "@mui/material";
import { useLocation, useNavigate, Link, Outlet } from "react-router-dom";

const drawerWidth = 240;

function Sidebar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  const navigate = useNavigate();
  const [active, setActive] = useState("");
  const { pathname } = useLocation();
  const isNonMobile = useMediaQuery("(min-width:1280px)");

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <div className="w-full flex flex-col  items-center justify-center ">
        <div className="flex  flex-col justify-center items-center mt-5 space-y-7 w-full">
          <div
            className="text-3xl font-bold text-[#ff3d00] text-center"
            style={{
              fontFamily: "'Kalam',cursive",
            }}
          >
            Silver tongue
          </div>

          <br />

          <nav className="flex flex-col items-center justify-start  text-[#ff3c00] w-full">
            <ul className="flex flex-col items-center justify-center space-y-7 w-full">
              <li
                className="hover:bg-[#ffffff14] transition-all w-full text-center py-2"
                style={{
                  backgroundColor: active === "admin/dashboard" && "#ff3c00",
                  color: active === "admin/dashboard" ? "#eeeeee" : "#ff3c00",
                }}
              >
                <Link
                  to="/admin/dashboard"
                  className="text-2xl font-medium w-full"
                >
                  Dashboard
                </Link>
              </li>

              <li
                className="hover:bg-[#ffffff14] transition-all w-full text-center py-2"
                style={{
                  backgroundColor: active === "admin/podcasts" && "#ff3c00",
                  color: active === "admin/podcasts" ? "#eeeeee" : "#ff3c00",
                }}
              >
                <Link to="/admin/podcasts" className="text-2xl font-medium">
                  Podcasts
                </Link>
              </li>

              <li
                className="hover:bg-[#ffffff14] transition-all w-full text-center py-2"
                style={{
                  backgroundColor: active === "admin/new-podcast" && "#ff3c00",
                  color: active === "admin/new-podcast" ? "#eeeeee" : "#ff3c00",
                }}
              >
                <Link to="/admin/new-podcast" className="text-2xl font-medium">
                  New podcast
                </Link>
              </li>

              <li
                className="hover:bg-[#ffffff14] transition-all w-full text-center py-2"
                style={{
                  backgroundColor: active === "admin/category" && "#ff3c00",
                  color: active === "admin/category" ? "#eeeeee" : "#ff3c00",
                }}
              >
                <Link to="/admin/category" className="text-2xl font-medium">
                  Category
                </Link>
              </li>

              <li
                className="hover:bg-[#ffffff14] transition-all w-full text-center py-2"
                style={{
                  backgroundColor: active === "admin/blogs" && "#ff3c00",
                  color: active === "admin/blogs" ? "#eeeeee" : "#ff3c00",
                }}
              >
                <Link to="/admin/blogs" className="text-2xl font-medium">
                  Blogs
                </Link>
              </li>

              <li
                className="hover:bg-[#ffffff14] transition-all w-full text-center py-2"
                style={{
                  backgroundColor: active === "admin/new-blog" && "#ff3c00",
                  color: active === "admin/new-blog" ? "#eeeeee" : "#ff3c00",
                }}
              >
                <Link to="/admin/new-blog" className="text-2xl font-medium">
                  New blog
                </Link>
              </li>

              <li
                className="hover:bg-[#ffffff14] transition-all w-full text-center py-2"
                style={{
                  backgroundColor: active === "admin/articles" && "#ff3c00",
                  color: active === "admin/articles" ? "#eeeeee" : "#ff3c00",
                }}
              >
                <Link to="/admin/articles" className="text-2xl font-medium">
                  Articles
                </Link>
              </li>
              <li
                className="hover:bg-[#ffffff14] transition-all w-full text-center py-2"
                style={{
                  backgroundColor: active === "admin/new-article" && "#ff3c00",
                  color: active === "admin/new-article" ? "#eeeeee" : "#ff3c00",
                }}
              >
                <Link to="/admin/new-article" className="text-2xl font-medium">
                  New article
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <CssBaseline />
      <AppBar
        position="absolute"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "transparent",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" }, color: "white" }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              color: "#f8fafc",
              fontSize: "2.5em",
            }}
          >
            Admin panel
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#0f172a",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "rgba(255, 255, 255, 0.02)",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

Sidebar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Sidebar;
