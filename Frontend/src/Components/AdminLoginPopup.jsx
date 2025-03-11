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

    try {
      // Validate form data using Zod schema
      loginSchema.parse(formData);

      const apiEndpoint = "http://localhost:8080/api/auth/signin";

      const payload = {
        username: formData.username,
        password: formData.password,
      };

      const response = await axios.post(apiEndpoint, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        // Save JWT token in localStorage
        const token = response.data.accessToken; // Adjust based on your response structure
        if (token) {
          console.log("Login successful. JWT Token received:", token);
          localStorage.setItem("accessToken", JSON.stringify(token)); // Store the token in localStorage
        }

        // Close the popup and navigate to the admin dashboard
        setShowLogin(false);
        navigate("/admin");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle Zod validation errors
        const fieldErrors = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else if (error.response) {
        // Handle backend errors
        const errorMessage = error.response.data;

        if (errorMessage === "Incorrect username") {
          setErrors({ username: "Incorrect username" });
        } else if (errorMessage === "Incorrect password") {
          setErrors({ password: "Incorrect password" });
        } else {
          setErrors({ general: errorMessage });
        }
      } else {
        // Handle other errors (e.g., network issues)
        setErrors({
          general: "An error occurred. Please try again.",
        });
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md relative">
        <div className="flex justify-between items-center text-black mb-4">
          <h2 className="text-lg font-medium">Admin Login</h2>
          <IoCloseCircleOutline
            onClick={() => setShowLogin(false)}
            className="w-6 h-6 cursor-pointer text-gray-600 hover:text-red-500"
          />
        </div>

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
