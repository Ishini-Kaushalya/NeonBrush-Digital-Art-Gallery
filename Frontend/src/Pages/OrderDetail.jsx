import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const OrderList = () => {
  const { artistId } = useParams(); // Assume artistId is passed via URL
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/orders/artist/${artistId}`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [artistId]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Sold Arts</h2>
      {orders.length > 0 ? (
        <div>
          {orders.map((order) => (
            <div key={order.id} className="border p-4 mb-4">
              <h3 className="text-lg font-semibold">Order #{order.id}</h3>
              <p><strong>Buyer:</strong> {order.buyer.name}</p>
              <h4 className="font-medium mt-2">Purchased Arts:</h4>
              {order.arts.map((art) => (
                <div key={art.id} className="flex items-center space-x-4 border-b pb-2">
                  <img src={art.imageUrl} alt={art.title} className="w-16 h-16 object-cover" />
                  <p>{art.title} - ${art.price}</p>
                </div>
              ))}
              <button 
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={() => setSelectedOrder(order)}
              >
                See Detail
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No orders found.</p>
      )}

      {selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-1/2">
            <h2 className="text-xl font-bold">Order Details</h2>
            <p><strong>Buyer Name:</strong> {selectedOrder.buyer.name}</p>
            <p><strong>Address:</strong> {selectedOrder.buyer.address}</p>
            <p><strong>Transaction ID:</strong> {selectedOrder.payment.transactionId}</p>
            <p><strong>Amount:</strong> ${selectedOrder.payment.amount}</p>
            <p><strong>Status:</strong> {selectedOrder.payment.status}</p>
            <button 
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
              onClick={() => setSelectedOrder(null)}
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
