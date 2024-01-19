import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllPodcasts } from "../../functions/podcast";
import { motion } from "framer-motion";

const CarouselonHome = () => {
  let images = [
    "https://html.liviucerchez.com/bateria/tmp/sample-540x540-1.jpg",
    "https://html.liviucerchez.com/bateria/tmp/sample-540x540-3.jpg",
    "https://html.liviucerchez.com/bateria/tmp/sample-540x540-5.jpg",
    "https://html.liviucerchez.com/bateria/tmp/sample-540x540-6.jpg",
    "https://html.liviucerchez.com/bateria/tmp/sample-540x540-7.jpg",
    "https://html.liviucerchez.com/bateria/tmp/sample-540x540-8.jpg",
    // "https://html.liviucerchez.com/bateria/tmp/sample-540x540-9.jpg",
    // "https://html.liviucerchez.com/bateria/tmp/sample-540x540-11.jpg",
  ];

  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState(0);

  const carousel = useRef();

  useEffect(() => {
    loadAllPodcasts();
  }, []);

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, [width]);
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

  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col items-center  "
      style={{
        margin: "1% 5%",
      }}
    >
      <p className="text-xl md:text-2xl lg:text-4xl text-slate-50 font-bold text-center">
        Featured Podcasts
      </p>
      <motion.div
        ref={carousel}
        className="carousel"
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div
          className="inner-carousel"
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
        >
          {podcasts.length > 0 &&
            podcasts.map((podcast) => {
              if (podcast.featured) {
                return (
                  <motion.div className="item" key={podcast._id}>
                    <Link to={podcast.link}>
                      <div className="rounded-t-xl">
                        <img
                          src={podcast.image.url}
                          alt={podcast.title}
                          onLoad={() =>
                            setWidth(
                              carousel.current.scrollWidth -
                                carousel.current.offsetWidth
                            )
                          }
                        />

                        {/* <div className="w-full">
                          <p className="text-2xl bg-orange-600 py-5 text-slate-50 text-center w-full font-bold  rounded-b-lg">
                            {podcast.title}
                          </p>
                        </div> */}
                      </div>
                    </Link>
                  </motion.div>
                );
              } else return;
            })}
        </motion.div>
      </motion.div>
      <button
        className="rounded-xl   py-3 pl-4 pr-4 bg-[#f1f5f9]   hover:bg-[#f97316] transition-all text-[#0f172a] hover:text-[#f1f5f9] self-center"
        onClick={() => navigate("/podcasts")}
      >
        <p className="font-bold text-2xl ">View all</p>
      </button>
    </div>
  );

  {
    /* <div className="block  lg:grid lg:grid-cols-4 lg:gap-3 mt-5 ">
        {podcasts.map((podcast) => {
          if (podcast.featured) {
            return (
              
            );
          } else return;
        })}
      </div> */
  }
};

export default CarouselonHome;
