import { createContext, useEffect, useState } from "react";
import { art_list } from "../assets/Common/assets";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(() => {
    // Retrieve cart from localStorage on app load
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    // Save cart to localStorage whenever it updates
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

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
        const existingItem = cartItems.find((item) => item.artId === artId);
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
    setCartItems((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.artId !== itemId);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart)); // Persist cart
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCartItems([]); // This will reset the cart items to an empty array
    localStorage.removeItem("cartItems"); // Optionally clear from localStorage as well
  };

  const getTotalCartAmount = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
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
    clearCart,
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
