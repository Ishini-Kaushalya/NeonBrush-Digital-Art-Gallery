import React, {useContext, useState,useEffect } from "react";
import { assets } from "../assets/Common/assets.js";
import { Link,useLocation} from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { StoreContext } from '../Context/StoreContext.jsx';
import { TbBasketFilled } from "react-icons/tb";

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const  {getTotalCartAmount} =useContext(StoreContext);
  
  const location = useLocation();
 
   // Update menu state based on the current location (URL)
   useEffect(() => {
    if (location.pathname === '/') {
      setMenu('home');
    } else if (location.pathname === '/products') {
      setMenu('arts');
    } else if (location.pathname === '/contact-us') {
      setMenu('contact-us');
    } else if (location.pathname === '/cart') {
      setMenu('cart');
    } else if (location.pathname === '/sign-in') {
      setMenu('sign-in');
    } else if (location.pathname === '/artist-profile') {
      setMenu('artist-profile');
    }
  }, [location.pathname]);

  return (
    <div className='flex justify-between items-center px-24 py-5 mb-[-40px]'>
      <Link to='/'>
        <img src={assets.logo} alt='Logo' className='w-[80px]' />
      </Link>
      <ul className='flex gap-12 text-[#49557e] text-lg'>
        <Link
          to='/'
          onClick={() => setMenu("home")}
          className={`cursor-pointer ${
            menu === "home" ? "border-b-2 pb-1 border-sky-600" : ""
          }`}
        >
          Home
        </Link>
        <Link
          to='/products'
          onClick={() => setMenu("menu")}
          className={`cursor-pointer ${
            menu === "arts" ? "border-b-2 pb-1 border-sky-600" : ""
          }`}
        >
          All Arts
        </Link>
        <Link
          to='/contact-us'
          onClick={() => setMenu("contact-us")}
          className={`cursor-pointer ${
            menu === "contact-us" ? "border-b-2 pb-1 border-sky-600" : ""
          }`}
        >
          Contact us
        </Link>
        
      </ul>

      <div className='flex items-center gap-10'>
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
