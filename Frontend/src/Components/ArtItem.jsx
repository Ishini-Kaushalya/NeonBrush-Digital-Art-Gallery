import React, { useContext } from "react";
import { assets } from "../assets/Common/assets";
import { StoreContext } from "../Context/StoreContext";

const ArtItem = ({ id, name, price, description, image, onClick }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  return (
    <div className='w-full mx-auto rounded-lg shadow-md transition-transform duration-200 hover:scale-102 bg-white'>
      <div className='relative group'>
        <img
          className='w-full h-[250px] object-cover rounded-t-lg transition-transform duration-200 group-hover:scale-105'
          src={image}
          alt={name}
          onClick={onClick} // Only trigger onClick when the image is clicked
        />
        {!cartItems[id] ? (
          <img
            className='w-10 absolute bottom-4 right-4 cursor-pointer rounded-full bg-white p-2 shadow-md group-hover:bg-gray-100'
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt='Add to cart'
          />
        ) : (
          <div className='absolute bottom-4 right-4 flex items-center gap-2 px-2 py-1 rounded-full bg-white shadow-md'>
            <img
              className='w-7 cursor-pointer'
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt='Remove from cart'
            />
            <p>{cartItems[id]}</p>
            <img
              className='w-7 cursor-pointer'
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt='Add more'
            />
          </div>
        )}
      </div>
      <div className='p-5'>
        <div className='flex justify-between items-center mb-2'>
          <p className='text-lg font-medium'>{name}</p>
          <img className='w-16' src={assets.rating_starts} alt='Rating stars' />
        </div>
        <p className='text-gray-600 text-sm truncate'>{description}</p>
        <p className='text-tomato text-xl font-semibold mt-2'>${price}</p>
      </div>
    </div>
  );
};

export default ArtItem;
