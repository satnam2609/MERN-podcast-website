import React from "react";
import TypeWriter from "../../Typewriter";
import Subscribe from "../../Subscribe";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useNavigate } from "react-router-dom";

const HomeFold = () => {
  let text = [
    "Unlocking Self-Growth",
    "Elevate Your Mind",
    "Fitness and Wellness",
    "Ignite Your Potential",
    "Discover Yourself",
    "Better Relationships",
  ];

  const navigate = useNavigate();

  return (
    <div className="flex w-[80%] flex-col md:flex-row items-center lg:justify-around  md:space-x-3 py-2 pl-3 pr-3 m-3">
      {/* Written section */}
      <div className="flex flex-col items-center justify-start p-1 space-y-2 md:space-y-5">
        <p className="text-2xl md:text-3xl lg:text-5xl text-white font-bold self-start text-left">
          Welcome to{" "}
        </p>
        <p
          className="text-4xl md:text-4xl lg:text-8xl text-[#ea580c]  self-start"
          style={{
            fontFamily: "'Kalam',cursive",
          }}
        >
          Silver Tongue
        </p>
        <p className="text-lg md:text-xl lg:text-3xl text-[#a9a2a2] font-bold leading-loose self-start">
          Uncover Stories, Insights, and Inspiration
        </p>

        <span className="text-2xl md:text-3xl lg:text-5xl text-[#ea580c] font-bold text-left transition-all self-start tracking-wide leading-relaxed">
          <TypeWriter text={text} />
        </span>

        <Subscribe />

        <div className="flex justify-between items-center  self-start text-[#cbd5e1] hover:text-[#ea580c] gap-1 cursor-pointer">
          <p
            className="text-xl   transition-all  font-bold text-center    tracking-wide leading-relaxed"
            onClick={() => navigate("/podcasts")}
          >
            Browse all episodes
          </p>
          <ArrowRightAltIcon className="text-xl   transition-all  font-bold text-center    tracking-wide leading-relaxed" />
        </div>
      </div>
      {/* image */}
      <div className="w-[90%] md:w-[auto] mt-5">
        <img
          className="object-contain rounded-lg"
          src="https://html.liviucerchez.com/bateria/tmp/sample-540x540-1.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default HomeFold;
