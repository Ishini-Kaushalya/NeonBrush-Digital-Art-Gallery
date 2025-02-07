import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoCloseCircleOutline } from "react-icons/io5";
import { z } from "zod";

const ArtistLoginPopup = ({ setShowLogin }) => {
  const [formState, setFormState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    agreeTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(""); // State for the success message
  const [welcomeMessage, setWelcomeMessage] = useState(""); // State for welcome message after login
  const navigate = useNavigate();

  // Define schemas for login and signup
  const loginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    agreeTerms: z
      .boolean()
      .refine((val) => val, "You must agree to the terms and privacy policy"),
  });

  const signupSchema = z.object({
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    agreeTerms: z
      .boolean()
      .refine((val) => val, "You must agree to the terms and privacy policy"),
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage(""); // Reset success message on form submit
    setWelcomeMessage(""); // Reset welcome message

    try {
      const schema = formState === "Sign Up" ? signupSchema : loginSchema;
      schema.parse(formData);

      const apiEndpoint =
        formState === "Sign Up"
          ? "http://localhost:8080/api/auth/signup"
          : "http://localhost:8080/api/auth/signin";

      const payload =
        formState === "Sign Up"
          ? {
              username: formData.username,
              email: formData.email,
              password: formData.password,
              roles: ["artist"], // Add the 'artist' role during sign up
            }
          : { username: formData.username, password: formData.password };

      const response = await axios.post(apiEndpoint, payload, {
        headers: { "Content-Type": "application/json" },
      });

      
      if (response.status === 200) {
        // Save JWT token in sessionStorage
        const token = response.data.accessToken; // Adjust based on your response structure
        if (token) {
          console.log(
            "Login successful. JWT Token received:", token
          );
          localStorage.setItem("accessToken", JSON.stringify(token)); // Store the token in sessionStorage
        }

        if (formState === "Sign Up") {
          setSuccessMessage("Artist registered successfully!"); // Show success message
          setTimeout(() => {
            navigate("/artist-profile", {
              state: { username: formData.username, email: formData.email }, // Pass username and email
            });
          }, 2000); // Navigate after 2 seconds
        }

        if (formState === "Login") {
          setWelcomeMessage(`Welcome back, ${formData.username}!`); // Set the welcome message
          setTimeout(() => navigate("/artist-profile"), 2000); // Navigate to artist profile after 2 seconds
        }
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
          <h2 className="text-lg font-medium">{formState}</h2>
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
              className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={formData.username}
              onChange={handleInputChange}
            />
            {errors.username && (
              <p className="text-xs text-red-500 mt-1">{errors.username}</p>
            )}
          </div>

          {/* Email Field (Only for Sign Up) */}
          {formState === "Sign Up" && (
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>
          )}

          {/* Password Field */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Checkbox Field */}
          <div className="flex items-start gap-2 text-xs mt-3">
            <input
              type="checkbox"
              name="agreeTerms"
              className="mt-1 accent-indigo-600"
              checked={formData.agreeTerms}
              onChange={handleInputChange}
            />
            <p>
              By continuing, I agree to the{" "}
              <span className="font-medium">terms of use</span> &{" "}
              <span className="font-medium">privacy policy</span>.
            </p>
          </div>
          {errors.agreeTerms && (
            <p className="text-xs text-red-500">{errors.agreeTerms}</p>
          )}

          {/* General Error */}
          {errors.general && (
            <p className="text-sm text-center text-red-500">{errors.general}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-sky-800 text-white py-2 rounded font-medium hover:bg-sky-950 transition"
          >
            {formState === "Sign Up" ? "Create Account" : "Login"}
          </button>
        </form>

        {/* Toggle Between Login and Sign Up */}
        <div className="text-center mt-4">
          <p className="text-sm">
            {formState === "Login"
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <button
              onClick={() =>
                setFormState(formState === "Login" ? "Sign Up" : "Login")
              }
              className="text-sky-800 font-medium hover:underline"
            >
              {formState === "Login" ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArtistLoginPopup;
