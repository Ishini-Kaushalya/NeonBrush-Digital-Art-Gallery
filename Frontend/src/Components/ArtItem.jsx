import React, { useContext } from "react";
import { assets } from "../assets/Common/assets";

const ArtItem = ({ id, name, price, description, image, onClick }) => {
 
  return (
    <div className='w-full mx-auto rounded-lg shadow-md transition-transform duration-200 hover:scale-102 bg-white'>
      <div className='relative group'>
        <img
          className='w-full h-[250px] object-cover rounded-t-lg transition-transform duration-200 group-hover:scale-105'
          src={image}
          alt={name}
          onClick={onClick} // Only trigger onClick when the image is clicked
        />
      </div>
      <div className='p-5'>
        <div className='flex justify-between items-center mb-2'>
          <p className='text-lg font-medium'>{name}</p>
          {/* <img className='w-16' src={assets.rating_starts} alt='Rating stars' /> */}
        </div>
        <p className='text-gray-600 text-sm truncate'>{description}</p>
        <p className='text-tomato text-xl font-semibold mt-2'>Rs.{price}</p>
      </div>
    </div>
  );
};

export default ArtItem;
