import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArtItem from "../Components/ArtItem"; // Import the ArtItem component
import { art_list } from "../assets/Common/assets";

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const category = location.state?.category || "All"; // Get category from state, default to "All"

  const filteredArts =
    category === "All"
      ? art_list
      : art_list.filter((art) => art.category === category);

  const handleArtClick = (art) => {
    navigate(`/art-detail`, { state: art }); // Navigate to ArtDetail page with art details
  };

  return (
    <div>
      <h1 className='text-2xl font-bold text-center mt-4'>
        {category} Artworks
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6'>
        {filteredArts.map((art) => (
          <ArtItem
            key={art._id}
            id={art._id}
            name={art.name}
            price={art.price}
            description={art.description}
            image={art.image}
            onClick={() => handleArtClick(art)} // Pass the onClick handler to ArtItem
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
