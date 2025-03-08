import React from "react";
import { useParams } from "react-router-dom";
import { artist_arts } from "../assets/Common/assets";

const ArtistArts = () => {
  const { id } = useParams(); // Get artist ID from URL

  // Filter artworks for the selected artist
  const filteredArts = artist_arts.filter((art) => art.artist_id === id);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Artworks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredArts.length > 0 ? (
          filteredArts.map((art) => (
            <div key={art._id} className="p-4 bg-white shadow-lg rounded-lg">
              <img
                src={art.image}
                alt={art.name}
                className="w-full h-60 object-cover rounded-lg"
              />
              <h3 className="mt-2 text-lg font-semibold">{art.name}</h3>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No artworks available for this artist.</p>
        )}
      </div>
    </div>
  );
};

export default ArtistArts;
