import { createContext, useEffect, useState } from "react";
import { art_list } from "../assets/Common/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        };
        useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

        const contextValue = {
    art_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
  };