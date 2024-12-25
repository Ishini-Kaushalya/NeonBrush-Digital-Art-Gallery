import React, { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";

const Cart = () => {
  const { cartItems, art_list, removeFromCart } = useContext(StoreContext);
  return (
    <div className="mt-24 px-4">
      <div className="space-y-4">
        <div className="grid grid-cols-6 items-center text-gray-500 text-sm">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr className="border-gray-300" />
        {art_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id} className="space-y-4">
                <div className="grid grid-cols-6 items-center text-black text-sm">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover"
                  />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p
                    onClick={() => removeFromCart(item._id)}
                    className="cursor-pointer text-red-600 font-semibold"
                  >
                    x
                  </p>
                </div>
                <hr className="border-gray-300" />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="mt-20 flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-4">
          <h2 className="text-lg font-semibold">Cart Total</h2>
          <div className="space-y-2 text-gray-600">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>$0</p>
            </div>
            <hr className="border-gray-300" />
            <div className="flex justify-between">
              <p>Delivery Fee</p>
              <p>$2</p>
            </div>
            <hr className="border-gray-300" />
            <div className="flex justify-between font-bold">
              <p>Total</p>
              <p>$0</p>
            </div>
          </div>
          <button className="w-full max-w-xs bg-tomato text-white py-3 rounded">
            PROCEED TO CHECKOUT
          </button>
        </div>

        <div className="flex-1 space-y-4">
          <p className="text-gray-600">
            If you have a promo code, enter it here
          </p>
          <div className="flex items-center bg-gray-200 rounded">
            <input
              type="text"
              placeholder="Promo code"
              className="flex-grow bg-transparent px-3 py-2 focus:outline-none"
            />
            <button className="bg-black text-white px-6 py-2 rounded-r">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
