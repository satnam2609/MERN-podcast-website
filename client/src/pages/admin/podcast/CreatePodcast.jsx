import React, { useState, useEffect } from "react";
import { createPodcast } from "../../../functions/podcast";
import { getAllCategories } from "../../../functions/category";
import Checkbox from "@mui/material/Checkbox";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import FileUpload from "../../../components/forms/FileUpload";
import Loader from "../../../components/loading/Loader";

const CreatePodcast = () => {
  let initialState = {
    image: {},
    title: "",

    link: "",
    category: "",
    featured: false,
  };

  const { admin } = useSelector((state) => state.Admin);

  useEffect(() => {
    loadAllCategories();
  }, []);

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const handleChange = (e) => {
    console.log(values);
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, " ----- ", e.target.value);
  };

  const handleCheckboxChange = (e) => {
    console.log(values);
    setValues({ ...values, featured: e.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.name, e.target.value);
    createPodcast(values, admin.token)
      .then((res) => {
        if (res.data.success) {
          toast.success(`${values.title} created`, {
            theme: "dark",
          });
          setValues(initialState);
          console.log("Podcast created", res.data.podcast);
        } else {
          toast.error(res.data.message, {
            theme: "dark",
          });
          console.log("Podcast error", res.data.message);
        }
      })
      .catch((err) => console.log("Podcast err", err));
  };

  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadAllCategories = () => {
    getAllCategories().then((res) => {
      if (res.data.success) {
        setCategories(res.data.categories);
      }
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col justify-center items-start space-y-5 p-3">
      <p className="text-3xl font-bold text-[#ea580c]">Create Podcast</p>

      <form
        className="flex flex-col justify-center items-start space-y-5"
        onSubmit={handleSubmit}
      >
        <div className="p-3">
          <FileUpload
            values={values}
            setValues={setValues}
            setLoading={setLoading}
          />
        </div>

        <div className="form__group field mt-5">
          <input
            type="input"
            className="form__field"
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

        <div className="form__group field mt-5">
          <input
            type="input"
            className="form__field"
            placeholder="Link"
            required=""
            value={values.link}
            name="link"
            onChange={handleChange}
          />
          <label for="link" class="form__label">
            Link
          </label>
        </div>

        <div className="form-group">
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
            class="bg-slate-50 border  border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5  dark:placeholder-gray-400 dark:text-white"
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

        <div className="form__group field mt-5">
          <label for="name" class="form__label">
            Want it to be featured ?
          </label>
          <div>
            <Checkbox
              value={values.featured}
              name="featured"
              onChange={handleCheckboxChange}
              {...label}
              sx={{
                color: "pink",
                "&.Mui-checked": {
                  color: "pink",
                },
              }}
            />
          </div>
        </div>

        <button
          className="rounded-lg bg-orange-600 text-lg font-medium hover:bg-orange-500 transition-all py-2 pl-4 pr-4"
          type="submit"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreatePodcast;
