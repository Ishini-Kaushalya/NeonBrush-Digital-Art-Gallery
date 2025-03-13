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
  const { getCartSize } = useContext(StoreContext);
  const [isArtist, setIsArtist] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [notification, setNotification] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [hasProfile, setHasProfile] = useState(false); // State to track if the user has a profile
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("accessToken"));
    setIsSignedIn(!!token);
  }, []);

  useEffect(() => {
    const fetchUserRoleAndProfile = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("accessToken"));

        if (!token) {
          console.error("No token found, please login first.");
          setIsArtist(false);
          return;
        }

        const decodedToken = jwtDecode(token);
        const username = decodedToken.sub || decodedToken.username;
        setLoggedInUsername(username);

        // Fetch user role
        const roleResponse = await axios.get(
          "http://localhost:8080/api/user/role",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsArtist(roleResponse.data.includes("ROLE_ARTIST"));

        // Check if the user has a profile
        if (roleResponse.data.includes("ROLE_ARTIST")) {
          try {
            const profileResponse = await axios.get(
              `http://localhost:8080/api/artist/username/${username}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setHasProfile(!!profileResponse.data); // Set hasProfile to true if profile exists
          } catch (error) {
            if (error.response?.status === 404) {
              setHasProfile(false); // No profile found
            } else {
              console.error("Error fetching profile:", error);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching user role or profile:", error);
        setIsArtist(false);
        setHasProfile(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRoleAndProfile();
  }, []);

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

  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    setIsSignedIn(false);
    setIsArtist(false);
    setHasProfile(false);
    navigate("/");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleDeleteProfile = async () => {
    setConfirmDelete(true);
  };

  const confirmDeleteProfile = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const response = await axios.delete(
        `http://localhost:8080/api/artist/username/${loggedInUsername}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotification("Profile deleted successfully!");
      setHasProfile(false); // Update hasProfile state
      handleSignOut(); // Sign out the user after deleting the profile
    } catch (error) {
      console.error("Error deleting profile:", error);
      setNotification("Failed to delete profile. Please try again.");
    } finally {
      setConfirmDelete(false);
    }
  };

  const cancelDeleteProfile = () => {
    setConfirmDelete(false);
  };

  if (loading) {
    return <div>Loading...</div>;
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
        {loggedInUsername === "admin" && (
          <Link
            to="/order-detail"
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
            to="/contact-us"
            onClick={() => setMenu("contact-us")}
            className={`cursor-pointer ${
              menu === "contact-us" ? "border-b-2 pb-1 border-sky-600" : ""
            }`}
          >
            Contact us
          </Link>
        )}
        {isArtist && (
          <Link
            to="/notifications"
            onClick={() => setMenu("notifications")}
            className={`cursor-pointer ${
              menu === "notifications" ? "border-b-2 pb-1 border-sky-600" : ""
            }`}
          >
            Notification
          </Link>
        )}
        
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
        {isSignedIn ? (
          <>
            <button
              onClick={handleSignOut}
              className="bg-transparent text-[#49557e] text-base border-2 border-tomato rounded-full py-2 px-7 cursor-pointer transition duration-300 ease-in-out hover:bg-[#f0f9ff] hover:border-[#49557e]"
            >
              Sign Out
            </button>
            {isArtist && (
              <div className="relative">
                <FaUserCircle
                  className="w-[30px] h-[30px] text-gray-700 cursor-pointer"
                  onClick={toggleDropdown}
                />
                {dropdownOpen && (
                  <motion.div
                    ref={dropdownRef}
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 100, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute right-0 top-0 mt-2 bg-white shadow-lg rounded-lg border border-gray-300 z-10 w-48"
                  >
                    <ul className="flex flex-col">
                      <li>
                        <Link
                          to={`/artist-detail/${loggedInUsername}`}
                          onClick={closeDropdown}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          My Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/artist-profile"
                          onClick={closeDropdown}
                          className={`block px-4 py-2 text-gray-700 ${
                            hasProfile
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:bg-gray-100"
                          }`}
                          style={{
                            pointerEvents: hasProfile ? "none" : "auto",
                          }} // Disable click if hasProfile is true
                        >
                          Create Profile
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleDeleteProfile}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          Delete Profile
                        </button>
                      </li>
                      <li>
                        <Link
                          to="/artist-artworks"
                          onClick={closeDropdown}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          My Artworks
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/add-art"
                          onClick={closeDropdown}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Add Art
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/order-detail"
                          onClick={closeDropdown}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
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
          <Link to="/sign-in">
            <button className="bg-transparent text-[#49557e] text-base border-2 border-tomato rounded-full py-2 px-7 cursor-pointer transition duration-300 ease-in-out hover:bg-[#f0f9ff] hover:border-[#49557e]">
              Sign In
            </button>
          </Link>
        )}
      </div>
      {notification && (
        <div className="fixed top-4 right-4 bg-white border border-gray-300 shadow-lg rounded-lg p-4">
          <p>{notification}</p>
        </div>
      )}
      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="mb-4">
              Are you sure you want to delete your profile?
            </p>
            <div className="flex justify-end">
              <button
                onClick={confirmDeleteProfile}
                className="px-4 py-2 mr-2 text-white bg-red-500 rounded hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={cancelDeleteProfile}
                className="px-4 py-2 text-gray-700 bg-gray-300 rounded hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
