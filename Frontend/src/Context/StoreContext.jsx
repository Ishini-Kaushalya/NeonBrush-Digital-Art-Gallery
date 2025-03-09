import { createContext, useEffect, useState } from "react";
import { art_list } from "../assets/Common/assets";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = async (artId) => {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      if (!token) {
        console.error("User not authenticated");
        return;
      }

      // Fetch art details from the database
      const response = await axios.get(
        `http://localhost:8080/api/gallery/${artId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        const artDetails = response.data;

        // Check if item is already in cart to avoid duplicates
        const existingItem = cartItems.find((item) => item._id === artId);
        if (existingItem) {
          console.warn("Item is already in cart.");
          return;
        }

        setCartItems((prevCart) => [...prevCart, artDetails]);
      }
    } catch (error) {
      console.error("Error fetching art details:", error);
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      // Check if the item exists in the cart
      if (updatedCart[itemId]) {
        if (updatedCart[itemId].quantity > 1) {
          // If quantity is greater than 1, reduce by 1
          updatedCart[itemId].quantity -= 1;
        } else {
          // If quantity is 1, remove the item completely
          delete updatedCart[itemId];
        }
      }
      return updatedCart;
    });
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const itemInfo = art_list.find((product) => product._id === itemId);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[itemId];
        }
      }
    }
    return totalAmount;
  };

  const getCartSize = () => {
    return cartItems.length;
  };

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  const contextValue = {
    art_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getCartSize,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
