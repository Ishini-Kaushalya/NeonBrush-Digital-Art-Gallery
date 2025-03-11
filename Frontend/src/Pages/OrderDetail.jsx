import React, { useState } from "react";

const OrderDetail = () => {
  const [selectedArt, setSelectedArt] = useState(null);

  const artList = [
    {
      id: 1,
      name: "Art 1",
      imageUrl: "https://via.placeholder.com/150",
      buyer: {
        name: "John Doe",
        address: "1234 Elm St, Springfield, IL",
      },
    },
    {
      id: 2,
      name: "Art 2",
      imageUrl: "https://via.placeholder.com/150",
      buyer: {
        name: "Jane Smith",
        address: "5678 Oak St, Shelbyville, IL",
      },
    },
    {
      id: 3,
      name: "Art 3",
      imageUrl: "https://via.placeholder.com/150",
      buyer: {
        name: "Alice Johnson",
        address: "91011 Pine St, Capital City, IL",
      },
    },
  ];

  const handleSeeDetail = (art) => {
    setSelectedArt(art);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>
      <div className="space-y-4">
        {selectedArt ? (
          <div className="flex flex-col items-start space-y-4 border-b pb-4">
            <h3 className="text-xl font-semibold">Buyer Details</h3>
            <p><strong>Name:</strong> {selectedArt.buyer.name}</p>
            <p><strong>Address:</strong> {selectedArt.buyer.address}</p>
          </div>
        ) : (
          artList.map((art) => (
            <div
              key={art.id}
              className="flex items-center space-x-4 border-b pb-4"
            >
              <img
                src={art.imageUrl}
                alt={art.name}
                className="w-24 h-24 object-cover"
              />
              <h3 className="text-lg font-medium flex-1">{art.name}</h3>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={() => handleSeeDetail(art)}
              >
                See Detail
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderDetail;
