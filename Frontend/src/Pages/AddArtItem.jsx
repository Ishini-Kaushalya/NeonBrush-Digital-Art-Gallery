// AddArtItem.js
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import { RiImageAddFill } from "react-icons/ri";
import { MdArrowBackIos } from "react-icons/md";
import { z } from "zod";
import axios from "axios";

const artSchema = z.object({
  title: z.string().min(1, "Title is required"),
  size: z.string().min(1, "Size is required"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  category: z.string().min(1, "Category is required"),
  price: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Price must be a valid number")
    .min(1, "Price is required"),
  image: z.string().url("Image is required and must be a valid URL"),
});

const AddArtItem = () => {
  const [artDetails, setArtDetails] = useState({
    title: "",
    size: "",
    description: "",
    category: "",
    price: "",
    image: null,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation to access navigation state

  // Retrieve artistId from the navigation state
  const { artistId } = location.state || {};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArtDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleImageChange = (e) => {
    const { files } = e.target;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setArtDetails((prevDetails) => ({
          ...prevDetails,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleClear = () => {
    setArtDetails({
      title: "",
      size: "",
      description: "",
      category: "",
      price: "",
      image: null,
    });
    setErrors({});
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      // Validate the form data
      artSchema.parse({
        ...artDetails,
        image: artDetails.image || "",
      });
      setErrors({});

      // Prepare the form data to send to the backend
      const formData = new FormData();
      formData.append("artistId", artistId);
      formData.append("title", artDetails.title);
      formData.append("size", artDetails.size);
      formData.append("description", artDetails.description);
      formData.append("category", artDetails.category);
      formData.append("price", artDetails.price);
      if (artDetails.image) {
        const imageFile = e.target.image.files[0];
        formData.append("image", imageFile);
      }

      // Send the data to the backend
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const response = await axios.post(
        "http://localhost:8080/api/gallery",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Art added successfully:", response.data);
      alert("Art added successfully!");

      // Clear the form
      handleClear();
    } catch (validationError) {
      if (validationError.errors) {
        const formattedErrors = validationError.errors.reduce((acc, error) => {
          acc[error.path[0]] = error.message;
          return acc;
        }, {});
        setErrors(formattedErrors);
      } else if (validationError.response) {
        console.error("Error adding art:", validationError.response.data);
        alert("Failed to add art: " + validationError.response.data.message);
      } else {
        console.error("Error:", validationError.message);
        alert("An unexpected error occurred.");
      }
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-gray-100 shadow-lg rounded-lg">
      {/* Form and UI code remains the same */}
    </div>
  );
};

export default AddArtItem;
