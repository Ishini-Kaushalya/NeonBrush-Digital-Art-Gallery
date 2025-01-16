// LoginPopup.jsx
import React, { useState } from "react";
import { assets } from "../assets/Common/assets";
// src/components/Signup.js

import axios from 'axios';


const LoginPopup = ({ setShowLogin, type }) => {
  const [currState, setCurrState] = useState("Login");
  const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [roles, setRoles] = useState(['user']); // Default role
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        const signUpRequest = {
            username,
            email,
            password,
            roles,
        };

        try {
            const response = await axios.post('http://localhost:8080/api/auth/signup', signUpRequest);
            setMessage(response.data.message);
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message);
            } else {
                setMessage('An error occurred. Please try again.');
            }
        }
    };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <form className="w-full max-w-md sm:max-w-sm bg-white rounded-lg p-8 flex flex-col gap-6 animate-fadeIn shadow-lg">
        <div className="flex justify-between items-center text-black">
          <h2 className="text-xl font-semibold">{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close"
            className="w-5 h-5 cursor-pointer"
          />
        </div>
        <div className="flex flex-col gap-5">
          {currState === "Sign Up" && (
            <input
              type="text"
              placeholder="Your name"
              required
              className="outline-none border border-gray-300 p-3 rounded-md text-sm focus:ring-2 focus:ring-tomato"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          )}
          <input
            type="email"
            placeholder="Your email"
            required
            className="outline-none border border-gray-300 p-3 rounded-md text-sm focus:ring-2 focus:ring-tomato"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="outline-none border border-gray-300 p-3 rounded-md text-sm focus:ring-2 focus:ring-tomato"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md text-sm font-medium hover:bg-tomato-dark transition duration-200"
          onSubmit={handleSubmit}
        >
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>
        <div className="flex items-start gap-2 text-xs mt-3">
          <input type="checkbox" required className="mt-[5px] accent-tomato" />
          <p>
            By continuing, I agree to the{" "}
            <span className="font-medium">terms of use</span> &{" "}
            <span className="font-medium">privacy policy</span>.
          </p>
        </div>
        {currState === "Login" ? (
          <p className="text-sm text-center">
            Create a new account?{" "}
            <span
              onClick={() => setCurrState("Sign Up")}
              className="text-tomato font-semibold cursor-pointer"
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="text-sm text-center">
            Already have an account?{" "}
            <span
              onClick={() => setCurrState("Login")}
              className="text-tomato font-semibold cursor-pointer"
            >
              Log in here
            </span>
          </p>
        )}
        {/* Customizing the footer message based on type */}
        <p className="text-sm text-center mt-4">
          {type === "user" ? "User Login" : ""}
        </p>
      </form>
    </div>
  );
};

export default LoginPopup;
