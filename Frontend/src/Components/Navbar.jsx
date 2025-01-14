import React, { useState } from "react";
import { assets } from "../assets/Common/assets.js";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menu, setMenu] = useState("home");

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
          Arts
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
        <img src={assets.search_icon} alt='' />
        <div className='relative'>
          <Link to='/cart'>
            <img src={assets.basket_icon} alt='' />
          </Link>
          <div className='absolute top-[-8px] right-[-8px] w-[10px] h-[10px] bg-[#47ffff] rounded-full'></div>
        </div>
        <Link to='/sign-in'>
          <button className='bg-transparent text-[#49557e] text-base border-2 border-tomato rounded-full py-2 px-7 cursor-pointer transition duration-300 ease-in-out hover:bg-[#fff4f2] hover:border-[#49557e]'>
            Sign in
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
