import React, { useState } from "react";
import { replyBlog } from "../../functions/blog";
import { toast } from "react-toastify";

const Reply = ({ authorTo, blog, handleClose }) => {
  let initialState = {
    text: "",
    fromAuthor: "",
    websiteFrom: "",
    toAuthor: authorTo,
  };
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    replyBlog(
      values.toAuthor,
      values.websiteFrom,
      values.fromAuthor,
      values.text,
      blog
    )
      .then((res) => {
        if (res.data.success) {
          toast.success("Thank you");
          setValues(initialState);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <p className="text-xl md:text-3xl lg:text-5xl font-bold text-[#eeeeee] text-center">
        Reply to {authorTo}
      </p>

      <button onClick={handleClose} className="text-lg text-[#bebebe]">
        Cancel
      </button>

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
              name="fromAuthor"
              value={values.fromAuthor}
              onChange={handleChange}
              placeholder="Enter your name*"
              className="p-2 rounded-lg outline-none w-1/2 bg-black/50 text-[#eeeeee]"
            />

            <input
              type="text"
              name="websiteFrom"
              value={values.websiteFrom}
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

export default Reply;
