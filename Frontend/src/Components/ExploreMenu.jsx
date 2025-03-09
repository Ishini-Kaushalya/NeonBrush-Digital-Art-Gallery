import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { menu_list } from "../assets/Common/assets";

const ExploreMenu = ({ category, setCategory }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleCategoryClick = (categoryName) => {
    setCategory(categoryName); // Update the selected category
    navigate(`/category/${categoryName}`); // Navigate to the category page
  };

  return (
    <div
      className="flex flex-col text-center gap-6 mt-5 mb-[-70px] px-5"
      id="explore-menu"
    >
      <h1 className="text-black font-bold text-[max(2vw,22px)]">
        The Art Discovery Zone
      </h1>
      <p className="max-w-[90%] text-center text-gray-600 leading-[1.8] text-[max(1vw,16px)] md:max-w-full">
        Unleash your creativity and immerse yourself in our vibrant collection
        of digital arts. From stunning illustrations and captivating animations
        to innovative graphic designs and interactive installations, our curated
        selection showcases the limitless possibilities of digital expression.
        Whether you're an artist seeking inspiration or an enthusiast eager to
        discover new talent, our platform invites you to explore, engage, and
        experience the dynamic intersection of technology and creativity. Join
        us on this artistic journey and let your imagination soar!
      </p>

      <div className="flex justify-center items-center gap-5 text-center my-5 overflow-x-auto scrollbar-hide">
        {menu_list.map((item, index) => (
          <div
            onClick={() => handleCategoryClick(item.menu_name)} // Navigate on click
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
