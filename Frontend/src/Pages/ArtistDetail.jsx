import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import ArtItem from "../Components/ArtItem";
import { FaTrash } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { MdAttachEmail } from "react-icons/md";

const ArtistDetail = () => {
  const { id } = useParams(); // Get the artist's ID or username from the URL
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);
  const [imageUrl, setImageUrl] = useState(""); // State to store the artist's image URL
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(""); // State to handle errors
  const [isArtist, setIsArtist] = useState(false); // State to check if the logged-in user is an artist
  const [loggedInUsername, setLoggedInUsername] = useState();

  // Fetch artist details, image, and user role from the backend
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

        const decodedToken = jwtDecode(token);
        const username = decodedToken.sub || decodedToken.username; // Adjust based on your token structure
        setLoggedInUsername(username);

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
        setArtworks(artworksResponse.data);
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
      <div className='flex justify-center items-center h-screen'>
        <div className='w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-center mt-16'>
        <p className='text-red-500'>{error}</p>
        <button
          className='bg-black text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 mt-4'
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
    <div className='artist-detail container mx-auto mt-16 p-4'>
      

      {/* Content Area */}
      <div
        className='relative flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8 bg-cover bg-center p-8 rounded-lg'
        style={{
          backgroundImage: `url(${imageUrl})`, // Use the fetched image as the background
        }}
      >
        {/* Transparent Overlay for background */}
        <div className='absolute inset-0 bg-black opacity-70 backdrop-blur-10 rounded-lg'></div>

        {/* Left Side: Artist Image */}
        <div className='relative z-10'>
          <img
            src={imageUrl} // Use the fetched image URL
            alt={artist.userName}
            className='w-[300px] h-[300px] object-cover rounded-lg shadow-lg border-8 border-white'
          />
          <h2 className='text-3xl font-semibold mt-4 text-center text-white'>
            {artist.userName}
          </h2>
           {/* Add the artist's email with a 2D button design and animated icon */}
           <div className='flex justify-center items-center mt-4'>
    <a
      href={`mailto:${artist.email}`} // Open default email client
      className='flex items-center bg-white bg-opacity-20 backdrop-blur-sm p-4 shadow-lg hover:bg-opacity-30 transition-all duration-300 cursor-pointer'
      style={{
        borderRadius: '50px', // Custom border radius for half-circle effect
      }}
    >
      <MdAttachEmail className='text-white text-2xl animate-bounce mr-2' /> {/* Animated icon */}
      <p className='text-lg text-white font-medium'>{artist.email}</p>
    </a>
  </div>
        </div>

        {/* Right Side: Artist Details */}
        <div className='relative z-10 space-y-4 bg-opacity-90 p-6 rounded-lg shadow-lg'>
          <h1 className='text-4xl font-bold text-white'>About the Artist</h1>
          <p className='text-lg text-white'>{artist.description}</p>
        </div>
      </div>
      {/* Artist's Artworks */}
      {artworks.length > 0 ? (
        <div className='mt-8'>
          <h2 className='text-2xl font-bold mb-4'>Artworks</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
            {artworks.map((art) => (
              <div key={art._id} className='relative'>
                <ArtItem
                  id={art._id}
                  name={art.title}
                  price={art.price}
                  description={art.description}
                  imageId={art.imageId}
                  onClick={() => handleArtClick(art)} // Navigate to artwork detail page
                />
                {/* Delete Icon */}
                {isArtist && loggedInUsername === id && (
                  <button
                    className='absolute bottom-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600'
                    onClick={() => deleteArtwork(art.title)} // Call delete function
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className='text-gray-600'>No artworks available for this artist.</p>
      )}
      {/* Back Button */}
      <button
        className='text-black py-4 px-8 text-xl  hover:text-sky-500 mt-6 mb-4'
        onClick={() => navigate(-1)}
      >
        <IoChevronBackCircleOutline className='mr-2 text-3xl' />
      </button>
    </div>
  );
};

export default ArtistDetail;
