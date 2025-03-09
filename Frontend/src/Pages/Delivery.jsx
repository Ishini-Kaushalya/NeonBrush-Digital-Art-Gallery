import React from "react";

import { assets } from "../assets/Common/assets"; // Import assets

const Delivery = () => {
  return (
    <>
      <div className="max-w-6xl mx-auto p-10 pt-20 bg-white rounded-lg flex flex-col items-center text-center gap-10">
        <div className="w-full md:w-4/5 text-center p-10">
          <h1 className="text-gray-900 font-bold text-3xl md:text-4xl mb-6">
            Our Delivery System
          </h1>
          <p className="text-gray-700 leading-relaxed mb-4">
            <b>
              At NeonBrush, we ensure your favorite artworks are delivered
              securely and efficiently. We partner with trusted courier
              services and postal networks to bring art right to your doorstep
              anywhere in Sri Lanka.
            </b>
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <h4>
              <b>How It Works</b>
            </h4>
            - Once your order is confirmed, we prepare your artwork for safe
            packaging. <br />- We ship through premium courier services or
            standard postal delivery within Sri Lanka. <br />- Tracking
            details are shared so you can monitor your delivery status.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <h4>
              <b>Shipping Options</b>
            </h4>
            - Express Delivery (3-5 days) via courier. <br />- Standard
            Delivery (5-10 days) through postal services.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <h4>
              <b>Safe & Secure</b>
            </h4>
            Every package is handled with care, ensuring artworks reach you in
            perfect condition.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <h4>
              <b>Have Questions?</b>
            </h4>
            Contact our support team at contact@neonbrush.com
          </p>
        </div>
      </div>
    </>
  );
};

export default Delivery;
