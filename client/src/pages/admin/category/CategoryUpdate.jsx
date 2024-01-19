import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategory, updateCategory } from "../../../functions/category";
import { useSelector } from "react-redux";
import CategoryForm from "../../../components/forms/CategoryForm";
import { toast } from "react-toastify";

const CategoryUpdate = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { admin } = useSelector((state) => state.Admin);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    laodCategories();
  }, [loading]);

  const laodCategories = async () => {
    getCategory(slug, admin.token)
      .then((res) => {
        if (res.data.success) {
          setName(res.data.category[0].name);
        }
      })
      .catch();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCategory(name, slug, admin.token)
      .then((res) => {
        if (res.data.success) {
          toast.success(`${name} is updated`, { theme: "dark" });
          console.log("Update category", res.data.category);
        } else {
          toast.error(res.data.message);
          console.log("Update category error", res.data.message);
        }
      })
      .catch((err) => console.log("Update category error", err));
  };

  const handleChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  return (
    <div className="flex flex-col justify-start items-start p-3">
      <p className="text-left text-xl md:text-3xl font-bold text-[#ea580c] ">
        Update category
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form__group field">
          <input
            type="input"
            class="form__field"
            placeholder="Name"
            required=""
            value={name}
            onChange={handleChange}
          />

          <label className="form__label">Name</label>
          <br />
          <button className="rounded-lg text-xl bg-[#ea580c] text-white py-2 pl-5 pr-5 mt-3 hover:bg-[#f97316] transition-all">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryUpdate;
