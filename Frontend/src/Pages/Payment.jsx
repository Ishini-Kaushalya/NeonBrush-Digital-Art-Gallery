import React, { useContext, useState } from "react";
import { StoreContext } from "../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoChevronBackCircleOutline } from "react-icons/io5";

const PaymentPage = () => {
  const { cartItems, getTotalCartAmount } = useContext(StoreContext);
  const [paymentDetails, setPaymentDetails] = useState({
    nameOnCard: "",
    cardNumber: "",
    expirationDate: "",
    CVV: "",
    userName: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePayment = async () => {
    if (Object.values(paymentDetails).every((field) => field.trim() !== "")) {
      try {
        const payload = {
          ...paymentDetails,
          cartItems,
          totalAmount: getTotalCartAmount(),
        };
        await axios.post("http://localhost:8080/api/payment", payload);
        alert("Payment Successful!");
        navigate("/products");
      } catch (error) {
        console.error("Payment error:", error);
        alert("Payment failed. Please try again.");
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
          name="nameOnCard"
          placeholder="Name on Card"
          value={paymentDetails.nameOnCard}
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
            name="expirationDate"
            placeholder="Expiration Date"
            value={paymentDetails.expirationDate}
            onChange={handleChange}
            className="w-1/2 p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
          />
          <input
            type="text"
            name="CVV"
            placeholder="CVV"
            value={paymentDetails.CVV}
            onChange={handleChange}
            className="w-1/2 p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
          />
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
