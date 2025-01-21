import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArtItem from "../Components/ArtItem"; // Import the ArtItem component
import { art_list } from "../assets/Common/assets";

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(true);
  const category = location.state?.category || "All"; // Get category from state, default to "All"

  useEffect(() => {
    const fetchArts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/galleries");
        const data = await response.json();
        setArts(data);
      } catch (error) {
        console.error("Error fetching arts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

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
        {arts.map((art) => (
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
