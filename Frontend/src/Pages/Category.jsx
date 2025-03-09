import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Category = () => {
  const { categoryName } = useParams(); // Get the category name from the URL
  const [artworks, setArtworks] = useState([]); // State to store artworks
  const [imageUrls, setImageUrls] = useState({}); // State to store image URLs
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("accessToken"));

        // Fetch artworks for the selected category
        const response = await axios.get(
          `http://localhost:8080/api/gallery/category/${categoryName}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setArtworks(response.data);
        setLoading(false);

        const urls = {};
        for (const artwork of response.data) {
          if (artwork.imageId) {
            try {
              const imageResponse = await axios.get(
                `http://localhost:8080/api/gallery/image/${artwork.imageId}`,
                {
                  responseType: "blob",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              const imageUrl = URL.createObjectURL(imageResponse.data);
              urls[artwork.artId] = imageUrl;
            } catch (error) {
              console.error(
                "Error fetching image for artwork ID:",
                artwork.artId,
                "with image ID:",
                artwork.imageId,
                error
              );
            }
          }
        }
        setImageUrls(urls);
      } catch (error) {
        console.error("Error fetching artworks:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchArtworks();
  }, [categoryName]);

  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-5 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">{categoryName} Artworks</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {artworks.length > 0 ? (
          artworks.map((artwork) => (
            <div
              key={artwork.artId}
              onClick={() =>
                navigate("/art-detail", {
                  state: {
                    _id: artwork.artId,
                    name: artwork.title,
                    description: artwork.description,
                    price: artwork.price,
                    imageId: artwork.imageId,
                    userName: artwork.userName,
                    size: artwork.size,
                  },
                })
              }
              className="border p-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              {artwork.imageId && (
                <img
                  src={imageUrls[artwork.artId]}
                  alt={artwork.title}
                  className="w-full h-48 object-cover rounded-md"
                />
              )}
              <h2 className="text-lg font-semibold mt-2">{artwork.title}</h2>
              <p className="text-gray-600 flex justify-between font-semibold">
                <span>{artwork.userName}</span>
                <span>${artwork.price}</span>
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No artworks found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default Category;
