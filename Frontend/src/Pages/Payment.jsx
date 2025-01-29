import React, { useContext, useState } from "react";
import { StoreContext } from "../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { z } from "zod";  // Importing Zod for validation

const PaymentPage = () => {
  const { cartItems, art_list, getTotalCartAmount } = useContext(StoreContext);
  const [paymentDetails, setPaymentDetails] = useState({
    name: "",
    cardNumber: "",
    expiration: "",
    cvv: "",
    userName: "",
    address: "",
  });

  const navigate = useNavigate();

  // Define Zod schema for form validation
  const paymentDetailsSchema = z.object({
    name: z.string().min(1, "Name on card is required"),
    // Card number validation: It must be a string of exactly 16 digits
    cardNumber: z.string()
      .regex(/^\d{16}$/, "Card number must be exactly 16 digits and contain only numbers"), // Regex to check only digits and exact length
    expiration: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiration date must be in MM/YY format"),
    cvv: z.string().regex(/^\d{3}$/, "CVV must be exactly 3 digits"),
    userName: z.string().min(1, "Your name is required"),
    address: z.string().min(1, "Your address is required"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePayment = () => {
    // Validate payment details using Zod schema
    try {
      paymentDetailsSchema.parse(paymentDetails);  // Will throw an error if validation fails
      alert("Payment Successful!");
      navigate("/order");  // Redirect to order confirmation page
    } catch (err) {
      if (err instanceof z.ZodError) {
        alert(err.errors.map((e) => e.message).join("\n"));
      }
    }
  };

  const handleBack = () => {
    navigate(-1);  // Go back to the previous page
  };

  // Handle clear button click
  const handleClear = () => {
    setPaymentDetails({
      name: "",
      cardNumber: "",
      expiration: "",
      cvv: "",
      userName: "",
      address: "",
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-gray-100 shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-semibold text-black">Payment Details</h2>
      
      <div className="payment-form space-y-6 mt-6">
        {/* User Name Input */}
        <div className="flex flex-col">
          <label htmlFor="userName" className="text-gray-700">Your Name</label>
          <input
            type="text"
            name="userName"
            id="userName"
            placeholder="Your Name"
            value={paymentDetails.userName}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
          />
        </div>

        {/* Address Input */}
        <div className="flex flex-col">
          <label htmlFor="address" className="text-gray-700">Your Address</label>
          <input
            type="text"
            name="address"
            id="address"
            placeholder="Your Address"
            value={paymentDetails.address}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
          />
        </div>

        {/* Name on Card Input */}
        <div className="flex flex-col">
          <label htmlFor="name" className="text-gray-700">Name on Card</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name on Card"
            value={paymentDetails.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
          />
        </div>

        {/* Card Number Input */}
        <div className="flex flex-col">
          <label htmlFor="cardNumber" className="text-gray-700">Card Number</label>
          <input
            type="text"
            name="cardNumber"
            id="cardNumber"
            placeholder="Card Number"
            value={paymentDetails.cardNumber}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
          />
        </div>

        {/* Expiration Date and CVV Inputs */}
        <div className="flex space-x-4">
          {/* Expiration Date */}
          <div className="flex flex-col w-1/2">
            <label htmlFor="expiration" className="text-gray-700">Expiration Date</label>
            <input
              type="text"
              name="expiration"
              id="expiration"
              placeholder="MM/YY"
              value={paymentDetails.expiration}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
          </div>

          {/* CVV */}
          <div className="flex flex-col w-1/2">
            <label htmlFor="cvv" className="text-gray-700">CVV</label>
            <input
              type="text"
              name="cvv"
              id="cvv"
              placeholder="CVV"
              value={paymentDetails.cvv}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
          </div>
        </div>
      </div>

      {/* Cart Summary Section */}
      <div className="cart-summary mt-8">
        <h3 className="font-semibold text-gray-800">Cart Summary</h3>
        <div className="space-y-4 mt-4">
          {art_list.map((item) => {
            if (cartItems[item._id] > 0) {
              return (
                <div key={item._id} className="grid grid-cols-2 items-center">
                  <p className="text-gray-600">{item.name}</p>
                  <p className="text-gray-600">Rs.{item.price * cartItems[item._id]}</p>
                </div>
              );
            }
            return null;
          })}
        </div>
        <div className="total mt-4 flex justify-between text-gray-800">
          <p className="font-bold">Total: </p>
          <p>Rs.{getTotalCartAmount()}</p>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="flex justify-between items-center mt-8">
        {/* Back and Clear Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={handleBack}
            className="text-black py-3 px-4 rounded-lg flex items-center justify-centerfocus:outline-none"
          >
            <IoChevronBackCircleOutline size={24} className="mr-2" />
          </button>

          {/* Clear Button */}
          <button
            onClick={handleClear}
            className="text-gray-700 py-3 px-4 rounded-lg border border-gray-300 hover:bg-gray-200"
          >
            Clear
          </button>
        </div>

        {/* Complete Payment Button */}
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
