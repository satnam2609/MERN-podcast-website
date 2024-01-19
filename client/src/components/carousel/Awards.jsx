import React from "react";
import "../../mediaCarousel.css";
let imageUrls = [
  "https://beerbiceps.com/wp-content/uploads/2023/03/Under30Logo-NorthAmerica2021-Black-1-3-1.png",

  "https://beerbiceps.com/wp-content/uploads/2023/03/The_Indian_Express_logo-1-1.png",
  "https://beerbiceps.com/wp-content/uploads/2023/03/Exclude-1.png",

  "https://beerbiceps.com/wp-content/uploads/2023/03/Fortune_magazine_logo_2016-1-1.png",
  "https://beerbiceps.com/wp-content/uploads/2023/03/Group-31-1.png",
  "https://beerbiceps.com/wp-content/uploads/2023/03/Group-95-1.png",
  "https://beerbiceps.com/wp-content/uploads/2023/03/Layer_2-1.png",
];

const Awards = () => {
  return (
    <div className="flex flex-col w-full bg-[#121212] ">
      <div className="slider">
        <p className="text-slate-50 font-bold    text-5xl mt-4">
          Media & Awards
        </p>
        <div className="slide-track">
          {imageUrls.map((image) => {
            return <img className="slide" src={image} />;
          })}
          {imageUrls.map((image) => {
            return <img className="slide" src={image} />;
          })}
        </div>
      </div>
      <button className="rounded-lg bg-[#ea580c] self-center py-2 pl-3 pr-3 font-medium text-2xl text-slate-50 mt-1 mb-2">
        View all
      </button>
    </div>
  );
};

export default Awards;
