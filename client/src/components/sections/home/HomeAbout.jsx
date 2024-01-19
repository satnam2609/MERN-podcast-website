import React from "react";
import { useTheme } from "@mui/material";

const HomeAbout = () => {
  const theme = useTheme();
  return (
    <div
      className="w-full lg:w-[80%] p-2 text-center text-3xl text-slate-50 flex flex-col justify-center  items-center mb-5 "
      style={{
        margin: "0 auto",
      }}
    >
      <div className="flex flex-col md:flex-row justify-center lg:justify-between lg:gap-10 items-center gap-y-3">
        <img
          className="rounded-xl object-contain lg:w-[70%]"
          src="http://advanture.icu/talkwave/wp-content/uploads/sites/26/2023/05/african-american-internet-show-host-interviewing-f-2022-08-19-21-25-32-utc-1-1024x576.jpg"
          alt=""
        />

        {/* text */}
        <div className="flex flex-col items-center self-start p-2 space-y-4 flex-1">
          <span className="flex space-x-3 leading-relaxed justify-around self-start">
            <p
              className="text-4xl lg:text-5xl 2xl:text-7xl font-bold"
              style={{
                color: theme.palette.secondary.main,
              }}
            >
              Meet
            </p>
            <p
              className="text-4xl lg:text-5xl 2xl:text-7xl font-bold"
              style={{
                color: theme.palette.primary.main,
              }}
            >
              Satnam
            </p>{" "}
          </span>
          <p className="text-xl text-[#cbd5e1] text-medium text-left ">
            Silver Tongue a.k.a. Satnam singh is an entrepreneur, YouTuber,
            Podcaster, and content creator. My life mantra is to explore the
            unexplored. But how did this journey start? From being an average
            engineering student to having around 12Million+ followers across 7
            YouTube channels and 3 successful start-ups. This is my journey.
          </p>

          <button className="rounded-xl py-2 pl-3 pr-3 bg-[#f1f5f9] self-start hover:bg-[#f97316] transition-all text-[#0f172a] hover:text-[#f1f5f9]">
            <p className="font-bold text-2xl  ">Know More</p>
          </button>

          <p className="text-xl self-start text-[#cbd5e1] font-bold">
            Follow me on
          </p>
          <div className="flex justify-around items-center  self-start gap-4">
            <i className="fa-brands fa-instagram text-3xl lg:text-4xl cursor-pointer"></i>
            <i class="fa-brands fa-twitter text-3xl lg:text-4xl cursor-pointer"></i>
            <i class="fa-brands fa-linkedin text-3xl lg:text-4xl cursor-pointer"></i>
            <i class="fa-brands fa-spotify text-3xl lg:text-4xl cursor-pointer"></i>
            <i class="fa-brands fa-youtube text-3xl lg:text-4xl cursor-pointer"></i>
          </div>
        </div>
      </div>
      <hr className="border-[#878282] mt-5  w-[100%]" />
    </div>
  );
};

export default HomeAbout;
