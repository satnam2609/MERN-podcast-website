import React, { useState, useEffect } from "react";
import FileUpload from "../../../components/forms/FileUpload";
import { getAllCategories } from "../../../functions/category";
import { getBlog, updateBlog } from "../../../functions/blog";
import { useSelector } from "react-redux";
import Loader from "../../../components/loading/Loader";
import { createBlog } from "../../../functions/blog";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const UpdateBlog = () => {
  const { slug } = useParams();
  const [contents, setContents] = useState([]);
  const [categories, setCategories] = useState([]);
  // Function to handle adding a new content section
  const addContent = (e) => {
    e.preventDefault();
    setContents([...contents, { title: "", content: "" }]);
  };

  // Function to handle updating a content section
  const updateContent = (index, field, value) => {
    const updatedContents = [...contents];
    updatedContents[index][field] = value;
    setContents(updatedContents);
    setValues({ ...values, contents: updatedContents });
  };

  let initialState = {
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

  const { admin } = useSelector((state) => state.Admin);
  useEffect(() => {
    loadBlog();
    loadAllCategories();
  }, []);

  const loadBlog = () => {
    setLoading(true);
    getBlog(slug)
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          setValues({ ...values, ...res.data.blog });
          setContents(res.data.blog.contents);
          console.log("Content", contents);
        }
      })
      .catch((err) => {
        toast.error(err.message);
        console.log("Blog reading err", err);
      });
  };

  const loadAllCategories = () => {
    getAllCategories().then((res) => {
      if (res.data.success) {
        setCategories(res.data.categories);
      }
    });
  };
  console.log(values);
  const handleChange = (e) => {
    console.log(values);
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, " ----- ", e.target.value);
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    // creating the blog
    updateBlog(slug, { ...values }, admin.token)
      .then((res) => {
        if (res.data.success) {
          setLoading(false);
          toast.success("Blog updated!");
          console.log("Blog updated successfully", res.data.blog);
          setValues(initialState);
        }
      })
      .catch((err) => {
        setLoading(false);
        setValues(initialState);
        console.log("Blog creation error", err);
        toast.error(err.message);
      });
  };

  console.log(contents);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col justify-start items-start p-5 ">
      <p className="text-xl md:text-3xl text-[#ea580c] font-bold">
        Update your blog
      </p>

      {/* form */}
      <form
        className="flex flex-col justify-start items-start mb-2 space-y-3"
        onSubmit={handleSubmit}
      >
        <div className="p-3">
          <FileUpload
            values={values}
            setLoading={setLoading}
            setValues={setValues}
          />
        </div>
        <div className="form__group field mt-5">
          <input
            type="input"
            className="form__field "
            placeholder="Title"
            required=""
            name="title"
            value={values.title}
            onChange={handleChange}
          />
          <label for="name" class="form__label">
            Title
          </label>
        </div>

        <div className="mt-2">
          <label
            for="countries"
            class="block mt-4 mb-2 text-lg font-medium  text-[#f1f5f9]"
          >
            Select a category
          </label>
          <select
            id="categories"
            name="category"
            onChange={handleChange}
            value={values.category}
            className="bg-slate-50 border  border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5  dark:placeholder-gray-400 dark:text-white"
          >
            <option className="text-lg">Please select</option>
            {categories.length > 0 &&
              categories.map((c) => (
                <option key={c._id} value={c._id} className="text-lg ">
                  {c.name}
                </option>
              ))}
          </select>
        </div>

        <div className="form__group field">
          <label className="text-slate-50 text-2xl font-bold">
            Introduction
          </label>
          <textarea
            rows={4}
            placeholder="Enter your text here"
            name="introduction"
            className="w-full bg-[#333333] p-2 rounded-lg mt-2 text-slate-50"
            value={values.introduction}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="flex justify-between items-center w-full">
          <p className="text-2xl text-slate-50 font-bold">Add some content</p>
          <button
            type="button"
            className="rounded-lg bg-[#ea580c] py-2 pl-3 pr-3 text-slate-50"
            onClick={addContent}
          >
            Add
          </button>
        </div>

        {contents.map((content, index) => {
          if (content.title !== "" && content.content !== "") {
            return (
              <div
                key={index}
                className="flex flex-col w-full items-center justify-center space-y-4"
              >
                <div className="form__group field mt-5">
                  <input
                    type="text"
                    value={content.title}
                    onChange={(e) => {
                      updateContent(index, "title", e.target.value);
                    }}
                    placeholder="Content Title"
                    className="form__field "
                  />
                  <label for="name" class="form__label">
                    Content title
                  </label>
                </div>
                <textarea
                  value={content.content}
                  onChange={(e) =>
                    updateContent(index, "content", e.target.value)
                  }
                  placeholder="Content Body"
                  className="w-full bg-[#333333] p-2 rounded-lg text-slate-50 "
                  rows={4}
                />
              </div>
            );
          }
        })}

        {/* Admin should be able to add youtube link*/}
        <div className="form__group field mt-5">
          <input
            type="input"
            className="form__field"
            placeholder="Link"
            required=""
            value={values.ytLink}
            onChange={handleChange}
            name="ytLink"
          />
          <label for="link" class="form__label">
            Youtube Link
          </label>
        </div>

        <button className="rounded-lg py-3 pl-5 pr-5 bg-[#ea580c] text-slate-50 font-bold text-xl mt-3">
          Update blog
        </button>
      </form>
    </div>
  );
};

export default UpdateBlog;
