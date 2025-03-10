import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ShowArtist = () => {
  const [artists, setArtists] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtists = async () => {
      const token = JSON.parse(localStorage.getItem("accessToken"));

      // Check if the token is present
      if (!token) {
        // Redirect to sign-in page if token is not present
        navigate("/sign-in");
        return; // Stop further execution
      }

      try {
        const response = await fetch("http://localhost:8080/api/artist", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setArtists(data);

        const urls = {};
        for (const artist of data) {
          if (artist.imageId) {
            try {
              const imageResponse = await axios.get(
                `http://localhost:8080/api/artist/image/${artist.imageId}`,
                {
                  responseType: "blob",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              const imageUrl = URL.createObjectURL(imageResponse.data);
              urls[artist.artistId] = imageUrl;
            } catch (error) {
              console.error(
                "Error fetching image for artist ID:",
                artist.artistId,
                "with image ID:",
                artist.imageId,
                error
              );
            }
          }
        }
        setImageUrls(urls);
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };

    fetchArtists();
  }, [navigate]); // Add `navigate` to the dependency array

  // Function to navigate to ArtistDetail using username
  const navigateToArtistDetailFromList = (userName) => {
    if (userName) {
      navigate(`/artist-detail/${userName}`);
    } else {
      console.error("Username is not available.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center mt-16">
        See Your Favorite Artists
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {artists.map((artist) => (
          <div
            key={artist.artistId}
            onClick={() => navigateToArtistDetailFromList(artist.userName)} // Use artist.userName instead of artist.artistId
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          >
            <div className="flex flex-col items-center text-center">
              {artist.imageId && (
                <img
                  src={imageUrls[artist.artistId]}
                  alt={artist.userName}
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />
              )}
              <h3 className="text-xl font-semibold text-gray-800">
                {artist.userName}
              </h3>
              <p className="text-gray-600 mt-2">{artist.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowArtist;
