import React, { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, art_list, removeFromCart, getTotalCartAmount } =
    useContext(StoreContext);

  const navigate = useNavigate();
  // Function to handle navigation to the payment page
  const handleProceedToCheckout = () => {
    console.log({ cartItems });
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
        {art_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id} className='space-y-4'>
                <div className='grid grid-cols-6 items-center text-black text-sm'>
                  <img
                    src={item.image}
                    alt={item.name}
                    className='w-12 h-12 object-cover'
                  />
                  <p>{item.name}</p>
                  <p>Rs.{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>Rs.{item.price * cartItems[item._id]}</p>
                  <p
                    onClick={() => removeFromCart(item._id)}
                    className='cursor-pointer text-red-600 font-semibold'
                  >
                    x
                  </p>
                </div>
                <hr className='border-gray-300' />
              </div>
            );
          }
          return null;
        })}
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
          {cartItems.length > 0 && (
            <button
              onClick={handleProceedToCheckout}
              className='absolute right-4 bottom-2 bg-sky-800 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-sky-950'
            >
              PROCEED TO CHECKOUT
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
