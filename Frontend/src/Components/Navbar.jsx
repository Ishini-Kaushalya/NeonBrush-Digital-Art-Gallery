import React, {useContext, useState } from "react";
import { assets } from "../assets/Common/assets.js";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { StoreContext } from '../Context/StoreContext.jsx';
import { TbBasketFilled } from "react-icons/tb";

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const  {getTotalCartAmount} =useContext(StoreContext)

  return (
    <div className='flex justify-between items-center px-24 py-5 mb-[-40px]'>
      <Link to='/'>
        <img src={assets.logo} alt='' className='w-[80px]' />
      </Link>
      <ul className='flex gap-12 text-[#49557e] text-lg'>
        <Link
          to='/'
          onClick={() => setMenu("home")}
          className={`cursor-pointer ${
            menu === "home" ? "border-b-2 pb-1 border-[#49557e]" : ""
          }`}
        >
          Home
        </Link>
        <Link
          to='/products'
          onClick={() => setMenu("menu")}
          className={`cursor-pointer ${
            menu === "menu" ? "border-b-2 pb-1 border-[#49557e]" : ""
          }`}
        >
          All Arts
        </Link>
        <Link
          to='/contact-us'
          onClick={() => setMenu("contact-us")}
          className={`cursor-pointer ${
            menu === "contact-us" ? "border-b-2 pb-1 border-[#49557e]" : ""
          }`}
        >
          Contact us
        </Link>
      </ul>
      <div className='flex items-center gap-10'>
        {/* <img src={assets.search_icon} alt='' /> */}
        <div className='relative'>
        <Link to="/cart" className="cursor-pointer">
          <TbBasketFilled className="w-[30px] h-[30px] text-gray-700" />
          </Link>
          <div className= {getTotalCartAmount()===0 ?"":"absolute top-[-8px] right-[-8px] w-[10px] h-[10px] bg-[#38bdf8] rounded-full"} ></div>
        </div>
        <Link to='/sign-in'>
          <button className='bg-transparent text-[#49557e] text-base border-2 border-tomato rounded-full py-2 px-7 cursor-pointer transition duration-300 ease-in-out hover:bg-[#f0f9ff] hover:border-[#49557e]'>
            Sign in
          </button>
        </Link>
           {/* User Icon - Artist Profile Link */}
        <Link to="/artist-profile" className="cursor-pointer">
           <FaUserCircle className="w-[30px] h-[30px] text-gray-700" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
