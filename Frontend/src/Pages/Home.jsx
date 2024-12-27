import { useState } from "react";
import Header from "../Components/Header";
import ExploreMenu from "../Components/ExploreMenu";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    navigate("/products", { state: { category: newCategory } });
  };
  return (
    <>
      <Header />
      <ExploreMenu category={category} setCategory={handleCategoryChange} />
    </>
  );
};

export default Home;
