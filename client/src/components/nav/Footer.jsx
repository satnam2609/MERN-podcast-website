import React from "react";

const Footer = () => {
  return (
    <div className=" p-5 flex flex-col items-center justify-center w-full  ">
      <div className="flex justify-between items-center w-full px-10 py-5">
        <div className="space-y-5">
          <p className="text-4xl font-bold text-orange-600">Logo</p>
          <p className="text-slate-300  w-[50%]">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam,
            nihil. Ab, fugiat quibusdam!
          </p>
        </div>

        <div className="space-y-5">
          <p className="text-3xl font-bold text-orange-600">Navigations</p>
          <ul className="flex flex-col items-center space-y-3">
            <li className="text-xl font-medium text-[#eeeeee]">Podcasts</li>
            <li className="text-xl font-medium text-[#eeeeee]">Blogs</li>
            <li className="text-xl font-medium text-[#eeeeee]">Articles</li>
          </ul>
        </div>

        <div className="space-y-5">
          <p className="text-4xl font-bold text-orange-600">Company</p>
          <ul className="flex flex-col items-center space-y-3">
            <li className="text-xl font-medium text-[#eeeeee]">About</li>
            <li className="text-xl font-medium text-[#eeeeee]">Contact</li>
            <li className="text-xl font-medium text-[#eeeeee]">Articles</li>
          </ul>
        </div>

        <div className="space-y-5">
          <p className="text-4xl font-bold text-orange-600">Contact</p>
          <ul className="flex flex-col items-center space-y-8">
            <li className="text-xl font-medium text-[#eeeeee]">+12094728764</li>
            <li className="text-xl font-medium text-[#eeeeee]">
              info@podpgt.com
            </li>
          </ul>
        </div>
      </div>
      <hr className="border-[#878282] mt-5  w-[80%]" />
      <div className="w-full flex justify-around items-center">
        <div className="text-white mt-4 space-x-3">
          <i className="fa-brands fa-instagram text-3xl lg:text-4xl cursor-pointer bg-[#ff3d00] rounded-full p-3 "></i>
          <i class="fa-brands fa-twitter text-3xl lg:text-4xl cursor-pointer bg-[#ff3d00] rounded-full p-3"></i>
          <i class="fa-brands fa-linkedin text-3xl lg:text-4xl cursor-pointer bg-[#ff3d00] rounded-full p-3"></i>
          <i class="fa-brands fa-spotify text-3xl lg:text-4xl cursor-pointer bg-[#ff3d00] rounded-full p-3"></i>
          <i class="fa-brands fa-youtube text-3xl lg:text-4xl cursor-pointer bg-[#ff3d00] rounded-full p-3"></i>
        </div>
        <p className="p-3 font-mono text-slate-300">
          &copy;2021 All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
