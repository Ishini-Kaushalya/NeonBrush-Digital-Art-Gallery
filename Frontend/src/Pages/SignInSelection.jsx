import React, { useState, useEffect } from "react";
import { assets } from "../assets/Common/assets"; // Assuming you have an image in assets
import { useNavigate } from 'react-router-dom';


const SignInSelection = ({ setShowLogin, setLoginType }) => {

  const navigate = useNavigate();
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [password, setPassword] = useState("");
  
  const validPasswords = ["121212", "121212", "121212"];

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

  const handleAdminClick = () => {
    setShowPasswordPrompt(true);
  };

  const handlePasswordSubmit = () => {
    if (validPasswords.includes(password)) {
      localStorage.setItem("isAdminAuthenticated", "true"); // Store login status
      navigate("/admin");
    } else {
      alert("Incorrect password!");
      setPassword("");
    }
  };

  return (
    <div className='flex min-h-screen '>
      {/* Left Side: Image */}
      <div
        className='w-3/5 h-[85vh] bg-cover mt-10 bg-center flex items-center justify-center'
        style={{ backgroundImage: `url(${currentImage})` }}
      >
        {/* Add any additional content here */}
      </div>

      {/* Right Side: Buttons */}
      <div className='w-3/5 flex h-[90vh] items-center justify-center p-4'>
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

          <div className='flex flex-col gap-4'>
            <button
              onClick={handleUserClick}
              className='px-6 py-2 rounded-full bg-sky-900 text-white hover:bg-sky-950 transition duration-300'
            >
              User
            </button>
            <button
              onClick={handleArtistClick}
              className='px-6 py-2 rounded-full bg-sky-700 text-white hover:bg-sky-800 transition duration-300'
            >
              Artist
            </button>
            <button
              onClick={handleAdminClick}
              className="px-6 py-2 rounded-full bg-sky-600 text-white hover:bg-sky-700 transition duration-300"
            >
              Admin
            </button>
          </div>
        </div>
      </div>

      {showPasswordPrompt && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-[350px]">
            <h2 className="text-lg font-bold mb-4">Enter Admin Password</h2>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded w-full mb-4"
              placeholder="Enter password"
            />
           <div className="flex justify-center">
            <button
              onClick={handlePasswordSubmit}
              className="px-6 py-2 rounded-full  bg-sky-600 text-white hover:bg-blue-700 transition duration-300"
            >
              Submit
            </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignInSelection;
