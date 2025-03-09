import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { StoreContext } from "../Context/StoreContext";
import { MdArrowBackIos } from "react-icons/md";
import { FaCartPlus } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import axios from "axios";

const ArtDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { _id, name, description, price, imageId, userName, size } =
    location.state || {};
  const { addToCart } = useContext(StoreContext);
  const [fullImage, setFullImage] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("accessToken"));
        const response = await axios.get(
          `http://localhost:8080/api/gallery/image/${imageId}`,
          {
            responseType: "arraybuffer",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const base64Image = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        setImageSrc(`data:image/jpeg;base64,${base64Image}`);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    if (imageId) {
      fetchImage();
    }
  }, [imageId]);

  const handleAddToCart = () => {
    console.log("Received Art Data:", _id);
    addToCart(_id);
  };
  const handleOwnerClick = () => {
    navigate(`/artist-detail/${userName}`, { state: { userName } });
  };

  return (
    <div>
      <div className='art-detail-page container mx-auto mt-16 flex flex-col md:flex-row space-y-8 md:space-y-0'>
        {/* Left Side: Image */}
        <div className='w-full md:w-1/2 flex justify-center items-center relative'>
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={name}
              className='w-[300px] h-[400px] object-contain rounded-lg shadow-lg cursor-pointer transition-all duration-300 transform hover:scale-105 border-4 border-transparent animate-border'
              onClick={() => setFullImage(true)}
            />
          ) : (
            <div>Loading image...</div>
          )}
        </div>

        {/* Right Side: Art Details */}
        <div className='w-full md:w-1/2 space-y-6'>
          <h2 className='text-3xl font-semibold text-gray-900'>{name}</h2>
          <p className='text-lg text-gray-700'>{description}</p>
          <p className='text-tomato text-xl font-semibold'>Rs.{price}</p>
          <p
            className='text-black cursor-pointer hover:text-blue-800 font-medium'
            onClick={handleOwnerClick}
          >
            Owner: {userName}
          </p>

          <p className='text-gray-500'>Image Size: {size}</p>
          <div className='flex space-x-4'>
            {/* Add to Cart Button */}
            <button
              className='bg-sky-800 text-white py-2 px-6 rounded-lg shadow-md hover:bg-gray-800 transition duration-300 flex items-center'
              onClick={handleAddToCart}
            >
              <FaCartPlus className='mr-2' />
              Add to Cart
            </button>

            {/* Back Button */}
            <button
              className='bg-white text-black py-2 px-6 rounded-lg  hover:bg-gray-200 transition duration-300 flex items-center'
              onClick={() => navigate(-1)}
            >
              <MdArrowBackIos className='mr-2' />
              Back
            </button>
          </div>
        </div>
      </div>

      {/* Full Image Modal */}
      {fullImage && imageSrc && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
          <div className='relative max-w-full max-h-full p-4'>
            <img
              src={imageSrc}
              alt={name}
              className='max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-lg'
            />
            <button
              className='absolute top-4 right-4  text-3xl font-bold'
              onClick={() => setFullImage(false)}
            >
              <IoMdCloseCircle />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtDetail;
