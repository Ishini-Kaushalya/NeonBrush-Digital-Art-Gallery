import React, { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";

const Cart = () => {
  const { cartItems, art_list, removeFromCart } = useContext(StoreContext);