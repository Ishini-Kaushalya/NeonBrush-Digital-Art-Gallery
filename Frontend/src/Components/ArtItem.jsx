import React, { useEffect, useState } from "react";
import axios from "axios";

const ArtItem = ({
  id,
  name,
  artistName,
  price,
  description,
  imageId,
  onClick,
}) => {
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

    fetchImage();
  }, [imageId]);

  return (
    <div className="w-full mx-auto rounded-lg shadow-md transition-transform duration-200 hover:scale-102 bg-white">
      <div className="relative group">
        {imageSrc ? (
          <img
            className="w-full h-[250px] object-cover rounded-t-lg transition-transform duration-200 group-hover:scale-105"
            src={imageSrc}
            alt={name}
            onClick={() =>
              onClick({
                ...{ id, name, artistName, price, description, imageId },
                image: imageSrc,
              })
            }
          />
        ) : (
          <div>Loading image...</div>
        )}
      </div>
      <div className="p-5">
        <div className="flex justify-between items-center mb-2">
          <p className="text-lg font-medium">{name}</p>
        </div>
        <p className="text-lg font-medium">{artistName}</p>
        <p className="text-gray-600 text-sm truncate">{description}</p>
        <p className="text-tomato text-xl font-semibold mt-2">Rs.{price}</p>
      </div>
    </div>
  );
};

export default ArtItem;
