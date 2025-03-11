import React, { useEffect, useState } from "react";
import axios from "axios";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchNotifications = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const response = await axios.get(
        "http://localhost:8080/api/notifications",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };


    fetchNotifications();
  }, []);

  if (loading) {
    return <div>Loading notifications...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      {notifications.length === 0 ? (
        <p>No new notifications.</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id} className="mb-2 p-2 bg-gray-100 rounded">
              <p>{notification.message}</p>
              <p className="text-sm text-gray-500">
                {new Date(notification.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
