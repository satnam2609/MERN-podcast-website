import React, { useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { themeSettings } from "./theme";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Layout from "./scenes/Layout";
import AdminLogin from "./pages/AdminLogin";
import { ToastContainer } from "react-toastify";

import CreateCategory from "./pages/admin/category/CreateCategory";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoutes from "./components/routes/AdminRoutes";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";

import CreatePodcast from "./pages/admin/podcast/CreatePodcast";
import Podcasts from "./pages/admin/podcast/Podcasts";
import UpdatePodcast from "./pages/admin/podcast/UpdatePodcast";
import CreateBlog from "./pages/admin/blog/CreateBlog";
import Blogs from "./pages/admin/blog/Blogs";
import UpdateBlog from "./pages/admin/blog/UpdateBlog";
import AllBlogs from "./pages/Blogs";
import BlogPage from "./pages/BlogPage";
import BlogsRelated from "./pages/BlogsRelated";
import AllPodcasts from "./pages/Podcasts";
import BlogsFilter from "./pages/BlogsFilter";
import Contact from "./pages/Contact";

const App = () => {
  const theme = useMemo(() => createTheme(themeSettings()), []);
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <CssBaseline />
      <div className="w-[100%] h-screen  ">
        <Routes>
          <Route element={<Layout />}>
            {/* User routes */}
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<AdminLogin />} />
            <Route path="/podcasts" element={<AllPodcasts />} />
            <Route path="/blogs" element={<AllBlogs />} />
            <Route path="/blogs/:slug" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogsRelated />} />
            <Route path="/blogs/filter/:search" element={<BlogsFilter />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          <Route element={<AdminRoutes />}>
            {/*Admin routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/category" element={<CreateCategory />} />
            <Route path="/admin/category/:slug" element={<CategoryUpdate />} />
            <Route path="/admin/new-podcast" element={<CreatePodcast />} />
            <Route path="/admin/podcasts" element={<Podcasts />} />
            <Route path="/admin/podcasts/:slug" element={<UpdatePodcast />} />
            <Route path="/admin/new-blog" element={<CreateBlog />} />
            <Route path="/admin/blogs" element={<Blogs />} />
            <Route path="/admin/blogs/:slug" element={<UpdateBlog />} />
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
