import React from "react";

const GetStory = () => {
  return (
    <div
      className="block w-full mt-5 h-[80vh] relative"
      style={{
        backgroundColor: "#c2410c",
      }}
    >
      <div
        className="absolute top-0 left-0 h-[100%] w-[100%]"
        style={{
          backgroundColor: "#000000",
          backgroundImage: `url(http://advanture.icu/talkwave/wp-content/uploads/sites/26/2023/05/unsplash_3JZFQcOe78w.jpg)`,
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          margin: "0 auto",
          opacity: 1,
          mixBlendMode: "multiply",
        }}
      />

      <section className="flex flex-col lg:flex-row lg:justify-around lg:gap-11 items-center space-y-8 relative p-5 mt-5">
        <div
          className="flex flex-col items-center space-y-5 justify-center  "
          style={{
            margin: "0 auto",
          }}
        >
          <p className="text-xl text-[#cbd5e1] font-medium self-center">
            How are you
          </p>
          <p className="text-4xl lg:md:text-5xl text-[#fff7ed] font-bold  ">
            Inspiring others
          </p>

          <i class="fa-solid fa-circle-play text-8xl text-[#cbd5e1] cursor-pointer hover:text-[#facc15] transition-all"></i>
        </div>

        <div className="flex flex-col items-center justify-center space-y-4 self-start lg:w-[65%]">
          <p className="text-4xl lg:text-5xl text-[#fff7ed] font-bold  self-center lg:self-start text-center lg:text-left">
            Wanna Share Your Own Story To Inspire Thousands?
          </p>

          <div className="flex flex-col items-center justify-center self-center lg:self-start space-y-5">
            <div className="flex justify-between items-center self-start space-x-1">
              <i class="fa-solid fa-circle-check text-[#facc15] text-2xl"></i>
              <p className="text-2xl font-bold text-[#fff7ed]">
                Email us your iconic story
              </p>
            </div>

            <div className="flex justify-between items-center self-start space-x-1">
              <i class="fa-solid fa-circle-check text-[#facc15] text-2xl  "></i>
              <p className="text-2xl font-bold text-[#fff7ed]">
                Get reviewed by our team
              </p>
            </div>

            <div className="flex justify-between items-center self-start space-x-1">
              <i class="fa-solid fa-circle-check text-[#facc15] text-2xl"></i>
              <p className="text-2xl font-bold text-[#fff7ed]">
                Come to our studio to shoot podcast
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row  items-center justify-center  gap-2 lg:space-x-8 w-full lg:w-[65%] self-center lg:self-start">
            <button className="w-[90%] rounded-lg bg-[#facc15] text-[#1a1918] py-5 pl-6 pr-6 hover:bg-[#0f172a] hover:text-[#f8fafc] transition-all">
              Submit story
            </button>

            <button className="w-[90%] rounded-lg bg-[#f8fafc] text-[#1a1918] py-5 pl-6 pr-6 hover:bg-[#0f172a] hover:text-[#f8fafc] transition-all">
              Learn more
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetStory;
