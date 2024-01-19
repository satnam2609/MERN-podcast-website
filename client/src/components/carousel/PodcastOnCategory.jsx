import React, { useState, useEffect, useRef } from "react";
import { relatedPodcasts } from "../../functions/podcast";
import { motion } from "framer-motion";
import Podcast from "../card/Podcast";
import Loader from "../loading/Loader";
import { Link } from "react-router-dom";

const PodcastOnCategory = ({ id }) => {
  const [podcasts, setPodcasts] = useState([]);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    loadAllPodcasts();
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, [id]);
  const loadAllPodcasts = () => {
    relatedPodcasts(id).then((res) => {
      if (res.data.success) {
        setPodcasts(res.data.podcasts);
      }
    });
  };

  const carousel = useRef();

  return (
    <div
      style={{
        margin: "0 5%",
      }}
    >
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
            podcasts.map((podcast) => (
              <motion.div className="item" key={podcast._id}>
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
              </motion.div>
            ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PodcastOnCategory;
