import React, { useState } from "react";
import { RiImageAddFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { z } from "zod";

const artSchema = z.object({
  title: z.string().min(1, "Title is required"),
  size: z.string().min(1, "Size is required"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
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

  const [artItems, setArtItems] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArtDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleImageChange = (e) => {
    const { files } = e.target;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setArtDetails((prevDetails) => ({ ...prevDetails, image: reader.result }));
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

  const handleAdd = (e) => {
    e.preventDefault();

    try {
      artSchema.parse({
        ...artDetails,
        image: artDetails.image || "",
      });
      setErrors({});
      setArtItems((prevItems) => [...prevItems, artDetails]);
      handleClear();
    } catch (validationError) {
      const formattedErrors = validationError.errors.reduce((acc, error) => {
        acc[error.path[0]] = error.message;
        return acc;
      }, {});
      setErrors(formattedErrors);
    }
  };

  const handleRemove = (indexToRemove) => {
    setArtItems((prevItems) => prevItems.filter((_, index) => index !== indexToRemove));
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-sky-100 shadow-lg rounded-lg">
      <div className="text-black flex justify-between items-center px-6 py-4 rounded-t-lg">
        <h1 className="text-2xl font-semibold">Add Art Item</h1>
      </div>
      <div className="p-8">
        <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-600 text-sm font-medium">Art Title</label>
            <input
              type="text"
              name="title"
              value={artDetails.title}
              onChange={handleInputChange}
              placeholder="Art title"
              className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium">Art Size</label>
            <input
              type="text"
              name="size"
              value={artDetails.size}
              onChange={handleInputChange}
              placeholder="Art size"
              className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            {errors.size && <p className="text-red-500 text-sm mt-1">{errors.size}</p>}
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-600 text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={artDetails.description}
              onChange={handleInputChange}
              placeholder="Description about the art"
              rows="4"
              className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium">Category</label>
            <select
              name="category"
              value={artDetails.category}
              onChange={handleInputChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              <option value="">Select Category</option>
              <option value="illustration">Illustration</option>
              <option value="anime">Anime</option>
              <option value="doodling">Doodling</option>
              <option value="geometric">Geometric</option>
              <option value="pointilism">Pointilism</option>
              <option value="charcoal">Charcoal</option>
              <option value="typography">Typography</option>
              <option value="painting">Painting</option>
            </select>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium">Price</label>
            <input
              type="text"
              name="price"
              value={artDetails.price}
              onChange={handleInputChange}
              placeholder="Price"
              className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-600 text-sm font-medium">Upload Image</label>
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
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
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
        <h2 className="text-xl font-semibold mb-4">Added Art Items</h2>
        {artItems.length === 0 ? (
          <p className="text-gray-600">No items added yet.</p>
        ) : (
          <ul className="space-y-4">
            {artItems.map((item, index) => (
              <li
                key={index}
                className="flex items-center space-x-4 p-4 border rounded-lg bg-white"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                )}
                <div className="flex-grow">
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="text-sm text-gray-500">
                    {item.category} | {item.size} | ${item.price}
                  </p>
                </div>
                <button
                  onClick={() => handleRemove(index)}
                  className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AddArtItem;
