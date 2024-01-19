import React, { useEffect, useState } from "react";
import { commentBlog } from "../../../functions/blog";
import { toast } from "react-toastify";
import Loader from "../../loading/Loader";
import { getComments } from "../../../functions/comments";
import Comment from "../../Comment";

const Comments = ({ blog }) => {
  let initialState = {
    author: "",
    website: "",
    text: "",
    blog: blog,
  };

  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    loadAllComments();
  }, [loading]);

  const loadAllComments = () => {
    getComments(blog).then((res) => {
      if (res.data.success) {
        setComments(res.data.comments);
      }
    });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    commentBlog(values.author, values.website, values.text, values.blog)
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          toast.success("Your thought is shared");
        }
        setValues(initialState);
      })
      .catch((err) => {
        setLoading(false);
        console.log("comment err", err);
        toast.error(err.message);
        setValues(initialState);
      });
    console.log(values);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-[85%] h-[55vh]  ">
      {comments && comments.length > 0 && (
        <div className="flex flex-col items-center justify-center space-y-3">
          <p className="text-xl md:text-3xl lg:text-5xl font-bold text-[#eeeeee] text-center">
            Shared thoughts
          </p>

          {comments.length > 0 &&
            comments.map((comment) => (
              <Comment key={comment._id} comment={comment} blog={values.blog} />
            ))}
        </div>
      )}
      <p className="text-xl md:text-3xl lg:text-5xl font-bold text-[#eeeeee] text-center">
        Share your thoughts
      </p>

      <div className="w-full h-full bg-[#37323231] rounded-2xl ">
        <form
          className="p-2 flex flex-col items-center justify-center space-y-5"
          onSubmit={handleSubmit}
        >
          <p className="text-[#eeeeee] text-xl font-bold text-center p-2">
            Required fields are marked *
          </p>

          <textarea
            name="text"
            cols="150"
            rows="10"
            placeholder="Enter your thought here*"
            value={values.text}
            onChange={handleChange}
            className="rounded-lg outline-none bg-black/50 w-full text-[#eeeeee] p-2"
          ></textarea>

          <div className=" w-full flex justify-between items-center space-x-3 ">
            <input
              type="text"
              name="author"
              value={values.author}
              onChange={handleChange}
              placeholder="Enter your name*"
              className="p-2 rounded-lg outline-none w-1/2 bg-black/50 text-[#eeeeee]"
            />

            <input
              type="text"
              name="website"
              value={values.website}
              onChange={handleChange}
              placeholder="Website"
              className="p-2 rounded-lg outline-none w-1/2 bg-black/50 text-[#eeeeee]"
            />
          </div>

          <button
            type="submit"
            className="bg-orange-600 py-3 px-5 text-xl text-[#eeeeee] font-bold rounded-lg  "
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Comments;
