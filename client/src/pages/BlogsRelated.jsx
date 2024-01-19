import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/nav/Navbar";
import { filterBlogs, relatedBlogs } from "../functions/blog";
import Loader from "../components/loading/Loader";
import { useSelector } from "react-redux";
import Footer from "../components/nav/Footer";

const BlogsRelated = () => {
  const { id } = useParams();
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { search } = useSelector((state) => state.Search);

  const loadRelatedBlogs = () => {
    setLoading(true);
    relatedBlogs(id).then((res) => {
      setLoading(false);
      if (res.data.success) {
        setBlogs(res.data.blogs);
      }
    });
  };

  useEffect(() => {
    loadRelatedBlogs();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col justify-start items-start h-screen w-full space-y-9">
      <Navbar />
      <div className="flex flex-col justify-center items-center w-full space-y-5 p-3">
        <p className="text-xl md:text-3xl lg:text-5xl text-[#ff3d00] font-bold mb-2   text-center">
          {blogs.length > 0 && blogs[0].category.name}
        </p>
        {blogs.length > 0 &&
          blogs.map((blog) => {
            return (
              <div className="flex flex-col justify-center items-center w-full space-y-5  ">
                <img
                  src={blog.image.url}
                  alt={blog.title}
                  onClick={() => navigate("/blogs/" + blog.slug)}
                />
                <p className="text-slate-50 font-bold text-center">
                  {blog.introduction.slice(0, 120)}...
                  <Link className="text-orange-600" to={"/blogs/" + blog.slug}>
                    Continue reading
                  </Link>
                </p>
              </div>
            );
          })}
      </div>
      <Footer />
    </div>
  );
};

export default BlogsRelated;
