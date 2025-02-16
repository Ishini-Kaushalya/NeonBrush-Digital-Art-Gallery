import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { RiImageAddFill } from "react-icons/ri";
import { z } from "zod";
import { MdArrowBackIos } from "react-icons/md";
import axios from "axios";

const ArtistProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const fileInputRef = React.useRef();
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve username and email from the navigation state
  const { username, email } = location.state || {};

  // Zod schema for form validation
  const schema = z.object({
    firstName: z.string().min(1, "First Name is required"),
    userName: z.string().min(1, "Username is required"),
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
        setProfileImage(reader.result);
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
    const token = JSON.parse(localStorage.getItem("accessToken"));

    if (!token) {
      console.error("No token found, please login first.");
      return;
    }

    // Collect form data
    const formData = new FormData();
    formData.append("firstName", event.target.firstName.value);
    formData.append("userName", event.target.userName.value);
    formData.append("lastName", event.target.lastName.value);
    formData.append("password", event.target.password.value);
    formData.append("email", event.target.email.value);
    formData.append("description", event.target.description.value);

    // Append image if available
    if (profileImage) {
      const imageFile = fileInputRef.current.files[0];
      formData.append("image", imageFile);
    }

    // Validate using Zod schema
    try {
      schema.parse({
        firstName: event.target.firstName.value,
        userName: event.target.userName.value,
        lastName: event.target.lastName.value,
        password: event.target.password.value,
        email: event.target.email.value,
        description: event.target.description.value,
      });

      setErrors({});
      setIsProfileComplete(true);

      // Send form data to the backend
      const response = await axios.post(
        "http://localhost:8080/api/artist/addArtist",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Artist added successfully:", response.data);
      alert("Artist profile created successfully!");

      // Navigate to the artist's profile
      navigateToArtistDetail(navigate, response.data.userName);
    } catch (err) {
      if (err.errors) {
        const errorMap = {};
        err.errors.forEach((error) => {
          errorMap[error.path[0]] = error.message;
        });
        setErrors(errorMap);
      } else if (err.response) {
        console.error("Error adding artist:", err.response.data);
        alert("Failed to create artist profile: " + err.response.data.message);
      } else {
        console.error("Error:", err.message);
        alert("An unexpected error occurred.");
      }
      setIsProfileComplete(false);
    }
  };

  // Function to navigate to ArtistDetail
  const navigateToArtistDetail = (navigate, userName) => {
    if (userName) {
      navigate(`/artist-detail/${userName}`);
    } else {
      console.error("Username is not available.");
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
            onClick={handleImageClick}
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
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
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
              name="firstName"
              type="text"
              placeholder="Your First Name"
              className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>

          {/* Username */}
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Username
            </label>
            <input
              name="userName"
              type="text"
              placeholder="Your user Name"
              className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
              defaultValue={username}
            />
            {errors.userName && (
              <p className="text-red-500 text-sm">{errors.userName}</p>
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
              defaultValue={email}
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
                  "input[name='userName']"
                ).value;
                navigateToArtistDetail(navigate, artistName);
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
