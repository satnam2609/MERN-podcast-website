import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAllPodcasts, removePodcast } from "../../../functions/podcast";
import { toast } from "react-toastify";
import Loader from "../../../components/loading/Loader";
import { useSelector } from "react-redux";

const Podcasts = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { admin } = useSelector((state) => state.Admin);
  useEffect(() => {
    loadAllPodcasts();
  }, []);

  const loadAllPodcasts = () => {
    setLoading(true);
    getAllPodcasts()
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          setPodcasts(res.data.podcast);
        }
      })
      .catch((res) => {
        console.log("Podcasts loading error", res);
        toast.error(res.data.message);
      });
  };

  const handleRemove = (slug) => {
    setLoading(true);
    removePodcast(slug, admin.token)
      .then((res) => {
        if (res.data.success) {
          setLoading(false);
          loadAllPodcasts();
          toast.success(`${slug} removed!`, {
            theme: "dark",
          });
        }
      })
      .catch((res) => {
        setLoading(false);
        toast.error(res.data.message, {
          theme: "dark",
        });
        console.log("Podcast remove error", res);
      });
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col justify-start items-start h-screen w-full">
      <p className="text-orange-600 text-2xl lg:text-5xl font-bold p-3">
        Podcasts
      </p>

      <div className="grid lg:grid-cols-4 grid-cols-1 gap-8 lg:mt-5">
        {podcasts &&
          podcasts.length > 0 &&
          podcasts.map((podcast) => {
            return (
              <div className="flex flex-col justify-center items-start h-full w-full mb-2">
                <img
                  src={podcast.image.url}
                  alt={podcast.title}
                  className="object-contain rounded-t-lg"
                />
                <div className="w-full">
                  <p className="text-2xl bg-orange-600 py-5 text-slate-50 text-center w-full font-bold  ">
                    {podcast.title}
                  </p>
                </div>
                <hr />

                <div className="w-full rounded-b-lg bg-orange-600 flex justify-around items-center">
                  <button
                    className="bg-transparent text-xl text-slate-50 "
                    onClick={() => navigate(`/admin/podcasts/${podcast.slug}`)}
                  >
                    <i class="fa-solid fa-pen-to-square text-black text-xl"></i>
                  </button>
                  <button
                    className="bg-transparent text-xl text-slate-50"
                    onClick={() => handleRemove(podcast.slug)}
                  >
                    <i class="fa-sharp fa-solid fa-trash text-black text-xl"></i>
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Podcasts;
