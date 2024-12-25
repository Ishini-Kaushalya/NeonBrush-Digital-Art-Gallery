import { createContext, useEffect, useState } from "react";
import { art_list } from "../assets/Common/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});