import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoCloseCircleOutline } from "react-icons/io5";
import { z } from "zod";

const AdminLoginPopup = ({ setShowLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(""); // State for the success message
  const [welcomeMessage, setWelcomeMessage] = useState(""); // State for welcome message after login
  const navigate = useNavigate();

  // Define schema for login
  const loginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage(""); // Reset success message on form submit
    setWelcomeMessage(""); // Reset welcome message

    try {
      loginSchema.parse(formData);

      const apiEndpoint = "http://localhost:8080/api/auth/signin";

      const response = await axios.post(apiEndpoint, formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        setWelcomeMessage(`Welcome back, ${formData.username}!`); // Set the welcome message
        setTimeout(() => navigate("/admin"), 2000); // Navigate to admin dashboard after 2 seconds
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        setErrors({
          general:
            error.response?.data?.message ||
            "An error occurred. Please try again.",
        });
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md relative">
        <div className="flex justify-between items-center text-black mb-4">
          <h2 className="text-lg font-medium">Login</h2>
          <IoCloseCircleOutline
            onClick={() => setShowLogin(false)}
            className="w-6 h-6 cursor-pointer text-gray-600 hover:text-red-500"
          />
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="text-sm text-green-500 mb-4">{successMessage}</div>
        )}

        {/* Welcome Back Message (for login) */}
        {welcomeMessage && (
          <div className="text-sm text-blue-500 mb-4">{welcomeMessage}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Field */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-sky-200 focus:outline-none"
              value={formData.username}
              onChange={handleInputChange}
            />
            {errors.username && (
              <p className="text-xs text-red-500 mt-1">{errors.username}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-sky-200 focus:outline-none"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          {/* General Error */}
          {errors.general && (
            <p className="text-sm text-center text-red-500">{errors.general}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-sky-800 text-white py-2 rounded font-medium hover:bg-sky-900 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPopup;
