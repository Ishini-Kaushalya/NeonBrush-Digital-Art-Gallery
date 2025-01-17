import React, { useState, useEffect } from "react";
import { assets } from "../assets/Common/assets";

const SignInSelection = ({ setShowLogin }) => {
  const images = [
    assets.image_SigninSelection1,
    assets.image_SigninSelection2,
    assets.image_SigninSelection3,
  ];

  const [currentImage, setCurrentImage] = useState(images[0]);
  const [selectedRole, setSelectedRole] = useState("user");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prevIndex) => {
        const currentIndex = images.indexOf(prevIndex);
        return images[(currentIndex + 1) % images.length];
      });
    }, 10000);

    return () => clearInterval(intervalId);
  }, [images]);

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    setShowLogin(true);
  };

  return (
    <div className="flex min-h-screen">
      <div
        className="w-3/5 h-[70vh] bg-cover mt-10 bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${currentImage})` }}
      ></div>

      <div className="w-3/5 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <h2 className="text-4xl font-semibold mb-4">Welcome to NeonBrush</h2>
          <p className="text-lg text-gray-700 mb-6">
            NeonBrush is an exclusive online art gallery and e-commerce
            platform. We bring together stunning artworks from talented artists
            across the world, offering a unique collection of paintings,
            sculptures, and digital art.
          </p>
          <h4 className="text-xl font-semibold text-[#08090a] text-center mb-6">
            Select Account Type
          </h4>

          <div className="flex gap-4">
            <button
              onClick={() => handleRoleSelection("user")}
              className="w-1/2 py-3 bg-[#08090a] text-white text-lg rounded-full border border-none transition duration-300 hover:bg-transparent hover:text-black hover:border-black"
            >
              User
            </button>
            <button
              onClick={() => handleRoleSelection("artist")}
              className="w-1/2 py-3 bg-[#08090a] text-white text-lg rounded-full border border-none transition duration-300 hover:bg-transparent hover:text-black hover:border-black"
            >
              Artist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInSelection;
