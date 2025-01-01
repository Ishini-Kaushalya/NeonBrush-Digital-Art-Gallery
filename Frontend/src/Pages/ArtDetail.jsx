import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ArtDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { _id, name, description, price, image, ownerName, imageSize } = location.state || {};

  const [fullImage, setFullImage] = useState(false);

  // Navigate to artist detail page
  const handleOwnerClick = () => {
    navigate(`/artist-detail/${ownerName}`, { state: { ownerName } });
  };

  // Close modal image view
  const closeImageModal = () => {
    setFullImage(false);
  };

  // Navigate back to the previous page
  const navigateBack = () => {
    navigate(-1);
    closeImageModal();
  };

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
            className="text-blue-600 cursor-pointer hover:text-blue-800 font-medium"
            onClick={handleOwnerClick}
          >
            Owner: {ownerName}
          </p>
          <p className="text-gray-500">Image Size: {imageSize}</p>
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-8 flex justify-end mb-4">
        <button
          className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>

      {/* Full Image Modal */}
      {fullImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative">
            <img src={image} alt={name} className="w-[800px] h-[auto] object-contain rounded-lg" />
            <button
              className="absolute top-4 right-4 text-white text-3xl font-bold"
              onClick={navigateBack}
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtDetail;
