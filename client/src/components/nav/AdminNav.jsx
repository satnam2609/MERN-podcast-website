import React, { useState, useEffect } from "react";
import { Drawer, useTheme, useMediaQuery } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AdminNav = ({ open, setOpen }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [active, setActive] = useState("");
  const { pathname } = useLocation();
  const isNonMobile = useMediaQuery("(min-width:1280px)");

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  console.log("Active pathname-->", active);

  return (
    <div className="flex h-screen static">
      <Drawer
        anchor={"left"}
        open={open}
        hideBackdrop={false}
        variant="variable"
        elevation={16}
        sx={{
          width: 250,
          "& .MuiDrawer-paper": {
            color: "#ff3d00", //500
            backgroundColor: "rgba(255, 255, 255, 0.03)", //700
            boxSixing: "border-box",
            borderWidth: 0,
            width: 250,
          },
        }}
      >
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
                    backgroundColor:
                      active === "admin/dashboard" ? "#ff3c00" : "transparent",
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
                    backgroundColor:
                      active === "admin/new-podcast" && "#ff3c00",
                    color:
                      active === "admin/new-podcast" ? "#eeeeee" : "#ff3c00",
                  }}
                >
                  <Link
                    to="/admin/new-podcast"
                    className="text-2xl font-medium"
                  >
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
                    backgroundColor:
                      active === "admin/new-article" && "#ff3c00",
                    color:
                      active === "admin/new-article" ? "#eeeeee" : "#ff3c00",
                  }}
                >
                  <Link
                    to="/admin/new-article"
                    className="text-2xl font-medium"
                  >
                    New article
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default AdminNav;

{
  /* <nav className="w-[20%] h-[100%] static text-[#ff3d00]">
{/* deep orange-#ff3d00 */
}
// Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis vel
// explicabo dolorum!
// </nav>

{
  /* <ul className="flex flex-col items-center justify-center rounded-md bg-[#1e293b] py-5 pr-3 pl-3 h-[100vh]">
        <li className="hover:bg-[#ff3d00] transition-all">
          <Link to="/admin/dashboard" className="nav-link">
            Dashboard
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/admin/product" className="nav-link">
            Product
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/admin/products" className="nav-link">
            Products
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/admin/category" className="nav-link">
            Category
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/admin/sub-category" className="nav-link">
            Sub-Category
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/admin/coupon" className="nav-link">
            Coupon
          </Link>
        </li>
      </ul> */
}
