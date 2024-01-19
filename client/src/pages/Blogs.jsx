import React, { useEffect, useState } from "react";
import Navbar from "../components/nav/Navbar";
import { filterBlogs, getAllBlogs } from "../functions/blog";
import Loader from "../components/loading/Loader";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../components/nav/Footer";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loadAllBlogs = () => {
    setLoading(true);
    getAllBlogs().then((res) => {
      setLoading(false);
      if (res.data.blogs) {
        setBlogs(res.data.blogs);
      }
    });
  };

  useEffect(() => {
    loadAllBlogs();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col justify-start items-start h-screen w-full space-y-9">
      <Navbar />

      <div className="flex flex-col justify-center items-center self-center ">
        <p className="text-orange-600 text-xl lg:text-6xl font-bold ">Blogs</p>
        <div className="grid grid-cols-1 lg:grid-cols-4 w-full p-5 gap-5">
          {blogs.length > 0 &&
            blogs.map((blog) => {
              return (
                <div
                  onClick={() => navigate("/blogs/" + blog.slug)}
                  className="cursor-pointer "
                >
                  <img
                    src={blog.image.url}
                    alt="image"
                    className="rounded-t-xl object-cover  mt-3 "
                    style={{
                      marginRight: "auto",
                      marginLeft: "auto",
                    }}
                  />

                  <div className="w-full">
                    <p className="text-sm bg-orange-600 py-5 text-slate-50 text-center w-full font-bold  rounded-b-lg h-[10vh]">
                      {blog.title}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllBlogs;
