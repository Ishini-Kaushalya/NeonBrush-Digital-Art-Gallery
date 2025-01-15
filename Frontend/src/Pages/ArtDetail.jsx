import React, { useState ,useContext} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { StoreContext } from "../Context/StoreContext"; //new
import { MdArrowBackIos } from "react-icons/md";//new
import { FaCartPlus } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";

const ArtDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { _id, name, description, price, image, ownerName, imageSize } = location.state || {};
  const { addToCart } = useContext(StoreContext); // Access the addToCart function from context
  const [fullImage, setFullImage] = useState(false);

  // Navigate to artist detail page
  const handleOwnerClick = () => {
    navigate(`/artist-detail/${ownerName}`, { state: { ownerName } });
  };

  // // Close modal image view
  // const closeImageModal = () => {
  //   setFullImage(false);
  // };

  // // Navigate back to the previous page
  // const navigateBack = () => {
  //   navigate(-1);
  //   closeImageModal();
  // };

  return (
    <div>
      <div className="art-detail-page container mx-auto mt-16 flex flex-col md:flex-row space-y-8 md:space-y-0">
        {/* Left Side: Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center relative">
          <img
            src={image}
            alt={name}
            className="w-[300px] h-[400px] object-contain rounded-lg shadow-lg cursor-pointer transition-all duration-300 transform hover:scale-105 border-4 border-transparent animate-border"
            onClick={() => setFullImage(true)}
          />
        </div>

        {/* Right Side: Art Details */}
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-3xl font-semibold text-gray-900">{name}</h2>
          <p className="text-lg text-gray-700">{description}</p>
          <p className="text-tomato text-xl font-semibold">Price: ${price}</p>
          <p
            className="text-black cursor-pointer hover:text-blue-800 font-medium"
            onClick={handleOwnerClick}
          >
            Owner: {ownerName}
          </p>

          <p className="text-gray-500">Image Size: {imageSize}</p>
          <div className="flex space-x-4">
            {/* Add to Cart Button */}
            <button
              className="bg-sky-800 text-white py-2 px-6 rounded-lg shadow-md hover:bg-gray-800 transition duration-300 flex items-center"
              onClick={() => addToCart(_id)}
            >
              <FaCartPlus className="mr-2" />
              Add to Cart
            </button>

            {/* Back Button */}
            <button
              className="bg-white text-black py-2 px-6 rounded-lg  hover:bg-gray-200 transition duration-300 flex items-center"
              onClick={() => navigate(-1)}
            >
              <MdArrowBackIos className="mr-2" />
              Back
            </button>
          </div>
          
        </div>
      </div>

      {/* Full Image Modal */}
      {fullImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative max-w-full max-h-full p-4">
            <img
              src={image}
              alt={name}
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-lg"
            />
            <button
              className="absolute top-4 right-4 text-white text-3xl font-bold"
              onClick={() => setFullImage(false)}
            >
              <IoCloseCircleOutline />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtDetail;
