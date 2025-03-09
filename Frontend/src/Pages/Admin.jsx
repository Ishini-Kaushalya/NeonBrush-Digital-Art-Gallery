import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPage = () => {
  const [artistList, setArtistList] = useState([]);
  const [artList, setArtList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("accessToken"));
        console.log("Token:", token); // Log the token for debugging

        const artistsResponse = await axios.get(
          "http://localhost:8080/api/artist",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setArtistList(artistsResponse.data);

        const artworksResponse = await axios.get(
          "http://localhost:8080/api/gallery",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setArtList(artworksResponse.data);

        const storedMessages =
          JSON.parse(localStorage.getItem("adminMessages")) || [];
        setMessages(storedMessages);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteArtist = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this artist?"
    );
    if (confirmDelete) {
      try {
        const token = JSON.parse(localStorage.getItem("accessToken"));
        await axios.delete(`http://localhost:8080/api/artist/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setArtistList((prev) => prev.filter((artist) => artist._id !== id));
        setArtList((prev) => prev.filter((art) => art.userName !== id));
      } catch (error) {
        console.error("Error deleting artist:", error);
      }
    }
  };

  const deleteArt = async (artId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this artwork?"
    );
    if (confirmDelete) {
      try {
        const token = JSON.parse(localStorage.getItem("accessToken"));
        await axios.delete(`http://localhost:8080/api/gallery/${artId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setArtList((prev) => prev.filter((art) => art._id !== artId));
      } catch (error) {
        console.error("Error deleting artwork:", error);
      }
    }
  };

  const handleArtSubmission = (artDetails, artistId) => {
    const message = {
      content: `New artwork submitted by artist ${artistId}: ${artDetails.title}`,
      timestamp: new Date().toLocaleString(),
    };
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, message];
      localStorage.setItem("adminMessages", JSON.stringify(updatedMessages));
      return updatedMessages;
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Admin Dashboard</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Manage Artists</h2>
        <ul className="space-y-4">
          {artistList.map((artist) => (
            <li
              key={artist._id}
              className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex justify-between items-center"
            >
              <span className="text-xl font-semibold text-gray-800">
                {artist.userName}
              </span>
              <button
                onClick={() => deleteArtist(artist._id)}
                className="bg-red-500 text-white px-4 py-1 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Manage Artworks</h2>
        <ul className="space-y-4">
          {artList.map((art) => (
            <li
              key={art._id}
              className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex justify-between items-center"
            >
              <span className="text-xl font-semibold text-gray-800">
                {art.title}
              </span>
              <button
                onClick={() => deleteArt(art._id)}
                className="bg-red-500 text-white px-4 py-1 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      
    </div>
  );
};

export default AdminPage;
