import React, { useState, useEffect } from "react";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";
import { useSelector } from "react-redux";
import {
  createCategory,
  getAllCategories,
  removeCategory,
} from "../../../functions/category";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateCategory = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const { admin } = useSelector((state) => state.Admin);
  const [categories, setCategories] = useState([]);

  const searched = (search) => (c) => c.name.toLowerCase().includes(search);

  useEffect(() => {
    loadAllCategories();
  }, []);

  const loadAllCategories = () => {
    getAllCategories().then((res) => {
      if (res.data.success) {
        setCategories(res.data.categories);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createCategory(admin.token, name)
      .then((res) => {
        if (res.data.success) {
          console.log("Category created", res.data.category);
          setName("");
          toast.success(`${res.data.category.slug} created!`, {
            theme: "dark",
          });
        } else if (!res.data.success) {
          toast.error(`${res.data.message}`, {
            theme: "dark",
          });
        }

        loadAllCategories();
      })
      .catch((error) => {
        console.log("Create category error", error.message);
      });
  };

  const handleRemove = (slug) => {
    removeCategory(slug, admin.token)
      .then((res) => {
        if (res.data.success) {
          toast.success(`${res.data.category.name} deleted`, { theme: "dark" });
          console.log("Delete category", res.data.category);
          loadAllCategories();
        } else {
          toast.error(res.data.message, { theme: "dark" });
          console.log("Delete category error", res.data.message);
        }
      })
      .catch((err) => console.log("Delete category error", err));
  };

  return (
    <div className="flex flex-col justify-start items-start h-screen space-y-8 p-3">
      <p className="text-left text-xl md:text-3xl font-bold text-[#ea580c] self-start">
        Create category for podcasts
      </p>

      <CategoryForm
        name={name}
        setName={setName}
        handleSubmit={handleSubmit}
        textBtn={"Create"}
      />

      {/* input search */}
      <LocalSearch search={search} setSearch={setSearch} />
      <hr className="border-[#878282] mt-5  w-[90%]" />
      <p className="text-lg text-white">All Categories</p>
      {categories.length > 0 &&
        categories.filter(searched(search)).map((cat) => {
          return (
            <div
              key={cat._id}
              className="flex justify-between items-center w-full py-2 bg-[#ffffff1f] pl-3 pr-3"
            >
              <p className="text-left text-lg md:text-xl font-bold text-white">
                {cat.name}
              </p>

              <div className="flex justify-between space-x-5">
                <button
                  className="bg-transparent"
                  onClick={() => navigate(`/admin/category/${cat.slug}`)}
                >
                  <i class="fa-solid fa-pen-to-square text-red-500 text-xl"></i>
                </button>
                <button
                  className="bg-transparent"
                  onClick={() => handleRemove(cat.slug)}
                >
                  <i class="fa-sharp fa-solid fa-trash text-red-700 text-xl"></i>
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default CreateCategory;
