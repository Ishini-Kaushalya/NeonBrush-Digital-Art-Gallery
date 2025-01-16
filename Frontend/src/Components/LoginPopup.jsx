import React, { useState } from "react";
import axios from "axios";
import { assets } from "../assets/Common/assets";

const LoginPopup = ({ setShowLogin, type }) => {
  const [formState, setFormState] = useState("Login"); // Toggles between Login and Sign Up
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    roles: ["user"],
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [message, setMessage] = useState("");

  // Handles input changes dynamically
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!termsAccepted) {
      setMessage("You must accept the terms and conditions.");
      return;
    }

    try {
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
              roles: formData.roles,
            }
          : {
              email: formData.email,
              password: formData.password,
            };

      const response = await axios.post(apiEndpoint, payload, {
        headers: { "Content-Type": "application/json" },
      });

      setMessage(response.data.message || "Operation successful!");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <form
        className="w-full max-w-md bg-white rounded-lg p-8 flex flex-col gap-6 shadow-lg"
        onSubmit={handleSubmit}
      >
        {/* Header */}
        <div className="flex justify-between items-center text-black">
          <h2 className="text-xl font-semibold">{formState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close"
            className="w-5 h-5 cursor-pointer"
          />
        </div>

        {/* Input Fields */}
        <div className="flex flex-col gap-5">
          {formState === "Sign Up" && (
            <input
              type="text"
              name="username"
              placeholder="Your name"
              required
              className="outline-none border border-gray-300 p-3 rounded-md text-sm focus:ring-2 focus:ring-tomato"
              value={formData.username}
              onChange={handleInputChange}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Your email"
            required
            className="outline-none border border-gray-300 p-3 rounded-md text-sm focus:ring-2 focus:ring-tomato"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="outline-none border border-gray-300 p-3 rounded-md text-sm focus:ring-2 focus:ring-tomato"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md text-sm font-medium hover:bg-tomato-dark transition duration-200"
        >
          {formState === "Sign Up" ? "Create account" : "Login"}
        </button>

        {/* Terms and Conditions */}
        <div className="flex items-start gap-2 text-xs mt-3">
          <input
            type="checkbox"
            required
            className="mt-[5px] accent-tomato"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />
          <p>
            By continuing, I agree to the{" "}
            <span className="font-medium">terms of use</span> &{" "}
            <span className="font-medium">privacy policy</span>.
          </p>
        </div>

        {/* Toggle Between Login and Sign Up */}
        <p className="text-sm text-center">
          {formState === "Login" ? (
            <>
              Create a new account?{" "}
              <span
                onClick={() => setFormState("Sign Up")}
                className="text-tomato font-semibold cursor-pointer"
              >
                Click here
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setFormState("Login")}
                className="text-tomato font-semibold cursor-pointer"
              >
                Log in here
              </span>
            </>
          )}
        </p>

        {/* Login Type Information */}
        {type === "user" && (
          <p className="text-sm text-center mt-4">User Login</p>
        )}

        {/* Feedback Message */}
        {message && <p className="text-center text-red-500">{message}</p>}
      </form>
    </div>
  );
};

export default LoginPopup;
