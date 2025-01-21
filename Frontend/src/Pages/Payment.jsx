import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import axios from "axios";

const PaymentPage = () => {
  const { cartItems, art_list, getTotalCartAmount } = useContext(StoreContext);
  const [paymentDetails, setPaymentDetails] = useState({
    userName: "", // Automatically filled with signed-in user's name
    address: "",
    name: "",
    cardNumber: "",
    expiration: "",
    cvv: "",
  });
  const navigate = useNavigate();

  // Retrieve token and username from sessionStorage
  const token = sessionStorage.getItem("authToken");
  const storedUserName = sessionStorage.getItem("userName");

  useEffect(() => {
    // If no token is found or the token is invalid, redirect to login page
    if (!token) {
      navigate("/UserLoginPopup");
    }
    if (storedUserName) {
      setPaymentDetails((prev) => ({ ...prev, userName: storedUserName }));
    }
  }, [token, storedUserName, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async () => {
    if (
      paymentDetails.userName &&
      paymentDetails.address &&
      paymentDetails.name &&
      paymentDetails.cardNumber &&
      paymentDetails.expiration &&
      paymentDetails.cvv
    ) {
      try {
        const paymentPayload = {
          user_id: "USER_ID", // Replace with actual user ID if available
          amount: getTotalCartAmount(),
          payment_method: "Card", // Add logic for other methods if required
          payment_status: "Pending",
          billing_address: paymentDetails.address,
          created_at: new Date(),
          cartItems: art_list
            .filter((item) => cartItems[item._id] > 0)
            .map((item) => ({
              id: item._id,
              quantity: cartItems[item._id],
              price: item.price,
            })),
        };

        const response = await axios.post(
          "http://localhost:8080/api/payment",
          paymentPayload,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          alert("Payment Successful!");
          navigate("/order"); // Redirect to the order confirmation page
        }
      } catch (error) {
        if (error.response) {
          // Error response from server
          console.error("Error response:", error.response);
          alert(
            error.response?.data?.message ||
              "An error occurred while processing your payment."
          );
        } else if (error.request) {
          // No response received
          console.error("Error request:", error.request);
          alert("No response received from server. Please try again later.");
        } else {
          // Error in setting up request
          console.error("Error message:", error.message);
          alert("An error occurred while setting up the payment request.");
        }
      }
    } else {
      alert("Please fill in all payment details.");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-gray-100 shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-semibold text-black">Payment Details</h2>
      <div className="payment-form space-y-6 mt-6">
        <input
          type="text"
          name="userName"
          placeholder="Your Name"
          value={paymentDetails.userName}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
          readOnly
        />
        <input
          type="text"
          name="address"
          placeholder="Your Address"
          value={paymentDetails.address}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
        />
        <input
          type="text"
          name="name"
          placeholder="Name on Card"
          value={paymentDetails.name}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
        />
        <input
          type="text"
          name="cardNumber"
          placeholder="Card Number"
          value={paymentDetails.cardNumber}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
        />
        <div className="flex space-x-4">
          <input
            type="text"
            name="expiration"
            placeholder="Expiration Date"
            value={paymentDetails.expiration}
            onChange={handleChange}
            className="w-1/2 p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
          />
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={paymentDetails.cvv}
            onChange={handleChange}
            className="w-1/2 p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
          />
        </div>
      </div>
      <div className="cart-summary mt-8">
        <h3 className="font-semibold text-gray-800">Cart Summary</h3>
        <div className="space-y-4 mt-4">
          {art_list.map((item) => {
            if (cartItems[item._id] > 0) {
              return (
                <div key={item._id} className="grid grid-cols-2 items-center">
                  <p className="text-gray-600">{item.name}</p>
                  <p className="text-gray-600">
                    Rs.{item.price * cartItems[item._id]}
                  </p>
                </div>
              );
            }
            return null;
          })}
        </div>
        <div className="total mt-4 flex justify-between text-gray-800">
          <p className="font-bold">Total:</p>
          <p>Rs.{getTotalCartAmount()}</p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={handleBack}
          className="text-black py-3 px-4 rounded-lg flex items-center justify-center focus:outline-none"
        >
          <IoChevronBackCircleOutline size={24} className="mr-2" />
        </button>
        <button
          onClick={handlePayment}
          className="w-1/3 bg-sky-800 text-white py-3 rounded-lg hover:bg-sky-950"
        >
          Complete Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
