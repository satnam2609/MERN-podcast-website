import React, { useState, useEffect } from "react";
import Navbar from "../components/nav/Navbar";
import { Transition } from "@headlessui/react";

import { getAllCategories } from "../functions/category";
import PodcastOnCategory from "../components/carousel/PodcastOnCategory";
import Loader from "../components/loading/Loader";
import Footer from "../components/nav/Footer";

const AllPodcasts = () => {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState("");

  useEffect(() => {
    loadAllCategories();
  }, [selected]);

  const loadAllCategories = () => {
    setLoading(true);
    getAllCategories().then((res) => {
      setLoading(false);
      if (res.data.success) {
        setCategories(res.data.categories);
      }
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="text-white">
      <Navbar />

      <div className="w-full m-auto p-2">
        <p className="text-4xl font-bold text-orange-600 text-center">
          Podcasts
        </p>

        <div className="flex space-x-3 justify-start items-center px-10 py-5 ">
          <div className="relative">
            <button
              className=" text-xl lg:text-2xl hover:underline cursor-pointer text-[#c1c0bf] hover:text-[#ea580c] font-medium text-left transition-all self-start tracking-wide leading-relaxed"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              {"Filter"}
            </button>
            <Transition
              show={isOpen}
              enter="transition-opacity duration-100"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div
                className="absolute   mt-2 py-2 w-48 bg-[#121212] rounded-lg shadow-lg"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                onClick={() => setIsOpen(!isOpen)}
              >
                {/* Dropdown menu items */}
                {categories &&
                  categories.length > 0 &&
                  categories.map((value) => {
                    return (
                      <div
                        className="block px-4 py-2 text-xl text-[#ea580c] hover:bg-[#ea580c] hover:text-slate-50"
                        onClick={() => {
                          setIsOpen(false);
                          setSelected(value._id);
                        }}
                        key={value.key}
                      >
                        {value.name}
                      </div>
                    );
                  })}
              </div>
            </Transition>
          </div>
          {selected !== "" ? (
            <button
              type="click"
              className="text-yellow-200 "
              onClick={() => setSelected("")}
            >
              Back
            </button>
          ) : (
            ""
          )}
        </div>

        {selected !== "" ? (
          <div className="p-3">
            {console.log(selected)}
            <div className="m-auto p-1" key={selected._id}>
              <p className="text-4xl font-bold text-slate-50 text-center">
                {categories.length > 0 &&
                  categories.map((category) => {
                    if (selected === category._id) {
                      return category.name;
                    }
                  })}
              </p>
              <PodcastOnCategory id={selected.toString()} />
            </div>
          </div>
        ) : (
          <div className="p-3">
            {categories.length > 0 &&
              categories.map((category) => {
                return (
                  <div className="m-auto p-1" key={category._id}>
                    <p className="text-4xl font-bold text-slate-50 text-center">
                      {category.name}
                    </p>
                    <PodcastOnCategory id={category._id} />
                  </div>
                );
              })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AllPodcasts;
