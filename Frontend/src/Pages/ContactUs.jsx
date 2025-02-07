import React, { useState, useEffect } from "react";
import axios from "axios";

const ContactUs = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Retrieve user data from localStorage or sessionStorage
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const { username, email: storedEmail } = userData;

    if (username) setFullName(username); // Prefill the username if available
    if (storedEmail) setEmail(storedEmail); // Prefill the email if available
  }, []);

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePhoneNumber(phoneNumber)) {
      setError("Phone number must be 10 digits.");
      return;
    }

    try {
      const contactData = {
        userName: fullName,
        email: email,
        phoneNumber: phoneNumber,
        message: message,
      };

      const response = await axios.post(
        "http://localhost:8080/api/contacts",
        contactData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        alert("Contact form submitted successfully!");
        setFullName("");
        setEmail("");
        setPhoneNumber("");
        setMessage("");
      }
    } catch (error) {
      console.error("Error submitting the form!", error);
      alert("Error submitting the form. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-sky-100 shadow-lg rounded-lg">
      <div className="text-black flex justify-between items-center px-6 py-4 rounded-t-lg">
        <h1 className="text-2xl font-semibold">Contact Us</h1>
      </div>
      <div className="p-8">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your Name"
              className="mt-1 w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              className="mt-1 w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Phone Number
            </label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Your Phone Number"
              className="mt-1 w-full px-4 py-2 border rounded-lg"
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-600 text-sm font-medium">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your Message"
              rows="4"
              className="mt-1 w-full px-4 py-2 border rounded-lg"
            ></textarea>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="submit"
              className="bg-gray-400 text-white px-6 py-2 rounded-full hover:bg-gray-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
