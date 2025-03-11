import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ArtItem from "../Components/ArtItem"; // Import the ArtItem component

const ArtistDetail = () => {
  const { id } = useParams(); // Get the artist's ID or username from the URL
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);
  const [imageUrl, setImageUrl] = useState(""); // State to store the artist's image URL
  const [artworks, setArtworks] = useState([]); // State to store the artist's artworks
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(""); // State to handle errors
  const [isArtist, setIsArtist] = useState(false); // State to check if the logged-in user is an artist

  // Fetch artist details, image, artworks, and user role from the backend
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

        // Fetch the current user's role
        const roleResponse = await axios.get(
          `http://localhost:8080/api/user/role`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsArtist(roleResponse.data.includes("ROLE_ARTIST")); // Check if the user is an artist

        // Fetch artist details
        const artistResponse = await axios.get(
          `http://localhost:8080/api/artist/username/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const artistData = artistResponse.data;
        setArtist(artistData);

        // Fetch the artist's image from GridFS using the imageId
        if (artistData.imageId) {
          const imageResponse = await axios.get(
            `http://localhost:8080/api/artist/image/${artistData.imageId}`,
            {
              responseType: "blob",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // Convert the blob to a URL
          const imageUrl = URL.createObjectURL(imageResponse.data);
          setImageUrl(imageUrl);
        }

        // Fetch the artist's artworks
        const artworksResponse = await axios.get(
          `http://localhost:8080/api/gallery/user/${artistData.userName}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setArtworks(artworksResponse.data); // Store the fetched artworks
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
        className="bg-sky-800 text-white py-2 px-6 rounded-lg shadow-md hover:bg-sky-950 mb-4"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
       {/* Add Art Button */}

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

      {/* Artist's Artworks */}
      {artworks.length > 0 ? (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Artworks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {artworks.map((art) => (
              <ArtItem
                key={art._id}
                id={art._id}
                name={art.title}
                price={art.price}
                description={art.description}
                imageId={art.imageId}
                onClick={() => navigate(`/art/${art._id}`)} // Navigate to artwork detail page
              />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-600">No artworks available for this artist.</p>
      )}
    </div>
  );
};

export default ArtistDetail;
