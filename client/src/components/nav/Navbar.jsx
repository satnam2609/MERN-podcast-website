import React, { useEffect, useState } from "react";
import {
  useMediaQuery,
  AppBar,
  Toolbar,
  Drawer,
  useTheme,
  Divider,
} from "@mui/material";
import Dropdown from "../Dropdown";
import { getAllCategories } from "../../functions/category";
import CloseIcon from "@mui/icons-material/Close";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useNavigate } from "react-router-dom";
import { CloseFullscreen, SearchOutlined } from "@mui/icons-material";

import Fuse from "fuse.js";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { setInputSearch } from "../../state/search/searchSlice";
import Search from "../search/Search";
import { getAllBlogs } from "../../functions/blog";

const style = {
  position: "absolute",
  top: "25%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "rgb(23 23 23)",
  border: "2px solid transparent",
  borderRadius: "1.5rem",
  boxShadow: 24,
  p: 2,
  border: "none",
  gap: "10px",
  ouline: "none",
};

const Navbar = () => {
  const isNonMobile = useMediaQuery("(min-width: 768px)");
  const [mobileOpen, setMobileOpen] = useState(false);

  // blogs
  const [blogs, setBlogs] = useState([]);
  const loadAllBlogs = () => {
    getAllBlogs().then((res) => {
      if (res.data.success) {
        setBlogs(res.data.blogs);
      }
    });
  };

  useEffect(() => {
    loadAllBlogs();
  }, []);

  const handleMobileOpen = () => {
    setMobileOpen(!mobileOpen);
  };
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  // search
  const { search } = useSelector((state) => state.Search);

  // for nonMobile screen
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    if (searchTerm.trim() === "") {
      setSearchResults([]);
    } else {
      const fuse = new Fuse(blogs, { keys: ["title"], threshold: 0.3 });
      const results = fuse.search(searchTerm);

      setSearchResults(results.map((result) => result.item));
    }
  };

  // categories
  const loadAllCategories = () => {
    getAllCategories().then((res) => {
      if (res.data.success) {
        setCategories(res.data.categories);
      }
    });
  };

  useEffect(() => {
    loadAllCategories();
  }, []);

  const handleOpen = () => setOpen(!open);

  const handleSearchChange = (e) => {
    e.preventDefault();
    dispatch(setInputSearch(e.target.value));
  };

  if (!isNonMobile) {
    if (!open) {
      return (
        <nav className="w-[80%] py-1 sm:py-3 px-2">
          <ul className="flex justify-between items-center gap-3">
            <p
              className="text-3xl font-bold py-1"
              style={{
                color: theme.palette.secondary[600],
              }}
              onClick={() => navigate("/")}
            >
              Lorem dolor.
            </p>

            <div>
              <button onClick={handleMobileOpen}>
                <SearchOutlined className="text-slate-50" />
              </button>
              <Search
                open={mobileOpen}
                handleOpen={handleMobileOpen}
                search={search}
                handleSearchChange={handleSearchChange}
              />
            </div>

            <button className="bg-transparent" onClick={handleOpen}>
              <MenuOutlinedIcon className="text-slate-50 text-8xl" />
            </button>
          </ul>
        </nav>
      );
    }

    return (
      <Drawer anchor="top" open={open}>
        <AppBar className=" flex flex-col items-center justify-between space-y-4">
          <Toolbar className="flex justify-between items-center w-full">
            {" "}
            <div
              className="text-2xl font-bold"
              style={{
                color: theme.palette.secondary[600],
              }}
              onClick={() => navigate("/")}
            >
              Logo
            </div>
            <button
              onClick={handleOpen}
              style={{
                color: theme.palette.primary.dark,
              }}
            >
              <CloseIcon />
            </button>
          </Toolbar>

          <div className="flex flex-col items-center space-y-6">
            <p className="font-bold text-2xl text-[#121212]">Episodes</p>
            <p className="font-bold text-2xl text-[#121212]">Contact</p>
            <p className="font-bold text-2xl text-[#121212]">Blog</p>
            <p className="font-bold text-2xl text-[#121212]">About</p>
          </div>
        </AppBar>
      </Drawer>
    );
  } else if (isNonMobile) {
    return (
      <div className="w-full p-1 flex flex-col justify-around items-center space-x-3 mt-5">
        <nav className="w-[80%] bg-transparent p-3">
          <ul className="flex justify-around items-center space-x-3">
            <div
              className="text-2xl font-bold cursor-pointer"
              style={{
                color: theme.palette.secondary.main,
              }}
              onClick={() => navigate("/")}
            >
              Logo
            </div>

            <li
              className="text-xl lg:text-2xl cursor-pointer text-[#c1c0bf] hover:text-[#ea580c] font-bold text-left transition-all self-start tracking-wide leading-relaxed"
              onClick={() => navigate("/podcasts")}
            >
              Podcasts
            </li>

            <Dropdown text={"Blogs"} values={categories} />

            <div>
              <SearchOutlined
                className="text-white cursor-pointer"
                onClick={handleOpen}
              />
              <div>
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  open={open}
                  onClose={handleOpen}
                  closeAfterTransition
                  slots={{ backdrop: Backdrop }}
                  slotProps={{
                    backdrop: {
                      timeout: 500,
                    },
                  }}
                >
                  <Fade in={open}>
                    <Box sx={style}>
                      <form
                        className="flex w-full"
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (searchResults.length > 0) {
                            navigate(`/blogs/${searchResults[0].slug}`);
                            handleOpen();
                          }
                        }}
                      >
                        {searchResults.length > 0 ? (
                          <button type="submit">
                            <SearchOutlined className="text-white cursor-pointer" />
                          </button>
                        ) : (
                          ""
                        )}

                        <input
                          type="text"
                          className="bg-transparent outline-none text-white"
                          value={searchTerm}
                          onChange={handleSearch}
                          placeholder="Search for anything"
                        />
                      </form>
                      <Box>
                        <ul>
                          {searchResults &&
                            searchResults.map((blog) => (
                              <>
                                <li
                                  className="text-[#eeeeee] text-lg cursor-pointer hover:text-orange-600 transition-colors m-2"
                                  key={blog._id}
                                  onClick={() =>
                                    navigate("/blogs/" + blog.slug)
                                  }
                                >
                                  {blog.title.slice(0, 25).toLowerCase()}...
                                </li>
                                <Divider
                                  sx={{
                                    borderColor: "#6b6969",
                                  }}
                                />
                              </>
                            ))}
                          {searchTerm !== "" && searchResults.length == 0 && (
                            <li className="text-[#6b6969]">
                              Couldn't find your query
                            </li>
                          )}
                        </ul>
                      </Box>
                    </Box>
                  </Fade>
                </Modal>
              </div>
            </div>

            <li
              className="text-xl lg:text-2xl cursor-pointer text-[#c1c0bf] hover:text-[#ea580c] font-bold text-left transition-all self-start tracking-wide leading-relaxed"
              onClick={() => navigate("/contact")}
            >
              Contact
            </li>

            <li
              className="text-xl lg:text-2xl cursor-pointer text-[#c1c0bf] hover:text-[#ea580c] font-bold text-left transition-all self-start tracking-wide leading-relaxed"
              onClick={() => navigate("/about")}
            >
              About
            </li>
          </ul>
        </nav>
        <hr className="border-[#878282] mt-5  w-[80%]" />
      </div>
    );
  }
};

export default Navbar;
