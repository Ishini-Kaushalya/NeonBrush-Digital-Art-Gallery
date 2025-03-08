import React from "react";

import { assets } from "../assets/Common/assets"; // Import assets

const AboutUs = () => {
  return (
    <>
      <div className="max-w-6xl mx-auto p-10 pt-20 bg-white rounded-lg flex flex-col md:flex-row items-center gap-10">
        {/* Left Side - Image */}
        <div className="w-full md:w-2/5 flex justify-end md:ml-auto">
          <img
            src={assets.image_SigninSelection2}
            alt="About Us"
            className="w-full max-w-4xl h-[500px] object-cover rounded-lg" // Increased width and height
          />
        </div>

        {/* Right Side - Content */}
        <div className="w-full md:w-4/5 text-center p-10">
          <h1 className="text-gray-900 font-bold text-3xl md:text-4xl mb-6">
            About Us
          </h1>
          <p className="text-gray-700 leading-relaxed mb-4">
            Welcome to NeonBrush, your gateway to a world of vibrant and
            captivating digital art. Our platform is dedicated to showcasing and
            celebrating the works of talented artists from around the globe.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            At NeonBrush, we believe that art has the power to inspire, evoke
            emotions, and transform spaces. Our mission is to make art
            accessible to everyone, allowing you to discover and collect
            original artworks that resonate with your unique style and
            personality.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Whether you're an art enthusiast looking to expand your collection
            or an artist seeking a platform to share your creations, NeonBrush
            offers a seamless and enjoyable experience. Our user-friendly
            interface and secure transaction process ensure that buying and
            selling art is as effortless as appreciating it.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Join us on this artistic journey and be part of a community that
            values creativity, innovation, and the beauty of self-expression.
            Explore our diverse collection today and let the art speak to you.
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
