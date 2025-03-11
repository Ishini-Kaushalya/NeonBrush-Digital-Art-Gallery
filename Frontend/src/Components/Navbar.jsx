import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/Common/assets.js";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { StoreContext } from "../Context/StoreContext.jsx";
import { TbBasketFilled } from "react-icons/tb";
import axios from "axios";

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const { getCartSize } = useContext(StoreContext);
  const [isArtist, setIsArtist] = useState(false); // State to check if the user is an artist
  const [loading, setLoading] = useState(true); // State to track loading status
  const [isSignedIn, setIsSignedIn] = useState(false); // State to track authentication status
  const location = useLocation();
  const navigate = useNavigate();

  // Check if the user is signed in on component mount
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("accessToken"));
    setIsSignedIn(!!token); // Set isSignedIn to true if token exists
  }, []);

  // Fetch the current user's role
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("accessToken"));

        if (!token) {
          console.error("No token found, please login first.");
          setIsArtist(false); // Assume the user is not an artist if no token is found
          return;
        }

        // Fetch the user's role
        const roleResponse = await axios.get(
          "http://localhost:8080/api/user/role",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Check if the user is an artist
        setIsArtist(roleResponse.data.includes("ROLE_ARTIST"));
      } catch (error) {
        console.error("Error fetching user role:", error);
        setIsArtist(false); // Assume the user is not an artist if there's an error
      } finally {
        setLoading(false); // Set loading to false after the request completes
      }
    };

    fetchUserRole();
  }, []);

  // Update menu state based on the current location (URL)
  useEffect(() => {
    if (location.pathname === "/") {
      setMenu("home");
    } else if (location.pathname === "/products") {
      setMenu("arts");
    } else if (location.pathname === "/contact-us") {
      setMenu("contact-us");
    } else if (location.pathname === "/cart") {
      setMenu("cart");
    } else if (location.pathname === "/sign-in") {
      setMenu("sign-in");
    } else if (location.pathname === "/artist-profile") {
      setMenu("artist-profile");
    }
  }, [location.pathname]);

  // Handle sign out
  const handleSignOut = () => {
    localStorage.removeItem("accessToken"); // Remove the token from localStorage
    setIsSignedIn(false); // Update authentication status
    setIsArtist(false); // Reset artist status
    navigate("/"); // Redirect to home page
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or message
  }

  return (
    <div className="flex justify-between items-center px-24 py-5 mb-[-40px]">
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="w-[80px]" />
      </Link>
      <ul className="flex gap-12 text-[#49557e] text-lg">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={`cursor-pointer ${
            menu === "home" ? "border-b-2 pb-1 border-sky-600" : ""
          }`}
        >
          Home
        </Link>
        <Link
          to="/products"
          onClick={() => setMenu("menu")}
          className={`cursor-pointer ${
            menu === "arts" ? "border-b-2 pb-1 border-sky-600" : ""
          }`}
        >
          All Arts
        </Link>
        <Link
          to="/contact-us"
          onClick={() => setMenu("contact-us")}
          className={`cursor-pointer ${
            menu === "contact-us" ? "border-b-2 pb-1 border-sky-600" : ""
          }`}
        >
          Contact us
        </Link>
        {/* Add Artists Link */}
        <Link
          to="/show-artist"
          onClick={() => setMenu("artists")}
          className={`cursor-pointer ${
            menu === "artists" ? "border-b-2 pb-1 border-[#38bdf8]" : ""
          }`}
        >
          Artists
        </Link>
      </ul>

      <div className="flex items-center gap-10">
        <div className="relative">
          <Link to="/cart" className="cursor-pointer">
            <TbBasketFilled className="w-[30px] h-[30px] text-gray-700" />
          </Link>
          <div
            className={
              getCartSize() === 0
                ? ""
                : "absolute top-[-8px] right-[-8px] w-[10px] h-[10px] bg-[#38bdf8] rounded-full"
            }
          ></div>
        </div>
        {/* Conditionally render Sign In or Sign Out button */}
        {isSignedIn ? (
          <>
            <button
              onClick={handleSignOut}
              className="bg-transparent text-[#49557e] text-base border-2 border-tomato rounded-full py-2 px-7 cursor-pointer transition duration-300 ease-in-out hover:bg-[#f0f9ff] hover:border-[#49557e]"
            >
              Sign Out
            </button>
            {/* Conditionally render the Artist Profile button */}
            {isArtist && (
              <Link to="/artist-profile" className="cursor-pointer">
                <FaUserCircle className="w-[30px] h-[30px] text-gray-700" />
              </Link>
            )}
          </>
        ) : (
          <Link to="/sign-in">
            <button className="bg-transparent text-[#49557e] text-base border-2 border-tomato rounded-full py-2 px-7 cursor-pointer transition duration-300 ease-in-out hover:bg-[#f0f9ff] hover:border-[#49557e]">
              Sign In
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
