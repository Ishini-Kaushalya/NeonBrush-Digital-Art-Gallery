import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import Header from "../Components/Header";
import ExploreMenu from "../Components/ExploreMenu";
import ArtDisplay from "../Components/ArtDisplay";

const Home = () => {
  const [category, setCategory] = useState("All");
  const navigate = useNavigate(); // For navigation

 const handleCategoryChange = (newCategory) => {
   setCategory(newCategory);
   navigate("/products", { state: { category: newCategory } }); // Navigate to Products page with category
 };


  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={handleCategoryChange} />
      {/* <ArtDisplay category={category} /> */}
    </div>
  );
};

export default Home;
