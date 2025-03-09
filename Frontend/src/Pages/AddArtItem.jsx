import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RiImageAddFill } from "react-icons/ri";
import { MdArrowBackIos } from "react-icons/md";
import { z } from "zod";
import axios from "axios";
import { Link } from "react-router-dom";
const artSchema = z.object({
  userName: z.string().min(1, "Username is required"),
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
  image: z.any(), // Change to any to allow file input
});

const AddArtItem = () => {
  const [artDetails, setArtDetails] = useState({
    userName: "",
    title: "",
    size: "",
    description: "",
    category: "",
    price: "",
    image: null,
  });

  const [artItems, setArtItems] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all art items when the component mounts
    const fetchArtItems = async () => {
      const token = JSON.parse(localStorage.getItem("accessToken"));

      if (!token) {
        console.error("No token found, please login first.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8080/api/gallery", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setArtItems(response.data);
      } catch (error) {
        console.error("Error fetching art items:", error);
      }
    };

    fetchArtItems();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArtDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleImageChange = (e) => {
    const { files } = e.target;
    if (files && files[0]) {
      setArtDetails((prevDetails) => ({
        ...prevDetails,
        image: files[0],
      }));
    }
  };

  const handleClear = () => {
    setArtDetails({
      userName: "",
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

    const token = JSON.parse(localStorage.getItem("accessToken"));

    if (!token) {
      console.error("No token found, please login first.");
      return;
    }

    console.log("Using JWT Token:", token);

    try {
      artSchema.parse(artDetails);
      setErrors({});

      const formData = new FormData();
      formData.append("userName", artDetails.userName);
      formData.append("title", artDetails.title);
      formData.append("size", artDetails.size);
      formData.append("description", artDetails.description);
      formData.append("category", artDetails.category);
      formData.append("price", artDetails.price);
      formData.append("image", artDetails.image);

      const response = await axios.post(
        "http://localhost:8080/api/gallery/addArtItem",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setArtItems((prevItems) => [...prevItems, response.data]);

      // Send a notification to the admin
      const message = {
        type: "art_added",
        content: `New artwork titled "${artDetails.title}" has been added by an artist.`,
      };
      sendMessageToAdmin(message);

      handleClear();
    } catch (validationError) {
      if (validationError.errors) {
        const formattedErrors = validationError.errors.reduce((acc, error) => {
          acc[error.path[0]] = error.message;
          return acc;
        }, {});
        setErrors(formattedErrors);
      } else if (validationError.response) {
        console.error("Error adding art item:", validationError.response.data);
        alert(
          "Failed to add art item: " + validationError.response.data.message
        );
      } else {
        console.error("Error:", validationError.message);
        alert("An unexpected error occurred.");
      }
    }
  };

  const sendMessageToAdmin = (message) => {
    let messages = JSON.parse(localStorage.getItem("adminMessages")) || [];
    messages.push(message);
    localStorage.setItem("adminMessages", JSON.stringify(messages));
  };

  const handleRemove = async (indexToRemove) => {
    const artItem = artItems[indexToRemove];
    const token = JSON.parse(localStorage.getItem("accessToken"));

    if (!token) {
      console.error("No token found, please login first.");
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/api/gallery/${artItem.artId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setArtItems((prevItems) =>
        prevItems.filter((_, index) => index !== indexToRemove)
      );
    } catch (error) {
      console.error("Error deleting art item:", error);
      alert("Failed to delete art item.");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-gray-100 shadow-lg rounded-lg">
      <div className="text-black flex justify-between items-center px-6 py-4 rounded-t-lg">
        <h1 className="text-2xl font-semibold">Add Art Item</h1>
      </div>
      <div className="p-8">
        <form
          onSubmit={handleAdd}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Art Title
            </label>
            <input
              type="text"
              name="title"
              value={artDetails.title}
              onChange={handleInputChange}
              placeholder="Art title"
              className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Artist's User Name
            </label>
            <input
              type="text"
              name="userName"
              value={artDetails.userName}
              onChange={handleInputChange}
              placeholder="Artist's Name"
              className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            {errors.userName && (
              <p className="text-red-500 text-sm mt-1">{errors.userName}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Art Size
            </label>
            <input
              type="text"
              name="size"
              value={artDetails.size}
              onChange={handleInputChange}
              placeholder="Art size"
              className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            {errors.size && (
              <p className="text-red-500 text-sm mt-1">{errors.size}</p>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-600 text-sm font-medium">
              Description
            </label>
            <textarea
              name="description"
              value={artDetails.description}
              onChange={handleInputChange}
              placeholder="Description about the art"
              rows="4"
              className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Category
            </label>
            <select
              name="category"
              value={artDetails.category}
              onChange={handleInputChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              <option value="">Select Category</option>
              <option value="pastel">Pastel</option>
              <option value="oil">Oil</option>
              <option value="ink">Ink</option>
              <option value="water color">Water Color</option>
              <option value="canvas">Canvas</option>
              <option value="charcoal">Charcoal</option>
              <option value="acrylic">Acrylic</option>
              <option value="pencil">Pencil</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Price
            </label>
            <input
              type="text"
              name="price"
              value={artDetails.price}
              onChange={handleInputChange}
              placeholder="Price"
              className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price}</p>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-600 text-sm font-medium">
              Upload Image
            </label>
            <div className="relative">
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <button
                type="button"
                className="mt-1 w-full px-6 py-3 text-gray-500 bg-sky-200 border rounded-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                <RiImageAddFill className="mr-2" /> Choose Image
              </button>
            </div>
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image}</p>
            )}
          </div>
          <div className="md:col-span-2 flex justify-between items-center mt-4">
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 text-black focus:outline-none"
            >
              <MdArrowBackIos className="mr-2" />
            </button>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleClear}
                className="px-4 py-2 border rounded-lg text-white bg-sky-800 hover:bg-sky-950"
              >
                Clear
              </button>
              <button
                type="submit"
                className="px-4 py-2 border rounded-lg text-white bg-sky-800 hover:bg-sky-950"
              >
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="p-8">
        {artItems.length === 0 ? (
          <p className="text-gray-600">No items added yet.</p>
        ) : (
          <p>
  <Link to="/products" className="text-blue-500 hover:text-sky-900">
    See Arts
  </Link>
</p>
          // <ul className="space-y-4">
          //   {artItems.map((item) => (
          //     <li
          //       key={item.artId}
          //       className="flex items-center space-x-4 p-4 border rounded-lg bg-white"
          //     >
          //       {item.imageId && (
          //         <img
          //           src={`http://localhost:8080/api/gallery/image/${item.imageId}`}
          //           alt={item.title}
          //           className="w-16 h-16 object-cover rounded-lg"
          //         />
          //       )}
          //       {/* <div className="flex-grow">
          //         <h3 className="text-lg font-medium">{item.title}</h3>
          //         <p className="text-sm text-gray-600">{item.description}</p>
          //         <p className="text-sm text-gray-500">
          //           {item.category} | {item.size} | ${item.price}
          //         </p>
          //       </div> */}
          //       {/* <button
          //         onClick={() => handleRemove(artItems.indexOf(item))}
          //         className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
          //       >
          //         Remove
          //       </button> */}
          //     </li>
          //   ))}
          // </ul>
        )}
      </div>
    </div>
  );
};

export default AddArtItem;
