import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPage = () => {
  const [artistList, setArtistList] = useState([]);
  const [artList, setArtList] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedArtItems, setAddedArtItems] = useState([]);

  // Fetch artists and artworks from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("accessToken"));
        console.log("Token:", token); // Log the token for debugging

        // Fetch artists
        const artistsResponse = await axios.get(
          "http://localhost:8080/api/artist",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setArtistList(artistsResponse.data);

        // Fetch artworks
        const artworksResponse = await axios.get(
          "http://localhost:8080/api/gallery",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setArtList(artworksResponse.data);

        // Fetch messages (if any)
        const storedMessages =
          JSON.parse(localStorage.getItem("adminMessages")) || [];
        setNotifications(storedMessages);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Delete an artist by username
  const deleteArtist = async (username) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this artist?"
    );
    if (confirmDelete) {
      try {
        const token = JSON.parse(localStorage.getItem("accessToken"));
        await axios.delete(
          `http://localhost:8080/api/artist/username/${username}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // Remove the deleted artist from the artist list
        setArtistList((prev) =>
          prev.filter((artist) => artist.userName !== username)
        );
        // Remove artworks associated with the deleted artist
        setArtList((prev) => prev.filter((art) => art.userName !== username));
      } catch (error) {
        console.error("Error deleting artist:", error);
      }
    }
  };

  // Delete an artwork by title
  const deleteArt = async (title) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this artwork?"
    );
    if (confirmDelete) {
      try {
        const token = JSON.parse(localStorage.getItem("accessToken"));
        await axios.delete(`http://localhost:8080/api/gallery/title/${title}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Remove the deleted artwork from the art list
        setArtList((prev) => prev.filter((art) => art.title !== title));
      } catch (error) {
        console.error("Error deleting artwork:", error);
      }
    }
  };

  // Remove notification when clicking OK
  const removeNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
    localStorage.setItem(
      "adminMessages",
      JSON.stringify(
        notifications.filter((notification) => notification.id !== id)
      )
    );
  };

  // Handle adding art item to the bottom section
  const handleArtItemAdd = (artDetails, artistName) => {
    const newArtItem = {
      artistName: artistName,
      title: artDetails.title,
      date: new Date().toLocaleDateString(), // Current date
    };
    setAddedArtItems((prevItems) => [...prevItems, newArtItem]);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 relative">
      <h1 className="text-2xl font-bold text-center mb-4">Admin Dashboard</h1>

      {/* Notifications (show in top-right corner) */}
      <div className="absolute top-4 right-4 z-10">
        {notifications.length > 0 &&
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="bg-green-500 text-white p-4 rounded-lg shadow-lg mb-2 transition-all duration-300 ease-in-out opacity-100"
            >
              <strong>{notification.content}</strong>
              <div className="text-xs text-gray-200">
                {notification.timestamp}
              </div>
              <button
                onClick={() => removeNotification(notification.id)} // Remove only the clicked notification
                className="bg-blue-500 text-white px-4 py-1 rounded mt-2"
              >
                OK
              </button>
            </div>
          ))}
      </div>

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
                onClick={() => deleteArtist(artist.userName)} // Call deleteArtist with artist username
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
                onClick={() => deleteArt(art.title)} // Call deleteArt with artwork title
                className="bg-red-500 text-white px-4 py-1 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Added Art Section at the Bottom */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Recently Added Art Items</h2>
        <ul className="space-y-4">
          {addedArtItems.map((item, index) => (
            <li
              key={index}
              className="bg-gray-100 p-4 rounded-lg shadow-lg flex justify-between items-center"
            >
              <span className="text-lg font-semibold text-gray-800">
                {item.artistName} - {item.title}
              </span>
              <span className="text-sm text-gray-500">{item.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPage;
