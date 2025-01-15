import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { artists, assets } from "../assets/Common/assets"; // Ensure this path is correct

const ArtistDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find artist by name (or adjust as needed based on your routing)
  const artist = artists.find((artist) => artist.name === id);

  if (!artist) {
    return <div>Artist not found!</div>;
  }

  return (
    <div className="artist-detail container mx-auto mt-16 p-4 ">
      {/* Back Button */}
      <button
        className="bg-black text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 mb-4"
        onClick={() => navigate(-1)}
      >
        Back
      </button>

      {/* Content Area */}
      <div
        className="relative flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8 bg-cover bg-center p-8 rounded-lg"
        style={{
          backgroundImage: `url(${assets.artist_bg1})`, // Using bg_1 from assets.js
        }}
      >
        {/* Transparent Overlay for background */}
        <div className="absolute inset-0 bg-black opacity-70 backdrop-blur-10 rounded-lg"></div> {/* Adjust opacity for transparency */}

        {/* Left Side: Artist Image */}
        <div className="relative z-10">
          <img
            src={artist.image}
            alt={artist.name}
            className="w-[300px] h-[300px] object-cover rounded-lg shadow-lg border-8 border-white"
          />
          <h2 className="text-3xl font-semibold mt-4 text-center text-white">{artist.name}</h2>
        </div>

        {/* Right Side: Artist Details */}
        <div className="relative z-10 space-y-4 bg-opacity-90 p-6 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-white">About the Artist</h1>
          <p className="text-lg text-white">{artist.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ArtistDetail;
