import React, { useState, useEffect } from "react";
import axios from "axios";

const OrderDetail = () => {
  const [selectedArt, setSelectedArt] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);

  // Fetch order details from API (after purchase)
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        // Replace this URL with your backend API endpoint
        const response = await axios.get("http://localhost:8080/api/orders/12345");
        setOrderDetails(response.data);  // Assuming API response has the order data
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, []);  // Empty dependency array ensures this runs once after the component mounts

  const handleSeeDetail = (art) => {
    setSelectedArt(art);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>
      
      {orderDetails ? (
        <div className="space-y-4">
          {/* Display buyer name with See Detail button */}
          <div className="flex items-center justify-between">
            <p className="font-semibold">Buyer: {orderDetails.buyer.name}</p>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={() => handleSeeDetail(orderDetails)}
            >
              See Detail
            </button>
          </div>

          {/* Show order details */}
          {selectedArt ? (
            <div className="flex flex-col items-start space-y-4 border-b pb-4">
              <h3 className="text-xl font-semibold">Buyer Details</h3>
              <p><strong>Name:</strong> {selectedArt.buyer.name}</p>
              <p><strong>Address:</strong> {selectedArt.buyer.address}</p>

              <h3 className="text-xl font-semibold">Payment Details</h3>
              <p><strong>Transaction ID:</strong> {orderDetails.payment.transactionId}</p>
              <p><strong>Amount:</strong> {orderDetails.payment.amount}</p>
              <p><strong>Status:</strong> {orderDetails.payment.status}</p>

              <h3 className="text-xl font-semibold">Art Details</h3>
              {orderDetails.art.map((art) => (
                <div key={art.id} className="flex items-center space-x-4 border-b pb-4">
                  <img
                    src={art.imageUrl}
                    alt={art.name}
                    className="w-24 h-24 object-cover"
                  />
                  <h3 className="text-lg font-medium flex-1">{art.name}</h3>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-medium">Art Purchased:</h3>
              {orderDetails.art.map((art) => (
                <div key={art.id} className="flex items-center space-x-4 border-b pb-4">
                  <img
                    src={art.imageUrl}
                    alt={art.name}
                    className="w-24 h-24 object-cover"
                  />
                  <h3 className="text-lg font-medium flex-1">{art.name}</h3>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>Loading order details...</div>
      )}
    </div>
  );
};

export default OrderDetail;
