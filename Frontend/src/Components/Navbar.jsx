import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/Common/assets.js";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { StoreContext } from "../Context/StoreContext.jsx";
import { TbBasketFilled } from "react-icons/tb";
import axios from "axios";
import { motion } from "framer-motion";
import { useRef } from "react";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const [loggedInUsername, setLoggedInUsername] = useState();
  const [menu, setMenu] = useState("home");
  const { clearCart, getCartSize } = useContext(StoreContext);
  const [isArtist, setIsArtist] = useState(false); // State to check if the user is an artist
  const [loading, setLoading] = useState(true); // State to track loading status
  const [isSignedIn, setIsSignedIn] = useState(false); // State to track authentication status
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        const decodedToken = jwtDecode(token);
        const username = decodedToken.sub || decodedToken.username; // Adjust based on your token structure
        setLoggedInUsername(username);

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
    } else if (
      location.pathname === "/contact-us" &&
      loggedInUsername !== "admin"
    ) {
      setMenu("contact-us");
    } else if (location.pathname === "/cart") {
      setMenu("cart");
    } else if (location.pathname === "/sign-in") {
      setMenu("sign-in");
    } else if (location.pathname === "/artist-profile") {
      setMenu("artist-profile");
    } else if (location.pathname === "/notifications") {
      setMenu("notifications");
    } else if (
      location.pathname === "/order-detail" &&
      loggedInUsername === "admin"
    ) {
      setMenu("order-details");
    }
  }, [location.pathname, loggedInUsername]);

  // Handle sign out
  const handleSignOut = () => {
    localStorage.removeItem("accessToken"); // Remove the token from localStorage
    setIsSignedIn(false); // Update authentication status
    setIsArtist(false); // Reset artist status
    clearCart();
    navigate("/"); // Redirect to home page
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or message
  }

  return (
    <div className='flex justify-between items-center px-24 py-5 mb-[-40px]'>
      <Link to='/'>
        <img src={assets.logo} alt='Logo' className='w-[80px]' />
      </Link>
      <ul className='flex gap-12 text-[#49557e] text-lg'>
        <Link
          to='/'
          onClick={() => setMenu("home")}
          className={`cursor-pointer ${
            menu === "home" ? "border-b-2 pb-1 border-sky-600" : ""
          }`}
        >
          Home
        </Link>
        <Link
          to='/products'
          onClick={() => setMenu("menu")}
          className={`cursor-pointer ${
            menu === "arts" ? "border-b-2 pb-1 border-sky-600" : ""
          }`}
        >
          All Arts
        </Link>
        {loggedInUsername === "admin" && (
          <Link
            to='/order-detail'
            onClick={() => setMenu("order-details")}
            className={`cursor-pointer ${
              menu === "order-details" ? "border-b-2 pb-1 border-sky-600" : ""
            }`}
          >
            Order Details
          </Link>
        )}
        {loggedInUsername !== "admin" && (
          <Link
            to='/contact-us'
            onClick={() => setMenu("contact-us")}
            className={`cursor-pointer ${
              menu === "contact-us" ? "border-b-2 pb-1 border-sky-600" : ""
            }`}
          >
            Contact us
          </Link>
        )}

        {/* Conditionally render Notification button for artists */}
        {isArtist && (
          <Link
            to='/notifications'
            onClick={() => setMenu("notifications")}
            className={`cursor-pointer ${
              menu === "notifications" ? "border-b-2 pb-1 border-sky-600" : ""
            }`}
          >
            Notification
          </Link>
        )}
        {/* Add Artists Link */}
        <Link
          to='/show-artist'
          onClick={() => setMenu("artists")}
          className={`cursor-pointer ${
            menu === "artists" ? "border-b-2 pb-1 border-[#38bdf8]" : ""
          }`}
        >
          Artists
        </Link>
      </ul>

      <div className='flex items-center gap-10'>
        <div className='relative'>
          <Link to='/cart' className='cursor-pointer'>
            <TbBasketFilled className='w-[30px] h-[30px] text-gray-700' />
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
              className='bg-transparent text-[#49557e] text-base border-2 border-tomato rounded-full py-2 px-7 cursor-pointer transition duration-300 ease-in-out hover:bg-[#f0f9ff] hover:border-[#49557e]'
            >
              Sign Out
            </button>
            {/* Conditionally render the Artist Profile button */}
            {isArtist && (
              <div className='relative'>
                <FaUserCircle
                  className='w-[30px] h-[30px] text-gray-700 cursor-pointer'
                  onClick={toggleDropdown}
                />
                {dropdownOpen && (
                  <motion.div
                    ref={dropdownRef}
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 100, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className='absolute right-0 top-0 mt-2 bg-white shadow-lg rounded-lg border border-gray-300 z-10 w-48'
                  >
                    <ul className='flex flex-col'>
                      <li>
                        <Link
                          to='/artist-profile'
                          onClick={closeDropdown}
                          className='block px-4 py-2 text-gray-700 hover:bg-gray-100'
                        >
                          My Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to='/artist-artworks'
                          onClick={closeDropdown}
                          className='block px-4 py-2 text-gray-700 hover:bg-gray-100'
                        >
                          My Artworks
                        </Link>
                      </li>
                      <li>
                        <Link
                          to='/add-art'
                          onClick={closeDropdown}
                          className='block px-4 py-2 text-gray-700 hover:bg-gray-100'
                        >
                          Add Art
                        </Link>
                      </li>
                      <li>
                        <Link
                          to='/order-detail'
                          onClick={closeDropdown}
                          className='block px-4 py-2 text-gray-700 hover:bg-gray-100'
                        >
                          See Orders
                        </Link>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </div>
            )}
          </>
        ) : (
          <Link to='/sign-in'>
            <button className='bg-transparent text-[#49557e] text-base border-2 border-tomato rounded-full py-2 px-7 cursor-pointer transition duration-300 ease-in-out hover:bg-[#f0f9ff] hover:border-[#49557e]'>
              Sign In
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
