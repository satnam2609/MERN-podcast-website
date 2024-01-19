import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Navbar from "../components/nav/Navbar";
import { filterBlogs } from "../functions/blog";

const BlogsFilter = () => {
  const { search } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchByQuery = (query) => {
    setLoading(true);
    filterBlogs({ query: query }).then((res) => {
      setLoading(false);
      if (res.data.blogs) {
        setBlogs(res.data.blogs);
      }
    });
  };

  useEffect(() => {
    if (search !== "") {
      fetchByQuery(search);
    }
  }, [search]);
  return (
    <div className="flex flex-col justify-start items-start h-screen w-full space-y-9">
      <Navbar />
      <div className="flex flex-col justify-center items-center w-full space-y-5 p-3">
        <p className="text-3xl text-slate-50 flex items-center  p-4">
          Searched for "
          <p className="text-4xl font-bold text-orange-600">{search}</p>"
        </p>
        <p>
          {blogs.length < 1 && (
            <p className="text-white">
              Cannot find your query ,please enter the proper words
            </p>
          )}
        </p>
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
    </div>
  );
};

export default BlogsFilter;
