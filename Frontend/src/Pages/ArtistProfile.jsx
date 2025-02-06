import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiImageAddFill } from "react-icons/ri";
import { z } from "zod";
import { MdArrowBackIos } from "react-icons/md";
import axios from "axios"; // Import axios for making HTTP requests

const ArtistProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [isProfileComplete, setIsProfileComplete] = useState(false); // Track if profile is complete
  const fileInputRef = React.useRef();
  const navigate = useNavigate();

  // Define Zod schema for form validation
  const schema = z.object({
    fullName: z.string().min(1, "Full Name is required"),
    username: z.string().min(1, "Username is required"),
    lastName: z.string().min(1, "Last Name is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    email: z.string().email("Invalid email address"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters"),
  });

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Set the uploaded image's data URL
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input on image click
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Collect form data
    const formData = new FormData();
    formData.append("fullName", event.target.fullName.value);
    formData.append("username", event.target.username.value);
    formData.append("lastName", event.target.lastName.value);
    formData.append("password", event.target.password.value);
    formData.append("email", event.target.email.value);
    formData.append("description", event.target.description.value);

    // If there's an image, append it to FormData
    if (profileImage) {
      const imageFile = fileInputRef.current.files[0];
      formData.append("profileImage", imageFile);
    }

    // Validate using Zod schema
    try {
      schema.parse({
        fullName: event.target.fullName.value,
        username: event.target.username.value,
        lastName: event.target.lastName.value,
        password: event.target.password.value,
        email: event.target.email.value,
        description: event.target.description.value,
      });

      setErrors({});
      setIsProfileComplete(true); // Mark profile as complete

      // Retrieve JWT token from localStorage or context
      const token = sessionStorage.getItem("jwtToken"); // Replace with actual token storage method
      console.log("Retrieved JWT Token:", token);
      // Submit the form data to backend using Axios with the token in the Authorization header
      try {
        const response = await axios.post(
          "http://localhost:8080/api/artist/addArtist", // Replace with your backend URL
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Necessary for file upload
              Authorization: `Bearer ${token}`, // Include JWT token
            },
          }
        );

        console.log("Profile created successfully", response.data);
        // You can navigate or perform other actions after successful submission
      } catch (error) {
        console.error("Error while submitting form", error);
      }
    } catch (err) {
      if (err.errors) {
        // Map Zod errors to state
        const errorMap = {};
        err.errors.forEach((error) => {
          errorMap[error.path[0]] = error.message;
        });
        setErrors(errorMap);
      }
      setIsProfileComplete(false); // Mark profile as incomplete
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-sky-100 shadow-lg rounded-lg">
      {/* Header */}
      <div className="text-black flex justify-between items-center px-6 py-4 rounded-t-lg">
        <h1 className="text-2xl font-semibold">Artist Profile</h1>
      </div>

      {/* Profile Content */}
      <form className="p-8" onSubmit={handleSubmit}>
        {/* Profile Image */}
        <div className="flex flex-col justify-center items-center mb-6">
          <div
            className="relative w-28 h-28 rounded-full border-2 border-sky-700 flex justify-center items-center cursor-pointer bg-gray-100"
            onClick={handleImageClick} // Trigger file input
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span className="text-gray-500 text-3xl">
                <RiImageAddFill className="mr-2" />
              </span>
            )}
          </div>
          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }} // Hidden input
            onChange={handleImageUpload}
          />
          <p className="mt-2 text-sm text-gray-500">
            Upload a profile picture (PNG, JPG)
          </p>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              First Name
            </label>
            <input
              name="fullName"
              type="text"
              placeholder="Your First Name"
              className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName}</p>
            )}
          </div>

          {/* Username */}
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Username
            </label>
            <input
              name="username"
              type="text"
              placeholder="Your username"
              className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Last Name
            </label>
            <input
              name="lastName"
              type="text"
              placeholder="Your Last Name"
              className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="Your password"
              className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="Your email"
              className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-gray-600 text-sm font-medium">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Description about artist"
              rows="4"
              className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>
        </div>

        {/* Buttons for navigation */}
        <div className="flex justify-between items-center mt-6">
          {/* Back Button */}
          <button
            className="px-4 py-2 text-black focus:outline-none"
            onClick={() => navigate("/")}
          >
            <MdArrowBackIos className="mr-2" />
          </button>

          {/* Other Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-sky-800 text-white px-6 py-2 rounded-full hover:bg-sky-950"
            >
              Submit
            </button>
            <button
              className={`px-6 py-2 rounded-full ${
                isProfileComplete
                  ? "bg-sky-800 text-white  hover:bg-sky-950"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
              onClick={() => navigate("/add-art")}
            >
              Add Art
            </button>
            <button
              className={`px-6 py-2 rounded-full ${
                isProfileComplete
                  ? "bg-sky-800 text-white hover:bg-sky-950"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
              onClick={() => {
                const artistName = document.querySelector(
                  "input[name='fullName']"
                ).value;
                if (artistName) {
                  navigate(`/artist-detail/${artistName}`);
                }
              }}
            >
              See My Profile
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ArtistProfile;
