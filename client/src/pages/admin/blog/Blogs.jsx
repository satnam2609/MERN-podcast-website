import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getAllBlogs, removeBlog } from "../../../functions/blog";
import { toast } from "react-toastify";
import Loader from "../../../components/loading/Loader";
import { useSelector } from "react-redux";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { admin } = useSelector((state) => state.Admin);
  const navigate = useNavigate();
  useEffect(() => {
    loadAllBlogs();
  }, []);
  const loadAllBlogs = () => {
    setLoading(true);
    getAllBlogs()
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          setBlogs(res.data.blogs);
        }
      })
      .catch((err) => {
        toast.error(err.message);
        console.log("Blog listing err", err);
      });
  };

  const handleRemove = (slug) => {
    setLoading(true);
    removeBlog(slug, admin.token)
      .then((res) => {
        setLoading(false);
        loadAllBlogs();
        toast.success(`Blog removed!`, {
          theme: "dark",
        });
      })
      .catch((err) => {
        console.log("Blog delete err", err);
        toast.error(err.message, {
          theme: "dark",
        });
      });
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col justify-start items-start h-screen w-full">
      <p className="text-orange-600 text-2xl lg:text-5xl font-bold p-3">
        Blogs
      </p>

      <div className="grid lg:grid-cols-4 grid-cols-1 gap-8 lg:mt-5">
        {blogs &&
          blogs.length > 0 &&
          blogs.map((blog) => {
            return (
              <div className="flex flex-col justify-center items-start h-full w-full mb-2">
                <img
                  src={blog.image.url}
                  alt={blog.title}
                  className="object-contain rounded-t-lg"
                />
                <div className="w-full">
                  <p className="text-sm bg-orange-600 py-5 text-slate-50 text-center w-full font-bold  h-[10vh]">
                    {blog.title}
                  </p>
                </div>
                <hr />

                <div className="w-full rounded-b-lg bg-orange-600 flex justify-around items-center">
                  <button
                    className="bg-transparent text-xl text-slate-50 "
                    onClick={() => navigate(`/admin/blogs/${blog.slug}`)}
                  >
                    <i class="fa-solid fa-pen-to-square text-black text-xl"></i>
                  </button>
                  <button
                    className="bg-transparent text-xl text-slate-50"
                    onClick={() => handleRemove(blog.slug)}
                  >
                    <i class="fa-sharp fa-solid fa-trash text-black text-xl"></i>
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Blogs;
