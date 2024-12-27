import React from "react";
import { menu_list } from "../assets/Common/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div
      className='flex flex-col text-center gap-6 mt-5 mb-[-70px] px-5'
      id='explore-menu'
    >
      <h1 className='text-black font-bold text-[max(2vw,22px)]'>
        Explore our menu
      </h1>
      <p className='max-w-[90%] text-center text-gray-600 leading-[1.8] text-[max(1vw,16px)] md:max-w-full'>
        Welcome to our digital art gallery...
      </p>

      <div className='flex justify-center items-center gap-5 text-center my-5 overflow-x-auto scrollbar-hide'>
        {menu_list.map((item, index) => (
          <div
            onClick={() => setCategory(item.menu_name)} // Set the category here
            key={index}
            className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
              category === item.menu_name ? "opacity-100" : "opacity-80"
            }`}
          >
            <img
              className={`w-[8vw] min-w-[80px] rounded-full shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 ${
                category === item.menu_name
                  ? "border-4 border-blue-400 p-2"
                  : "border border-gray-300"
              }`}
              src={item.menu_image}
              alt={item.menu_name}
            />
            <p
              className={`mt-2 text-[max(0.8vw,14px)] ${
                category === item.menu_name ? "text-blue-600" : "text-gray-500"
              }`}
            >
              {item.menu_name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreMenu;
