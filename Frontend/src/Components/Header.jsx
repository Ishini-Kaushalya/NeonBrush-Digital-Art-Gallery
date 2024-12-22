import React, { useEffect, useState } from "react";
import { assets } from "../assets/Common/assets.js";

const Header = () => {
  const [currentImage, setCurrentImage] = useState(assets.bg_1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => {
        if (prevImage === assets.bg_1) return assets.bg_2;
        if (prevImage === assets.bg_2) return assets.bg_3;
        return assets.bg_1;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="h-[34vw] mx-auto mt-8 bg-cover bg-center relative transition-all duration-1000"
      style={{ backgroundImage: `url(${currentImage})` }}
    >
      <div className="absolute flex flex-col items-center gap-[3vw] bottom-0 left-0 w-full md:w-2/3 lg:w-1/2 h-full bg-[rgba(0,0,0,0.6)] backdrop-blur-md p-[5vw] box-border slideInLeft">
        <h2 className="font-bold text-white border-l-8 border-white text-[max(4.5vw,22px)] pl-6 leading-tight shadow-lg">
          Your Vision <br /> Our Canvas <br /> Explore Now
        </h2>
        <p className="text-white text-[clamp(10px, 1.2vw, 16px)] hidden md:block leading-[1.6] fadeIn drop-shadow-md">
        Discover curated collections of stunning artwork, crafted to inspire
        and transform your spaces into a masterpiece.
        </p>
      </div>
    </div>
  );
};

export default Header;
