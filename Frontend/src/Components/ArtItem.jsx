import React, { useContext } from "react";
import { assets } from "../assets/Common/assets";
import { StoreContext } from "../Context/StoreContext";

const ArtItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
