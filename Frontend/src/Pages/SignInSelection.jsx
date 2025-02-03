import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/Common/assets';

const SignInSelection = ({ setShowLogin, setLoginType }) => {
  
  
  const navigate = useNavigate();
  

  // Array of images to rotate
  const images = [
    assets.image_SigninSelection1,
    assets.image_SigninSelection2,
    assets.image_SigninSelection3
  ];

  // State to hold the current image index
  const [currentImage, setCurrentImage] = useState(images[0]);

  // Set up the timer to change the image every 10 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prevIndex) => {
        const currentIndex = images.indexOf(prevIndex);
        return images[(currentIndex + 1) % images.length];
      });
    }, 10000);

    return () => clearInterval(intervalId);
  }, [images]);

  const handleUserClick = () => {
    setLoginType('user');
    setShowLogin(true);
  };

  const handleArtistClick = () => {
    setLoginType('artist');
    setShowLogin(true);
  };

  const handleAdminClick = () => {
    setLoginType('admin');
    setShowLogin(true);
  };



  return (
    <div className="flex min-h-screen mt-10">
      {/* Left Side: Image */}
      <div
        className="w-3/5 h-[89vh] bg-cover mt-10 bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${currentImage})` }}
      />

      {/* Right Side: Buttons */}
      <div className=" h-[90vh] w-3/5 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <h2 className="text-4xl font-semibold mb-4">Welcome to NeonBrush</h2>
          <p className="text-lg text-gray-700 mb-6">
            NeonBrush is an exclusive online art gallery and e-commerce platform. 
            We bring together stunning artworks from talented artists across the world, 
            offering a unique collection of paintings, sculptures, and digital art. 
            Whether you’re an art enthusiast or a collector, you’ll find something that speaks to you.
          </p>

          <h4 className="text-xl font-semibold text-[#08090a] text-center mb-6">
            Select Account Type
          </h4>

          <div className="flex flex-col gap-4">
            <button
              onClick={handleUserClick}
              className="px-6 py-2 rounded-full bg-sky-900 text-white hover:bg-sky-950 transition duration-300"
            >
              User
            </button>
            <button
              onClick={handleArtistClick}
              className="px-6 py-2 rounded-full bg-sky-700 text-white hover:bg-sky-950 transition duration-300"
            >
              Artist
            </button>
            <button
              onClick={handleAdminClick}
              className="px-6 py-2 rounded-full bg-sky-600 text-white hover:bg-sky-800 transition duration-300"
            >
              Admin
            </button>
          </div>
        </div>
      </div>

    
    </div>
  );
};

export default SignInSelection;
