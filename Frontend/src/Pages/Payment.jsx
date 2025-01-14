import React, { useContext, useState } from "react";
import { StoreContext } from "../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import { IoChevronBackCircleOutline } from "react-icons/io5";

const PaymentPage = () => {
  const { cartItems, art_list, getTotalCartAmount } = useContext(StoreContext);
  const [paymentDetails, setPaymentDetails] = useState({
    name: "",
    cardNumber: "",
    expiration: "",
    cvv: "",
    userName: "", // Added user name
    address: "", // Added address
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePayment = () => {
    if (
      paymentDetails.name &&
      paymentDetails.cardNumber &&
      paymentDetails.expiration &&
      paymentDetails.cvv &&
      paymentDetails.userName &&
      paymentDetails.address
    ) {
      alert("Payment Successful!");
      navigate("/order");  // Redirect to order confirmation page
    } else {
      alert("Please fill in all payment details.");
    }
  };

  const handleBack = () => {
    navigate(-1);  // Go back to the previous page
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-green-100 shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-semibold text-black">Payment Details</h2>
      
      <div className="payment-form space-y-6 mt-6">
        <input
          type="text"
          name="userName"
          placeholder="Your Name"
          value={paymentDetails.userName}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
        />
        <input
          type="text"
          name="address"
          placeholder="Your Address"
          value={paymentDetails.address}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
        />
        <input
          type="text"
          name="name"
          placeholder="Name on Card"
          value={paymentDetails.name}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
        />
        <input
          type="text"
          name="cardNumber"
          placeholder="Card Number"
          value={paymentDetails.cardNumber}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
        />
        <div className="flex space-x-4">
          <input
            type="text"
            name="expiration"
            placeholder="Expiration Date"
            value={paymentDetails.expiration}
            onChange={handleChange}
            className="w-1/2 p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={paymentDetails.cvv}
            onChange={handleChange}
            className="w-1/2 p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
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

      <div className="flex justify-between items-center mt-8">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="text-black py-3 px-4 rounded-lg flex items-center justify-centerfocus:outline-none  "
        >
          <IoChevronBackCircleOutline size={24} className="mr-2" />
          
        </button>

        {/* Complete Payment Button */}
        <button
          onClick={handlePayment}
          className="w-1/3 bg-green-800 text-white py-3 rounded-lg hover:bg-green-950 "
        >
          Complete Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
