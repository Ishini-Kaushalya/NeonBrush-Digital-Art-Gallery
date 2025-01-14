import React from "react";

const ContactUs = () => {
  return (
    <div className='max-w-4xl mx-auto mt-10 bg-sky-200 shadow-lg rounded-lg'>
      {/* Header */}
      <div className='text-black flex justify-between items-center px-6 py-4 rounded-t-lg'>
        <h1 className='text-2xl font-semibold'>Contact Us</h1>
      </div>

      {/* Contact Form */}
      <div className='p-8'>
        <form className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Full Name */}
          <div>
            <label className='block text-gray-600 text-sm font-medium'>
              Full Name
            </label>
            <input
              type='text'
              placeholder='Your Name'
              className='mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300'
            />
          </div>

          {/* Email */}
          <div>
            <label className='block text-gray-600 text-sm font-medium'>
              Email Address
            </label>
            <input
              type='email'
              placeholder='Your Email'
              className='mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300'
            />
          </div>

          {/* Phone */}
          <div>
            <label className='block text-gray-600 text-sm font-medium'>
              Phone Number
            </label>
            <input
              type='text'
              placeholder='Your Phone Number'
              className='mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300'
            />
          </div>

          {/* Message */}
          <div className='md:col-span-2'>
            <label className='block text-gray-600 text-sm font-medium'>
              Message
            </label>
            <textarea
              placeholder='Your Message'
              rows='4'
              className='mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300'
            ></textarea>
          </div>
        </form>

        {/* Submit Button */}
        <div className='flex justify-end gap-4 mt-6'>
          <button className='bg-gray-400 text-white px-6 py-2 rounded-full hover:bg-gray-500'>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
