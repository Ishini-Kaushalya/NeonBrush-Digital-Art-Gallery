import { useState } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import ExploreMenu from "../Components/ExploreMenu";
import ArtDisplay from "../Components/ArtDisplay";

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
