import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/nav/Navbar";
import { getBlog } from "../functions/blog";
import Loader from "../components/loading/Loader";
import Comments from "../components/sections/blog/Comments";
import Footer from "../components/nav/Footer";

const BlogPage = () => {
  const { slug } = useParams();
  const [contents, setContents] = useState([]);
  let initialState = {
    _id: "",
    title: "",
    image: {},
    introduction: "",
    contents: contents,
    slug: "",
    category: "",
    ytLink: "",
  };
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadBlog();
  }, [slug]);

  const loadBlog = () => {
    setLoading(true);
    getBlog(slug).then((res) => {
      setLoading(false);
      if (res.data.blog) {
        setValues(res.data.blog);
        setContents(res.data.blog.contents);
      }
    });
  };

  if (loading) {
    return <Loader />;
  }

  console.log("Contents", contents);
  return (
    <div className="flex flex-col justify-start items-start h-screen w-full space-y-9">
      <Navbar />
      <div className="flex flex-col justify-center items-center w-full space-y-5 p-3">
        <p className="text-xl md:text-3xl lg:text-5xl text-[#ff3d00] font-bold mb-2   text-center">
          {values.title}
        </p>
        <img
          src={values.image.url}
          alt={values.title}
          className="object-contain w-full lg:w-[70vw]"
        />

        <div className="flex flex-col items-center w-full lg:w-[70vw] space-y-3">
          <p className="text-2xl lg:text-4xl text-[#cbd5e1] font-extrabold self-start">
            Introduction
          </p>
          <p className="text-sm lg:text-xl text-[#cbd5e1] font-bold lg:leading-10 lg:tracking-wide">
            {values.introduction}
          </p>
        </div>

        {contents &&
          contents.length > 0 &&
          contents.map((content) => {
            return (
              <div className="flex flex-col items-center w-full lg:w-[70vw] space-y-4">
                <p className="text-2xl lg:text-4xl text-[#cbd5e1] font-extrabold self-start">
                  {content.title}
                </p>
                <p className="text-sm lg:text-xl text-[#cbd5e1] font-bold lg:leading-10 lg:tracking-wide">
                  {content.content}
                </p>
              </div>
            );
          })}

        <iframe
          src={`https://www.youtube.com/embed/${values.ytLink}`}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="w-full lg:w-[80vw] h-[40vh] lg:h-[70vh]"
        ></iframe>

        {/* <img
          src={values.image.url}
          alt={values.title}
          className="object-contain w-full lg:w-[70vw]"
        /> */}

        <Comments blog={values._id} />
      </div>
    </div>
  );
};

export default BlogPage;
