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
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="h-[34vw] mx-auto mt-8 bg-cover bg-center relative  transition-background-image"
      style={{ backgroundImage: `url(${currentImage})` }}
    >
      <div className="absolute flex flex-col items-start gap-[1.5vw] bottom-0 left-0 w-1/2 h-full bg-[rgba(147,136,136,0.6)] backdrop-blur-lg p-[4vw] box-border slideInLeft">
        <h2 className="font-medium text-white text-[max(4.5vw,22px)]">
          Your Vision <br /> Our Canvas <br /> Explore Now
        </h2>
        <p className="text-black text-[1vw] hidden md:block fadeIn">
          Explore our curated collection of stunning artworks...
        </p>
      </div>
    </div>
  );
};

export default Header;
