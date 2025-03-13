import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ArtItem from "../Components/ArtItem"; // Import the ArtItem component
import { FaTrash } from "react-icons/fa"; // Import the delete icon
import { jwtDecode } from "jwt-decode"; // Import jwtDecode to decode the token

const ArtistArtworks = () => {
  const navigate = useNavigate();
  const [artworks, setArtworks] = useState([]); // State to store the artist's artworks
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(""); // State to handle errors

  // Fetch the artist's artworks
  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("accessToken"));

        if (!token) {
          setError("You must be logged in to view this page.");
          setLoading(false);
          return;
        }

        // Fetch the current user's username from the token
        const decodedToken = jwtDecode(token);
        const username = decodedToken.sub || decodedToken.username;

        // Fetch the artist's artworks
        const artworksResponse = await axios.get(
          `http://localhost:8080/api/gallery/user/${username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setArtworks(artworksResponse.data); // Store the fetched artworks
      } catch (error) {
        console.error("Error fetching artworks:", error);
        setError("An error occurred while fetching artworks.");
      } finally {
        setLoading(false); // Set loading to false after the request completes
      }
    };

    fetchArtworks();
  }, []);

  // Function to delete an artwork by title
  const deleteArtwork = async (title) => {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      if (!token) {
        setError("You must be logged in to delete artworks.");
        return;
      }

      // Call the backend to delete the artwork
      await axios.delete(`http://localhost:8080/api/gallery/title/${title}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the deleted artwork from the state
      setArtworks(artworks.filter((art) => art.title !== title));
      alert("Artwork deleted successfully!");
    } catch (error) {
      console.error("Error deleting artwork:", error);
      alert("Failed to delete artwork.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-16">
        <p className="text-red-500">{error}</p>
        <button
          className="bg-black text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 mt-4"
          onClick={() => navigate("/login")} // Redirect to login page
        >
          Log In
        </button>
      </div>
    );
  }

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

  return (
    <div className="container mx-auto mt-16 p-4">
      <h2 className="text-2xl font-bold mb-4">My Artworks</h2>
      {artworks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {artworks.map((art) => (
            <div key={art.artId} className="relative">
              <ArtItem
                id={art.artId}
                name={art.title}
                price={art.price}
                description={art.description}
                imageId={art.imageId} // Pass imageId instead of imageUrl
                onClick={() => handleArtClick(art)} // Navigate to artwork detail page
              />
              {/* Delete Icon */}
              <button
                className="absolute bottom-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                onClick={() => deleteArtwork(art.title)} // Call delete function
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No artworks available.</p>
      )}
    </div>
  );
};

export default ArtistArtworks;
