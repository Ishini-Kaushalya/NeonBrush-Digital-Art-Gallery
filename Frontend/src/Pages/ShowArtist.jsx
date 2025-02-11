// ShowArtist.jsx
import React from "react";
import { Link } from "react-router-dom";
import { artists } from "../assets/Common/assets"; // Assuming assets.js is in the same directory

const ShowArtist = () => {
  return (
    <div className="p-6">
      {/* Introductory Message */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center mt-16">
        See Your Favorite Artists
      </h2>
      
      {/* Artist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {artists.map((artist) => (
          <Link 
            key={artist._id} 
            to={`/artist-profile/${artist._id}`} 
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <img
                src={artist.image}
                alt={artist.name}
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">{artist.name}</h3>
              <p className="text-gray-600 mt-2">{artist.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ShowArtist;
