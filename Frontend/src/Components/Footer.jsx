import React from "react";
import { assets } from "../assets/Common/assets";
import { Link } from "react-router-dom";

import { FaFacebook,FaTwitter, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <div
      className="text-gray-400 bg-gray-800 flex flex-col items-center gap-5 py-5 px-[8vw] mt-24"
      id="footer"
    >
      <div className="w-full grid grid-cols-1 md:grid-cols-[2fr,1fr,1fr] gap-20">
        {/* Left Content */}
        <div className="flex flex-col items-start gap-5">
          <img className="w-24 mb-2" src={assets.logo} alt="Logo" />
          <p>
            NeonBrush is a digital art gallery where you can browse, buy, and
            collect original artworks from talented artists around the world.
            Our platform makes it easy to find and purchase art that resonates
            with you, and to support the artists who create it.
          </p>
          <div className="flex space-x-4">
            {/* Social Media Links */}
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="w-10 h-10" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="w-10 h-10" />
            </a>
            <a
              href="https://wa.me/+947744567890"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp className="w-10 h-10" />
            </a>
          </div>
        </div>

        {/* Center Content */}
        <div className="flex flex-col items-start gap-5">
          <h2 className="text-white">Company</h2>
          <ul className="space-y-2">
            <li className="cursor-pointer">
              <Link to="/">Home</Link>
            </li>
            <li className="cursor-pointer">
              <Link to="/aboutUs">About Us</Link>
            </li>
            {/* <li className="cursor-pointer">Delivery</li> */}
            <li className="cursor-pointer">
              <Link to="/privacyPolicy">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        {/* Right Content */}
        <div className="flex flex-col items-start gap-5">
          <h2 className="text-white">GET IN TOUCH</h2>
          <ul className="space-y-2">
            <li>+94-774-456-7890</li>
            <li>contact@neonbrush.com</li>
          </ul>
        </div>
      </div>
      <hr className="w-full h-px bg-gray-500 my-5 border-none" />
      <p className="text-center">
        Copyright © 2024 NeonBrush. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
