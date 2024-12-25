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