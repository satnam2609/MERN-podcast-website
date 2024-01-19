import React, { useEffect, useState } from "react";
import videoSource from "../assets/video.mp4";
import Navbar from "../components/nav/Navbar";
import HomeFold from "../components/sections/home/HomeFold";
import Awards from "../components/carousel/Awards";
import HomeAbout from "../components/sections/home/HomeAbout";

import GetStory from "../components/sections/home/getStory";
import CarouselonHome from "../components/carousel/_onHome";
import Footer from "../components/nav/Footer";

const Home = () => {
  return (
    <div
      className="  h-screen "
      style={{
        margin: "0 auto",
      }}
    >
      <video
        src={videoSource}
        autoPlay
        loop
        muted
        className="w-[100%] h-[90%] object-cover "
      ></video>
      <div className="absolute top-0 left-0 w-[100%] h-[90%] bg-[rgba(0,0,0,0.53)]" />
      {/* bg-[rgba(0,0,0,0.5)] */}
      <div
        className="
        absolute w-[100%] h-[100%] top-0 flex flex-col justify-start items-center gap-3 self-center"
      >
        {/* Navbar */}
        <Navbar />
        <HomeFold />
      </div>
      <div className="text-slate-50 text-5xl font-medium text-center p-2 w-full">
        <Awards />
      </div>

      <HomeAbout />

      <CarouselonHome />

      <div className="flex flex-col content-center w-full">
        <GetStory />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
