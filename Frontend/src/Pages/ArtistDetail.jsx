import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for making HTTP requests

const ArtistDetail = () => {
  const { id } = useParams(); // Get the artist's ID or username from the URL
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);
  const [imageUrl, setImageUrl] = useState(""); // State to store the image URL
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(""); // State to handle errors

  // Fetch artist details and image from the backend
  useEffect(() => {
    const fetchArtistDetails = async () => {
      try {
        // Retrieve the JWT token from localStorage
        const token = JSON.parse(localStorage.getItem("accessToken"));

        if (!token) {
          setError("You must be logged in to view this page.");
          setLoading(false);
          return;
        }

        // Fetch artist details
        const artistResponse = await axios.get(
          `http://localhost:8080/api/artist/username/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the JWT token in the request headers
            },
          }
        );
        const artistData = artistResponse.data;
        setArtist(artistData);

        // Fetch the image from GridFS using the imageId
        if (artistData.imageId) {
          const imageResponse = await axios.get(
            `http://localhost:8080/api/artist/image/${artistData.imageId}`,
            {
              responseType: "blob", // Fetch the image as a blob
              headers: {
                Authorization: `Bearer ${token}`, // Include the JWT token in the request headers
              },
            }
          );

          // Convert the blob to a URL
          const imageUrl = URL.createObjectURL(imageResponse.data);
          setImageUrl(imageUrl);
        }
      } catch (error) {
        console.error("Error fetching artist details:", error);
        if (error.response?.status === 401) {
          setError("Unauthorized: Please log in again.");
        } else {
          setError("An error occurred while fetching artist details.");
        }
      } finally {
        setLoading(false); // Set loading to false after the request completes
      }
    };

    fetchArtistDetails();
  }, [id]);

  if (loading) {
    return <div>Loading artist details...</div>;
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

  if (!artist) {
    return <div>Artist not found!</div>;
  }

  return (
    <div className="artist-detail container mx-auto mt-16 p-4">
      {/* Back Button */}
      <button
        className="bg-black text-white py-2 px-6 rounded-lg shadow-md hover:bg-sky-950 mb-4"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
       {/* Add Art Button */}
       <button
        className="bg-sky-800 text-white py-2 px-6 rounded-lg shadow-md hover:bg-sky-950 ml-4"
        onClick={() => navigate("/add-art")}
      >
        Add Art
      </button>


      {/* Content Area */}
      <div
        className="relative flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8 bg-cover bg-center p-8 rounded-lg"
        style={{
          backgroundImage: `url(${imageUrl})`, // Use the fetched image as the background
        }}
      >
        {/* Transparent Overlay for background */}
        <div className="absolute inset-0 bg-black opacity-70 backdrop-blur-10 rounded-lg"></div>

        {/* Left Side: Artist Image */}
        <div className="relative z-10">
          <img
            src={imageUrl} // Use the fetched image URL
            alt={artist.userName}
            className="w-[300px] h-[300px] object-cover rounded-lg shadow-lg border-8 border-white"
          />
          <h2 className="text-3xl font-semibold mt-4 text-center text-white">
            {artist.userName}
          </h2>
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
