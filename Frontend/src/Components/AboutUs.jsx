import React from "react";
import Header from "../Components/Header";

const AboutUs = () => {
  return (
    <>
      <Header />
      <div className="about-us-container">
        <h1 className="text-black font-bold text-[max(2vw,22px)]">
          About Us
        </h1>
        <p className="mb-4">
          Welcome to NeonBrush, your gateway to a world of vibrant and
          captivating digital art. Our platform is dedicated to showcasing and
          celebrating the works of talented artists from around the globe.
        </p>
        <p className="mb-4">
          At NeonBrush, we believe that art has the power to inspire, evoke
          emotions, and transform spaces. Our mission is to make art accessible
          to everyone, allowing you to discover and collect original artworks
          that resonate with your unique style and personality.
        </p>
        <p className="mb-4">
          Whether you're an art enthusiast looking to expand your collection or
          an artist seeking a platform to share your creations, NeonBrush offers
          a seamless and enjoyable experience. Our user-friendly interface and
          secure transaction process ensure that buying and selling art is as
          effortless as appreciating it.
        </p>
        <p className="mb-4">
          Join us on this artistic journey and be part of a community that
          values creativity, innovation, and the beauty of self-expression.
          Explore our diverse collection today and let the art speak to you.
        </p>
      </div>
    </>
  );
};

export default AboutUs;
