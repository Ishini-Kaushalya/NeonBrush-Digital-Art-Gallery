import React, { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import { assets } from "../assets/Common/assets.js";
import { IoChevronBackCircleOutline } from "react-icons/io5";

const PaymentReceipt = ({ order }) => {
  if (!order) return null;
  const navigate = useNavigate();

  const packingFee = 50; // Fixed packing fee
  const totalAmount = order.totalAmount + packingFee;
  const currentDate = order.date;

  // Function to download PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Center logo and title
    const logoWidth = 20;
    const logoX = (pageWidth - logoWidth) / 2;
    doc.addImage(assets.logo, "PNG", logoX, 20, logoWidth, 20);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Payment Receipt", pageWidth / 2, 45, null, null, "center");

    let y = 60;
    const marginLeft = 20;
    const marginRight = 180;

    // User details
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Date: ${currentDate}`, marginLeft, y);
    y += 8;
    doc.text(`Name: ${order.userName}`, marginLeft, y);
    y += 8;
    doc.text(`Address: ${order.address}`, marginLeft, y);
    y += 12;

    // Table headers
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text("Items", marginLeft, y);
    doc.text("Price", marginRight, y, null, null, "right");
    y += 10;

    doc.setFont("helvetica", "normal");

    // List of items
    order.items.forEach((item) => {
      doc.text(item.title, marginLeft, y);
      doc.text(`Rs.${item.price}`, marginRight, y, null, null, "right");
      y += 10;
    });

    // Packing fee
    doc.setFont("helvetica", "bold");
    doc.text("Packing Fee", marginLeft, y);
    doc.text(`Rs.${packingFee}`, marginRight, y, null, null, "right");
    y += 10;

    // Line before total
    doc.setLineWidth(0.5);
    doc.line(marginLeft, y, marginRight, y);
    y += 10;

    // Total amount
    doc.setFontSize(14);
    doc.text("Total", marginLeft, y);
    doc.text(`Rs.${totalAmount}`, marginRight, y, null, null, "right");
    y += 10;

    // Additional line after total
    doc.line(marginLeft, y, marginRight, y);
    y += 10;

    // Footer message
    doc.setFontSize(10);
    doc.text(
      "Thank you for your purchase!",
      pageWidth / 2,
      y + 10,
      null,
      null,
      "center"
    );

    // Save PDF
    doc.save("receipt.pdf");
  };

  return (
    <div className='max-w-2xl mx-auto mt-10 bg-gray-100 shadow-lg rounded-lg p-8'>
      <div className='flex flex-col items-center mb-4'>
        <img
          src={assets.logo}
          alt='NeonBrush Logo'
          className='w-10 h-10 mb-2'
        />
        <h2 className='text-xl font-semibold text-black'>Payment Receipt</h2>
      </div>

      <div className='mt-6 space-y-4'>
        <p className='text-gray-600 text-sm'>Date: {currentDate}</p>
        <p className='text-gray-600 text-sm'>Name: {order.userName}</p>
        <p className='text-gray-600 text-sm'>Email: {order.address}</p>

        <div className='flex justify-between text-lg font-bold border-b pb-2'>
          <p className='text-left text-xl'>Items</p>
          <p className='text-right text-xl'>Price</p>
        </div>

        {order.items.map((item, index) => (
          <div key={index} className='flex justify-between py-2 border-b'>
            <p className='text-left text-gray-700'>{item.title}</p>
            <p className='text-right text-gray-900 font-semibold'>
              Rs.{item.price}
            </p>
          </div>
        ))}

        <div className='flex justify-between py-2 border-b'>
          <p className='text-left text-gray-700 font-semibold'>Packing Fee</p>
          <p className='text-right text-gray-900 font-semibold'>
            Rs.{packingFee}
          </p>
        </div>

        {/* Line before total */}
        <hr className='border-t-2 my-4' />

        <div className='flex justify-between text-lg font-bold'>
          <p className='text-left'>Total</p>
          <p className='text-right'>Rs.{totalAmount}</p>
        </div>

        {/* Additional line after total */}
        <hr className='border-t-2 my-4' />
      </div>

      <div className='flex justify-end space-x-4 mt-6'>
        <button
          onClick={() => navigate("/products")}
          className='py-3 px-6 rounded-lg'
        >
          <IoChevronBackCircleOutline className='text-black text-2xl' />
        </button>

        <button
          onClick={downloadPDF}
          className='bg-sky-950 text-white py-3 px-6 rounded-lg hover:bg-sky-800'
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default PaymentReceipt;
