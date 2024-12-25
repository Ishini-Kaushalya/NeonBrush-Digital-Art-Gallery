import React, { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
import ArtItem from "./ArtItem";

const ArtDisplay = ({ category }) => {
  const { art_list } = useContext(StoreContext);