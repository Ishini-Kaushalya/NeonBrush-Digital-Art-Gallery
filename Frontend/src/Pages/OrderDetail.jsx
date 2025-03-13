import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const OrderList = () => {
  const [loggedInUsername, setLoggedInUsername] = useState();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedArt, setSelectedArt] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isArtist, setIsArtist] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("accessToken"));

        if (!token) {
          console.error("No token found, please login first.");
          setIsArtist(false);
          return;
        }

        // Decode the token to get user details
        const decodedToken = jwtDecode(token);
        const username = decodedToken.sub || decodedToken.username; // Adjust based on your token structure
        setLoggedInUsername(username);

        // Fetch user role
        const roleResponse = await axios.get(
          "http://localhost:8080/api/user/role",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const roles = roleResponse.data;
        setIsArtist(roles.includes("ROLE_ARTIST"));
      } catch (error) {
        console.error("Error fetching user role:", error);
        setIsArtist(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/payment");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    console.log("username", loggedInUsername);
    fetchOrders();
  }, []);

  useEffect(() => {
    if (!loading) {
      if (loggedInUsername === "admin") {
        setFilteredOrders(orders); // Admin sees all orders
      } else if (isArtist) {
        const artistOrders = orders.filter((order) =>
          Object.values(order.cartAsObject || {}).some(
            (art) => art.userName === loggedInUsername
          )
        );
        setFilteredOrders(artistOrders);
      }
    }
  }, [orders, isArtist, loggedInUsername, loading]);

  const handleSelectArt = (art, order) => {
    setSelectedArt(art);
    setSelectedOrder(order);
  };

  // Function to format the date (order.createdAt)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // Check if the date is valid
    if (isNaN(date)) {
      return "Invalid Date";
    }
    return date.toLocaleString(); // Returns formatted date in the local format
  };

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-4'>
        {" "}
        {loggedInUsername === "admin" ? "All Orders" : "Your Sold Arts"}
      </h2>
      {filteredOrders.length > 0 ? (
        <div>
          {filteredOrders.map((order) =>
            order.cartAsObject
              ? Object.values(order.cartAsObject).map((art) => (
                  <div key={art.artId} className='border p-4 mb-4'>
                    <h3 className='text-lg font-semibold'>{art.title}</h3>
                    <p>
                      <strong>Price:</strong> Rs.{art.price}
                    </p>
                    {/* Use order.createdAt for the order date */}
                    <p>
                      <strong>Order Date:</strong> {formatDate(order.createdAt)}
                    </p>
                    <button
                      className='mt-2 px-4 py-2 bg-blue-500 text-white rounded-md'
                      onClick={() => handleSelectArt(art, order)}
                    >
                      See Order Details
                    </button>
                  </div>
                ))
              : null
          )}
        </div>
      ) : (
        <p>No orders found.</p>
      )}

      {/* Order Details Modal */}
      {selectedOrder && selectedArt && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50'>
          <div className='bg-white p-6 rounded-md w-1/2'>
            <h2 className='text-xl font-bold'>Order Details</h2>
            <p>
              <strong>Artwork:</strong> {selectedArt.title}
            </p>
            <p>
              <strong>Buyer Name:</strong> {selectedOrder.userName}
            </p>
            <p>
              <strong>Address:</strong> {selectedOrder.address}
            </p>
            <p>
              <strong>Amount Paid:</strong> Rs. {selectedArt.price}
            </p>
            {/* Use order.createdAt for the order date */}
            <p>
              <strong>Order Date:</strong> {formatDate(selectedOrder.createdAt)}
            </p>
            <button
              className='mt-4 px-4 py-2 bg-red-500 text-white rounded-md'
              onClick={() => {
                setSelectedArt(null);
                setSelectedOrder(null);
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;
