import React, { useContext, useState } from "react";
import { StoreContext } from "../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { z } from "zod";
import PaymentReceipt from "./PaymentReceipt";

const paymentSchema = z.object({
  nameOnCard: z.string().min(1, "Name on Card is required"),
  cardNumber: z.string().regex(/^[0-9]{16}$/, "Card Number must be 16 digits"),
  expirationDate: z.string().min(1, "Expiration Date is required"),
  CVV: z.string().regex(/^[0-9]{3,4}$/, "CVV must be 3 or 4 digits"),
  userName: z.string().min(1, "Your Name is required"),
  address: z.string().min(1, "Address is required"),
});

const PaymentPage = () => {
  const { cartItems, clearCart, getTotalCartAmount } = useContext(StoreContext);
  const [paymentDetails, setPaymentDetails] = useState({
    nameOnCard: "",
    cardNumber: "",
    expirationDate: "",
    CVV: "",
    userName: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false); // Track payment status
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "cardNumber" || name === "CVV") {
      if (!/^[0-9]*$/.test(value)) return;
    }
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const cartAsObject = cartItems.reduce((acc, item) => {
    acc[item.artId] = item;
    return acc;
  }, {});

  const handlePayment = async () => {
    const validationResult = paymentSchema.safeParse(paymentDetails);
    if (!validationResult.success) {
      const formattedErrors = validationResult.error.flatten();
      setErrors(formattedErrors.fieldErrors); // Use flattened errors
      return;
    }
    setErrors({});
    try {
      const payload = {
        ...paymentDetails,
        cartAsObject,
        totalAmount: getTotalCartAmount(),
      };
      await axios.post("http://localhost:8080/api/payment", payload);
      const token = JSON.parse(localStorage.getItem("accessToken"));
      if (!token) {
        console.error("User not authenticated");
        return;
      }
      const purchasedArtIds = cartItems.map((item) => item.artId);
      for (const item of cartItems) {
        const artistUsername = item.userName;
        const message = `Your artwork "${item.title}" has been purchased!`;
        await axios.post(
          "http://localhost:8080/api/notifications",
          { artistUsername, message },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      // Send request to delete purchased items from the database

      await axios.post(
        `http://localhost:8080/api/gallery/deletePurchased?artIds=${purchasedArtIds.join(
          "&artIds="
        )}`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPaymentSuccess(true);
      // Clear cart items from the state

      setMessage("Payment Successful! Redirecting...");
      setTimeout(() => {
        clearCart(); // Clear the cart after a short delay
        navigate("/products");
      }, 10000);
      //setTimeout(() => navigate("/products"), 2000);
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    }
  };

  const handleClear = () => {
    setPaymentDetails({
      nameOnCard: "",
      cardNumber: "",
      expirationDate: "",
      CVV: "",
      userName: "",
      address: "",
    });
    setErrors({});
  };

  const handleBack = () => {
    navigate(-1);
  };
  // If payment is successful, render the receipt
  if (paymentSuccess) {
    return <PaymentReceipt paymentDetails={paymentDetails} />;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-gray-100 shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-semibold text-black">Payment Details</h2>
      {message && (
        <p className="text-green-600 text-lg font-medium text-center mt-4">
          {message}
        </p>
      )}
      <div className="payment-form space-y-6 mt-6">
        {[
          { name: "userName", label: "Your Name" },
          { name: "address", label: "Your Address" },
          { name: "nameOnCard", label: "Name on Card" },
          { name: "cardNumber", label: "Card Number" },
        ].map(({ name, label }) => (
          <div key={name}>
            <label className="block text-gray-700 font-medium mb-1">
              {label}
            </label>
            <input
              type="text"
              name={name}
              placeholder={label}
              value={paymentDetails[name]}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
            {errors[name] && (
              <p className="text-red-500 text-sm">{errors[name]}</p>
            )}
          </div>
        ))}
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-gray-700 font-medium mb-1">
              Expiration Date
            </label>
            <input
              type="date"
              name="expirationDate"
              value={paymentDetails.expirationDate}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]} // Prevent past dates
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
            {errors.expirationDate && (
              <p className="text-red-500 text-sm">{errors.expirationDate}</p>
            )}
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700 font-medium mb-1">CVV</label>
            <input
              type="text"
              name="CVV"
              placeholder="CVV"
              value={paymentDetails.CVV}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
            {errors.CVV && <p className="text-red-500 text-sm">{errors.CVV}</p>}
          </div>
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
          onClick={handleClear}
          className="w-1/3 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-700"
        >
          Clear
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
