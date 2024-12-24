import { useState } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import ExploreMenu from "../Components/ExploreMenu";

const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
    </>
  );
};

export default Home;
