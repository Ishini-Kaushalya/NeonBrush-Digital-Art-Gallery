import { useState } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import ExploreMenu from "../Components/ExploreMenu";

const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <>
      <Navbar />
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <Footer />
    </>
  );
};

export default Home;
