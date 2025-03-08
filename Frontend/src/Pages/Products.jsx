import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArtItem from "../Components/ArtItem";
import axios from "axios";

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const category = location.state?.category || "All";
  const [artItems, setArtItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtItems = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("accessToken"));
        const response = await axios.get("http://localhost:8080/api/gallery", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setArtItems(response.data);
      } catch (error) {
        console.error("Error fetching art items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtItems();
  }, []);

  const filteredArts =
    category === "All"
      ? artItems
      : artItems.filter((art) => art.category === category);

  const handleArtClick = (art) => {
    navigate(`/art-detail`, { state: art });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mt-4">
        {category} Artworks
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {filteredArts.map((art) => (
          <ArtItem
            key={art.artId}
            id={art.artId}
            name={art.title}
            price={art.price}
            description={art.description}
            imageId={art.imageId}
            onClick={() => handleArtClick(art)}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
