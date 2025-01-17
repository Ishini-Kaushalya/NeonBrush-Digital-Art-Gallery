import React, { useState } from "react";
import axios from "axios";
import { assets } from "../assets/Common/assets";
import { useNavigate } from "react-router-dom";

const LoginPopup = ({ setShowLogin, type }) => {
  const [formState, setFormState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    roles: [type], // Set role based on the passed type
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = () => {
    setTermsAccepted(!termsAccepted);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!termsAccepted && formState === "Sign Up") {
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
              username: formData.username,
              password: formData.password,
            };

      const response = await axios.post(apiEndpoint, payload, {
        headers: { "Content-Type": "application/json" },
      });

      setMessage(response.data.message || "Operation successful!");

      if (formState === "Login" && response.status === 200) {
        navigate("/Products");
      }
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
        <div className="flex justify-between items-center text-black">
          <h2 className="text-xl font-semibold">{formState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close"
            className="w-5 h-5 cursor-pointer"
          />
        </div>
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
          {formState === "Sign Up" ? (
            <input
              type="email"
              name="email"
              placeholder="Your email"
              required
              className="outline-none border border-gray-300 p-3 rounded-md text-sm focus:ring-2 focus:ring-tomato"
              value={formData.email}
              onChange={handleInputChange}
            />
          ) : (
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              className="outline-none border border-gray-300 p-3 rounded-md text-sm focus:ring-2 focus:ring-tomato"
              value={formData.username}
              onChange={handleInputChange}
            />
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="outline-none border border-gray-300 p-3 rounded-md text-sm focus:ring-2 focus:ring-tomato"
            value={formData.password}
            onChange={handleInputChange}
          />
          {formState === "Sign Up" && (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4"
                checked={termsAccepted}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I accept the{" "}
                <a href="#" className="text-tomato">
                  terms and conditions
                </a>
              </label>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md text-sm font-medium hover:bg-tomato-dark transition duration-200"
        >
          {formState === "Sign Up" ? "Create account" : "Login"}
        </button>
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
        {type === "artist" && (
          <p className="text-sm text-center">Artist Signup</p>
        )}
        {message && <p className="text-center text-red-500">{message}</p>}
      </form>
    </div>
  );
};

export default LoginPopup;
