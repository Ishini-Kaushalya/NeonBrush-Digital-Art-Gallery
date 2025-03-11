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
      const token = JSON.parse(localStorage.getItem("accessToken"));

      // Check if the token is present
      if (!token) {
        // Redirect to login page if token is not present
        navigate("/sign-in");
        return;
      }

      try {
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
  }, [navigate]);

  const filteredArts =
    category === "All"
      ? artItems
      : artItems.filter((art) => art.category === category);

  const handleArtClick = (art) => {
    const formattedArt = {
      _id: art.artId, // Ensuring ArtDetail receives _id
      name: art.title,
      description: art.description,
      price: art.price,
      imageId: art.imageId,
      userName: art.userName,
      size: art.size,
    };

    navigate("/art-detail", { state: formattedArt });
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='w-16 h-16 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin'></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className='text-2xl font-bold text-center mt-20'>
        {category !== "All" && `${category} Artworks`}
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6'>
        {filteredArts.map((art) => (
          <ArtItem
            key={art.artId}
            id={art.artId}
            name={art.title}
            artistName={art.userName}
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
