import React from "react";

const Podcast = ({ podcast }) => {
  return (
    <div className="w-full flex flex-col items-center h-full">
      <img
        src={podcast.image.url}
        alt={podcast.title}
        className="object-cover h-[45vh] w-[35vw] rounded-t-lg"
      />
      <div className="bg-orange-600 p-2 w-full rounded-b-lg">
        <p>{podcast.title}</p>
      </div>
    </div>
  );
};

export default Podcast;
