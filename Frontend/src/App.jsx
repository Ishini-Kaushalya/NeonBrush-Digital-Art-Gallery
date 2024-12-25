import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import Cart from "./Pages/Cart";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import SignInSelection from "./Pages/SignInSelection"; // Import the new page
import LoginPopup from "./Components/LoginPopup";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : null}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<Products />} />
          {/* Product Route */}
          <Route
            path="/sign-in"
            element={<SignInSelection setShowLogin={setShowLogin} />}
          />{" "}
          {/* New route */}
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
