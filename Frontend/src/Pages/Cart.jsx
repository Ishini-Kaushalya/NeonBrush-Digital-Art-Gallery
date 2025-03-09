import React, { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Cart = () => {
  const { cartItems, removeFromCart, getTotalCartAmount } =
    useContext(StoreContext);

  const [images, setImages] = useState({});
  const quantity = 1;

  useEffect(() => {
    const fetchImages = async () => {
      const imagesData = {};
      for (const item of cartItems) {
        try {
          // Retrieve the JWT token from localStorage
          const token = JSON.parse(localStorage.getItem("accessToken"));
          if (!token) {
            console.error("User not authenticated");
            return;
          }

          const response = await axios.get(
            `http://localhost:8080/api/gallery/image/${item.imageId}`,
            {
              responseType: "blob",
              headers: {
                Authorization: `Bearer ${token}`, // Include the token in the request header
              },
            }
          );
          imagesData[item.imageId] = URL.createObjectURL(response.data);
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      }
      setImages(imagesData);
    };

    fetchImages();
  }, [cartItems]);
  console.log(cartItems);
  const navigate = useNavigate();
  // Function to handle navigation to the payment page
  const handleProceedToCheckout = () => {
    navigate("/payment"); // Navigate to Payment page
  };
  return (
    <div className='mt-24 px-4'>
      <div className='space-y-4'>
        <div className='grid grid-cols-6 items-center text-gray-500 text-sm'>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr className='border-gray-300' />
        {cartItems.length === 0 ? (
          <p>No items in the cart</p>
        ) : (
          cartItems.map((item, index) => {
            return (
              <div key={item.artId} className='space-y-4'>
                <div className='grid grid-cols-6 items-center text-black text-sm'>
                  <img
                    src={images[item.imageId]}
                    alt={item.name}
                    className='w-12 h-12 object-cover'
                  />
                  <p>{item.title}</p>
                  <p>Rs.{item.price}</p>
                  <p>{quantity}</p>
                  <p>Rs.{item.price * quantity}</p>
                  <p
                    onClick={() => removeFromCart(item.artId)}
                    className='cursor-pointer text-red-600 font-semibold'
                  >
                    x
                  </p>
                </div>
                <hr className='border-gray-300' />
              </div>
            );
          })
        )}
      </div>

      <div className='mt-20 flex flex-col lg:flex-row gap-12'>
        <div className='flex-1 space-y-4'>
          <h2 className='text-lg font-semibold'>Cart Total</h2>
          <div className='space-y-2 text-gray-600'>
            <div className='flex justify-between'>
              <p>Subtotal</p>
              <p>Rs.{getTotalCartAmount()}</p>
            </div>
            <hr className='border-gray-300' />
            <div className='flex justify-between'>
              <p>Packing</p>
              <p>Rs.{0}</p>
            </div>
            <hr className='border-gray-300' />
            <div className='flex justify-between font-bold'>
              <p>Total</p>
              <p>Rs.{getTotalCartAmount()}</p>
            </div>
          </div>
        </div>
        {/* Button to navigate to the payment page */}
        <div className='flex-1 space-y-4 relative'>
          <button
            onClick={handleProceedToCheckout}
            className='absolute right-4 bottom-2 bg-sky-800 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-sky-950'
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
