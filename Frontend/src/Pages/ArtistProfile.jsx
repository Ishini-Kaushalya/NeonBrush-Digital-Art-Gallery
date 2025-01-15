import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiImageAddFill } from "react-icons/ri";
import { z } from "zod";
import { MdArrowBackIos } from "react-icons/md";
import axios from "axios";

const ArtistProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [artists, setArtists] = useState([]);
  const [artistId, setArtistId] = useState(null); // State for artist ID
  const [profileImage, setProfileImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const fileInputRef = React.useRef();
  const navigate = useNavigate();

  // Define Zod schema
  const schema = z.object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    userName: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    email: z.string().email("Invalid email address"),
    description: z.string().min(10, "Description must be at least 10 characters"),
  });

  useEffect(() => {
    loadArtists();
  }, []);

  const loadArtists = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/artist");
      setArtists(result.data);
    } catch (error) {
      console.error("Error loading artists:", error);
    }
  };

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

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      firstName,
      lastName,
      userName,
      email,
      password,
      description,
    };

    try {
      schema.parse(formData);
      setErrors({});
      setIsProfileComplete(true);

      if (artistId) {
        // Update existing artist
        await axios.put(`http://localhost:8080/api/artist/${artistId}`, formData);
        alert("Artist updated successfully");
      } else {
        // Create new artist
        await axios.post("http://localhost:8080/api/artist", formData);
        alert("Artist registered successfully");
      }

      resetForm();
      loadArtists();
    } catch (err) {
      if (err.errors) {
        const errorMap = {};
        err.errors.forEach((error) => {
          errorMap[error.path[0]] = error.message;
        });
        setErrors(errorMap);
      }
      setIsProfileComplete(false);
    }
  };

  const resetForm = () => {
    setArtistId(null);
    setFirstName("");
    setLastName("");
    setUserName("");
    setEmail("");
    setPassword("");
    setDescription("");
    setProfileImage(null);
    setErrors({});
  };

  const editArtist = (artist) => {
    setFirstName(artist.firstName);
    setLastName(artist.lastName);
    setUserName(artist.userName);
    setEmail(artist.email);
    setPassword(artist.password);
    setDescription(artist.description);
    setArtistId(artist.artistId); // Use artistId from the backend
  };

  const deleteArtist = async (id) => {
    await axios.delete(`http://localhost:8080/api/artist/${id}`);
    alert("Artist deleted successfully");
    loadArtists();
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-sky-100 shadow-lg rounded-lg">
      <div className="text-black flex justify-between items -center px-6 py-4 rounded-t-lg">
        <h1 className="text-2xl font-semibold">Artist Profile</h1>
      </div>

      <form className="p-8" onSubmit={handleSubmit}>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              First Name
            </label>
            <input
              name="firstName"
              type="text"
              placeholder="Your First Name"
              className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Username
            </label>
            <input
              name="userName"
              type="text"
              placeholder="Your username"
              className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
            />
            {errors.userName && (
              <p className="text-red-500 text-sm">{errors.userName}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Last Name
            </label>
            <input
              name="lastName"
              type="text"
              placeholder="Your Last Name"
              className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="Your password"
              className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="Your email"
              className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-600 text-sm font-medium">
              Description </label>
            <textarea
              name="description"
              placeholder="Description about artist"
              rows="4"
              className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            className="px-4 py-2 text-black focus:outline-none"
            onClick={() => navigate("/")}
          >
            <MdArrowBackIos className="mr-2" />
          </button>

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
                  ? "bg-sky-800 text-white hover:bg-sky-950"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
              onClick={() => navigate("/add-art")}
              disabled={!isProfileComplete}
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
                const artistName = firstName; // Use firstName for navigation
                if (artistName) {
                  navigate(`/artist-detail/${artistName}`);
                }
              }}
              disabled={!isProfileComplete}
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