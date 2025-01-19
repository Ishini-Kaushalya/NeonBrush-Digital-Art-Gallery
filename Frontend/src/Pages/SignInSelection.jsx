import React, { useState, useEffect } from "react";
import { assets } from "../assets/Common/assets"; // Assuming you have an image in assets

const SignInSelection = ({ setShowLogin, setLoginType }) => {
  // Array of images to rotate
  const images = [
    assets.image_SigninSelection1, // Replace with your actual image paths
    assets.image_SigninSelection2,
    assets.image_SigninSelection3,
  ];

  // State to hold the current image index
  const [currentImage, setCurrentImage] = useState(images[0]);

  // Set up the timer to change the image every 10 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prevIndex) => {
        const currentIndex = images.indexOf(prevIndex);
        return images[(currentIndex + 1) % images.length]; // Loop through the images
      });
    }, 10000); // 10000 milliseconds = 10 seconds

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [images]);

  const handleUserClick = () => {
    setLoginType('user');
    setShowLogin(true); // Trigger login popup
  };

  const handleArtistClick = () => {
    setLoginType('artist');
    setShowLogin(true); // Trigger login popup
  };

  return (
    <div className='flex min-h-screen'>
      {/* Left Side: Image */}
      <div
        className='w-3/5 h-[70vh] bg-cover mt-10 bg-center flex items-center justify-center'
        style={{ backgroundImage: `url(${currentImage})` }}
      >
        {/* Add any additional content here */}
      </div>

      {/* Right Side: Buttons */}
      <div className='w-3/5 flex items-center justify-center p-4'>
        <div className='bg-white rounded-lg shadow-lg p-6 w-full max-w-md'>
          <h2 className='text-4xl font-semibold mb-4'>Welcome to NeonBrush</h2>
          <p className='text-lg text-gray-700 mb-6'>
            NeonBrush is an exclusive online art gallery and e-commerce
            platform. We bring together stunning artworks from talented artists
            across the world, offering a unique collection of paintings,
            sculptures, and digital art. Whether you’re an art enthusiast or a
            collector, you’ll find something that speaks to you.
          </p>

          <h4 className='text-xl font-semibold text-[#08090a] text-center mb-6'>
            Select Account Type
          </h4>

          <div className='flex gap-4'>
            <button
              onClick={handleUserClick}
              className='w-1/2 py-3 bg-[#08090a] text-white text-lg rounded-full border border-none transition duration-300 hover:bg-transparent hover:text-black hover:border-black'
            >
              User
            </button>
            <button
              onClick={handleArtistClick}
              className='w-1/2 py-3 bg-[#08090a] text-white text-lg rounded-full border border-none transition duration-300 hover:bg-transparent hover:text-black hover:border-black'
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
