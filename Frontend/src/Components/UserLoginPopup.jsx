import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoCloseCircleOutline } from "react-icons/io5";
import { z } from "zod";
import { StoreContext } from "../Context/StoreContext";

const UserLoginPopup = ({ setShowLogin }) => {
  const [formState, setFormState] = useState("Login"); // Tracks whether the form is in "Login" or "Sign Up" mode
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    agreeTerms: false,
  });
  const { clearCart } = useContext(StoreContext);
  const [errors, setErrors] = useState({}); // Stores validation errors
  const navigate = useNavigate();

  // Define schemas for login and signup using Zod
    const loginSchema = z.object({
      username: z.string().min(1, "Username is required"),
      password: z.string().min(6, "Password must be at least 6 characters"),
       });

  const signupSchema = z.object({
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    agreeTerms: z
      .boolean()
      .refine((val) => val, "You must agree to the terms and privacy policy"),
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    setErrors({ ...errors, [name]: "" }); // Clear errors for the updated field
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors

    try {
      // Validate form data using the appropriate schema
      const schema = formState === "Sign Up" ? signupSchema : loginSchema;
      schema.parse(formData);

      // Determine the API endpoint based on the form state
      const apiEndpoint =
        formState === "Sign Up"
          ? "http://localhost:8080/api/auth/signup"
          : "http://localhost:8080/api/auth/signin";

      // Prepare the payload for the API request
      const payload =
        formState === "Sign Up"
          ? {
              username: formData.username,
              email: formData.email,
              password: formData.password,
              roles: ["user"], // Assign the "user" role
            }
          : { username: formData.username, password: formData.password };

      // Send the request to the backend
      const response = await axios.post(apiEndpoint, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        if (formState === "Sign Up") {
          // After successful sign-up, switch to the login form
          setFormState("Login");
          // Clear the form data except for the username
          setFormData({
            ...formData,
            email: "",
            password: "",
            agreeTerms: false,
          });
        } else {
          // Save the JWT token in localStorage
          const token = response.data.accessToken; // Adjust based on your response structure
          if (token) {
            console.log("Login successful. JWT Token received:", token);
            localStorage.setItem("accessToken", JSON.stringify(token)); // Store the token
          }

          // Close the login popup and navigate to the products page
          setShowLogin(false);
          clearCart();
          navigate("/products");
        }
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
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
        setErrors({
          general: "An error occurred. Please try again.",
        });
      }
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
      <div className='bg-white rounded-lg shadow-md p-6 w-full max-w-md relative'>
        <div className='flex justify-between items-center text-black mb-4'>
          <h2 className='text-lg font-medium'>{formState}</h2>
          <IoCloseCircleOutline
            onClick={() => setShowLogin(false)}
            className='w-6 h-6 cursor-pointer text-gray-600 hover:text-red-500'
          />
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='flex flex-col'>
            <label className='text-sm font-medium text-gray-700'>
              Username
            </label>
            <input
              type='text'
              name='username'
              placeholder='Enter your username'
              className='border border-gray-300 p-2 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none'
              value={formData.username}
              onChange={handleInputChange}
            />
            {errors.username && (
              <p className='text-xs text-red-500 mt-1'>{errors.username}</p>
            )}
          </div>

          {formState === "Sign Up" && (
            <div className='flex flex-col'>
              <label className='text-sm font-medium text-gray-700'>Email</label>
              <input
                type='email'
                name='email'
                placeholder='Enter your email'
                className='border border-gray-300 p-2 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none'
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && (
                <p className='text-xs text-red-500 mt-1'>{errors.email}</p>
              )}
            </div>
          )}

          <div className='flex flex-col'>
            <label className='text-sm font-medium text-gray-700'>
              Password
            </label>
            <input
              type='password'
              name='password'
              placeholder='Enter your password'
              className='border border-gray-300 p-2 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none'
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && (
              <p className='text-xs text-red-500 mt-1'>{errors.password}</p>
            )}
          </div>
            {/* Conditionally render the checkbox only for Sign Up */}
{formState === "Sign Up" && (
            <>
          <div className='flex items-start gap-2 text-xs mt-3'>
            <input
              type='checkbox'
              name='agreeTerms'
              className='mt-1 accent-indigo-600'
              checked={formData.agreeTerms}
              onChange={handleInputChange}
            />
            <p>
              By continuing, I agree to the{" "}
              <span className='font-medium'>terms of use</span> &{" "}
              <span className='font-medium'>privacy policy</span>.
            </p>
          </div>
          {errors.agreeTerms && (
            <p className="text-xs text-red-500">{errors.agreeTerms}</p>
          )}
          </>
        )}
          {errors.general && (
            <p className="text-sm text-center text-red-500">{errors.general}</p>
          )}

          <button
            type='submit'
            className='w-full bg-sky-800 text-white py-2 rounded font-medium hover:bg-sky-950 transition'
          >
            {formState === "Sign Up" ? "Create Account" : "Login"}
          </button>
        </form>

        <div className='text-center mt-4'>
          <p className='text-sm'>
            {formState === "Login"
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <button
              onClick={() =>
                setFormState(formState === "Login" ? "Sign Up" : "Login")
              }
              className='text-sky-700 font-medium hover:underline'
            >
            {/* Wrap "Sign Up" in a span with a custom class */}
      {formState === "Login" ? (
        <span className="text-lg">Sign Up</span> // Increase font size here
      ) : (
        "Login"
      )}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLoginPopup;
