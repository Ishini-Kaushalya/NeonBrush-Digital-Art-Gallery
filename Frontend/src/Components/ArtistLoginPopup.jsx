import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoCloseCircleOutline } from "react-icons/io5";  // Import the icon

const ArtistLoginPopup = ({ setShowLogin }) => {
  const [formState, setFormState] = useState("Login");
  const [formData, setFormData] = useState({ username: "", email: "", password: "" }); // Added email
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const apiEndpoint = formState === "Sign Up"
        ? "http://localhost:8080/api/auth/signup"
        : "http://localhost:8080/api/auth/signin";

      const payload = formState === "Sign Up"
        ? { username: formData.username, email: formData.email, password: formData.password } // Include email for sign-up
        : { username: formData.username, password: formData.password }; // For login, no email

      const response = await axios.post(apiEndpoint, payload, {
        headers: { "Content-Type": "application/json" }
      });

      setMessage(response.data.message || "Operation successful!");
      if (formState === "Login" && response.status === 200) {
        navigate("/artist-profile");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <div className="flex justify-between items-center text-black">
          <h2 className="text-xl font-semibold">{formState}</h2>
          <IoCloseCircleOutline onClick={() => setShowLogin(false)} className="w-6 h-6 cursor-pointer text-gray-600 hover:text-red-500" />
        </div>

        {/* Message */}
        {message && <p className="text-center text-sm text-red-500 mt-4">{message}</p>}

        {/* Input Fields */}
        <div className="flex flex-col gap-5 mt-4">
          <input
            type="text"
            name="username"
            placeholder="Your username"
            required
            className="border border-gray-300 p-3 rounded-md text-sm focus:ring-2 focus:ring-tomato outline-none"
            value={formData.username}
            onChange={handleInputChange}
          />
          {formState === "Sign Up" && (
            <input
              type="email"
              name="email"
              placeholder="Your email"
              required
              className="border border-gray-300 p-3 rounded-md text-sm focus:ring-2 focus:ring-tomato outline-none"
              value={formData.email}
              onChange={handleInputChange}
            />
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="border border-gray-300 p-3 rounded-md text-sm focus:ring-2 focus:ring-tomato outline-none"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md text-sm font-medium hover:bg-tomato-dark mt-4"
          onClick={handleSubmit}
        >
          {formState === "Sign Up" ? "Create account" : "Login"}
        </button>

        {/* Toggle Between Login and Sign Up */}
        <div className="text-center mt-4">
          <span className="text-sm">
            {formState === "Login" ? "Don't have an account?" : "Already have an account?"}
          </span>
          <button
            onClick={() => setFormState(formState === "Login" ? "Sign Up" : "Login")}
            className="text-tomato text-sm font-medium hover:underline ml-1"
          >
            {formState === "Login" ? "Sign Up" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtistLoginPopup;
