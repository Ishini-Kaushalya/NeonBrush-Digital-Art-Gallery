import React, { useState, useEffect } from "react";
import { artists, art_list } from "../assets/Common/assets";

const AdminPage = () => {
  const [artistList, setArtistList] = useState(artists);
  const [artList, setArtList] = useState(art_list);
  const [messages, setMessages] = useState([]);

  // Fetch the messages from localStorage or state
  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem("adminMessages")) || [];
    setMessages(storedMessages);
  }, []);

  // Handle delete artist with confirmation
  const deleteArtist = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this artist?");
    if (confirmDelete) {
      setArtistList((prev) => prev.filter((artist) => artist._id !== id));
      setArtList((prev) => prev.filter((art) => art.ownerName.trim() !== id.trim()));
    }
  };

  // Handle delete art with confirmation
  const deleteArt = (artId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this artwork?");
    if (confirmDelete) {
      setArtList((prev) => prev.filter((art) => art._id !== artId));
    }
  };

  // Handle adding a message when an artist adds art
  const handleArtSubmission = (artDetails, artistId) => {
    // Create a message for the admin
    const message = {
      content: `New artwork submitted by artist ${artistId}: ${artDetails.title}`,
      timestamp: new Date().toLocaleString(),
    };
    
    // Update messages in the state and localStorage
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, message];
      localStorage.setItem("adminMessages", JSON.stringify(updatedMessages)); // Store in localStorage
      return updatedMessages;
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Admin Dashboard</h1>

      {/* Artist Management */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Manage Artists</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {artistList.map((artist) => (
            <div
              key={artist._id}
              className="border p-4 rounded shadow-sm bg-white"
            >
              <img
                src={artist.image || "https://via.placeholder.com/150"}
                alt={artist.name}
                className="w-full h-32 object-cover rounded mb-2"
              />
              <h3 className="font-bold text-lg">{artist.name}</h3>
              <p className="text-sm text-gray-600">{artist.description}</p>
              <button
                onClick={() => deleteArtist(artist._id)}
                className="mt-2 bg-red-500 text-white px-4 py-1 rounded"
              >
                Delete Artist
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Art Management */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Manage Artworks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {artList.map((art) => (
            <div
              key={art._id}
              className="border p-4 rounded shadow-sm bg-white"
            >
              <img
                src={art.image || "https://via.placeholder.com/150"}
                alt={art.name}
                className="w-full h-32 object-cover rounded mb-2"
              />
              <h3 className="font-bold text-lg">{art.name}</h3>
              <p className="text-sm text-gray-600">{art.description}</p>
              <button
                onClick={() => deleteArt(art._id)}
                className="mt-2 bg-red-500 text-white px-4 py-1 rounded"
              >
                Delete Art
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Display Messages */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Messages from Artists</h2>
        {messages.length === 0 ? (
          <p>No new messages</p>
        ) : (
          <ul className="space-y-4">
            {messages.map((message, index) => (
              <li key={index} className="bg-gray-100 p-4 rounded-lg">
                <p className="font-medium">{message.content}</p>
                <p className="text-sm text-gray-500">{message.timestamp}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
