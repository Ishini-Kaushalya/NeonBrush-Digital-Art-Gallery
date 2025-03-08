import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import Cart from "./Pages/Cart";
import SignInSelection from "./Pages/SignInSelection";
import { useState } from "react";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ArtDetail from "./Pages/ArtDetail";
import ArtistDetail from "./Pages/ArtistDetail";
import ContactUs from "./Pages/ContactUs";
import PaymentPage from './Pages/Payment';
import ArtistProfile from './Pages/ArtistProfile';
import AddArtItem from './Pages/AddArtItem'; // Import AddArtItem page
import AdminLoginPopup from './Components/AdminLoginPopup';
import ArtistLoginPopup from './Components/ArtistLoginPopup'; // Import ArtistLoginPopup
import UserLoginPopup from './Components/UserLoginPopup'; // Import UserLoginPopup
import Admin from "./Pages/Admin";
import ShowArtist from "./Pages/ShowArtist";
import AboutUS from "./Components/AboutUs";


const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [loginType, setLoginType] = useState(""); // Holds the type of login: 'artist' or 'user'
  return (
    <>
      {/* Display the login popup based on the loginType */}
      {showLogin &&
        (loginType === "artist" ? (
          <ArtistLoginPopup setShowLogin={setShowLogin} />
        ) : loginType === "admin" ? (
          <AdminLoginPopup setShowLogin={setShowLogin} />
        ) : (
          <UserLoginPopup setShowLogin={setShowLogin} />
        ))}

      <div className="app">
        {/* Navbar with login control */}
        <Navbar setShowLogin={setShowLogin} setLoginType={setLoginType} />

        {/* Define all the routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/sign-in"
            element={
              <SignInSelection
                setShowLogin={setShowLogin}
                setLoginType={setLoginType}
              />
            }
          />
          <Route path="/art-detail" element={<ArtDetail />} />{" "}
          <Route path="/artist-detail/:id" element={<ArtistDetail />} />
          <Route path="/contact-us" element={<ContactUs />} />{" "}
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/artist-profile" element={<ArtistProfile />} />
          <Route path="/add-art" element={<AddArtItem />} />{" "}
          {/* Add Art Item Route */}
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/aboutUs" element={<AboutUS />} />
          <Route path="/show-artist" element={<ShowArtist />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
