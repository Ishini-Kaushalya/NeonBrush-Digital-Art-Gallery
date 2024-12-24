import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import Cart from "./Pages/Cart";
import SignInSelection from "./Pages/SignInSelection";
import { useState } from "react";
import LoginPopup from "./Components/LoginPopup";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : null}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/cart' element={<Cart />} />
          <Route
            path='/sign-in'
            element={<SignInSelection setShowLogin={setShowLogin} />}
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
