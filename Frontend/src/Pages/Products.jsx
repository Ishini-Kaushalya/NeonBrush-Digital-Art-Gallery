import React from "react";
import { useLocation } from "react-router-dom";
import ArtItem from "../Components/ArtItem"; 
import { art_list } from "../assets/Common/assets";

const Products = () => {
  const location = useLocation();
  const category = location.state?.category || "All"; // Get category from state, default to "All"

  const filteredArts =
    category === "All"
      ? art_list
      : art_list.filter((art) => art.category === category);

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mt-4">
        {category} Artworks
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {filteredArts.map((art) => (
          <ArtItem
            key={art._id}
            id={art._id}
            name={art.name}
            price={art.price}
            description={art.description}
            image={art.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;