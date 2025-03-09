import React, { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";


const PaymentReceipt = () => {
  const { cartItems, getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Payment Receipt", 105, 20, null, null, "center");

    let y = 30; // starting Y position for the items

    cartItems.forEach((item) => {
      doc.text(`${item.title}: Rs.${item.price}`, 10, y);
      y += 10;
    });

    doc.text(`Total: Rs.${getTotalCartAmount()}`, 10, y + 10);

    doc.save("receipt.pdf");
  };

  return (
    <div className='max-w-2xl mx-auto mt-10 bg-gray-100 shadow-lg rounded-lg p-8'>
      <h2 className='text-2xl font-semibold text-black text-center'>Payment Receipt</h2>
      <div className='mt-6 space-y-4'>
        {cartItems.map((item) => (
          <div key={item.artId} className='flex justify-between border-b pb-2'>
            <p className='text-gray-700'>{item.title}</p>
            <p className='text-gray-900 font-semibold'>Rs.{item.price}</p>
          </div>
        ))}
        <div className='flex justify-between text-lg font-bold mt-4'>
          <p>Total</p>
          <p>Rs.{getTotalCartAmount()}</p>
        </div>
      </div>
      <div className='flex justify-center mt-6'>
        <button
          onClick={() => navigate("/products")}
          className='bg-sky-800 text-white py-3 px-6 rounded-lg hover:bg-sky-950'
        >
          Back to Shop
        </button>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={downloadPDF}
          className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-800"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default PaymentReceipt;
