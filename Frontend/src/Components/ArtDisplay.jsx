import React, { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
import ArtItem from "./ArtItem";

const ArtDisplay = ({ category }) => {
  const { art_list } = useContext(StoreContext);

  return (
    <div className="mt-8" id="art-display">
      <h2 className="text-2xl font-semibold md:text-3xl">
        Meet Stunning Art Works
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {art_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <ArtItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
          return null; // Ensure a return if the condition is not met
        })}
      </div>
    </div>
  );
};

export default ArtDisplay;
