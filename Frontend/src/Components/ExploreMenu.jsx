import React from "react";
import { menu_list } from "../assets/Common/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div
      className="flex flex-col gap-5 items-center mt-5 mb-[-90px]"
      id="explore-menu"
    >
      <h1 className="text-black font-medium text-lg">Explore our menu</h1>

      <p className="max-w-[60%] text-gray-500 md:max-w-full md:text-sm">
        Welcome to our digital art gallery, where creativity knows no bounds.
        Explore our curated exhibitions featuring a diverse array of
        contemporary artists, each showcasing their unique vision and style.
        Discover detailed artist profiles that delve into their backgrounds and
        inspirations, and browse our online shop to acquire stunning pieces that
        resonate with you. Our mission is to foster a vibrant community of art
        lovers and creators. Join us in celebrating the transformative power of
        art in the digital age!
      </p>

      <div className="flex justify-between items-center gap-7 text-center my-5 overflow-x-auto  scrollbar-hide">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              key={index}
              className="flex flex-col items-center cursor-pointer"
            >
              <img
                className={`w-[7.5vw] min-w-[80px] rounded-full transition-all duration-200 ${
                  category === item.menu_name
                    ? "border-4 border-gray-400 p-0.5"
                    : ""
                }`}
                src={item.menu_image}
                alt={item.menu_name}
              />
              <p className="mt-2 text-gray-500 text-[max(1.4vw,16px)]">
                {item.menu_name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExploreMenu;
