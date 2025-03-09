import React, { useState, useEffect } from "react";
import axios from "axios";
import { z } from "zod"; // Import Zod

const ContactUs = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({}); // Object to store errors for each field

  // Zod validation schema
  const contactSchema = z.object({
    fullName: z.string().min(1, { message: "Full Name is required." }),
    email: z.string().email({ message: "Invalid email address." }),
    phoneNumber: z
      .string()
      .min(10, { message: "Phone number must be 10 digits." })
      .max(10, { message: "Phone number must be 10 digits." })
      .regex(/^[0-9]+$/, { message: "Phone number must contain only numbers." }),
    message: z.string().min(1, { message: "Message is required." }),
  });

  useEffect(() => {
    // Retrieve user data from localStorage or sessionStorage
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const { username, email: storedEmail } = userData;

    if (username) setFullName(username); // Prefill the username if available
    if (storedEmail) setEmail(storedEmail); // Prefill the email if available
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate using Zod
    const result = contactSchema.safeParse({
      fullName,
      email,
      phoneNumber,
      message,
    });

    if (!result.success) {
      // Collect errors in the errors object
      const fieldErrors = result.error.errors.reduce((acc, err) => {
        acc[err.path[0]] = err.message; // Store error messages for each field
        return acc;
      }, {});
      setErrors(fieldErrors); // Update state with errors
      return;
    }

    try {
      const contactData = {
        fullName,
        email,
        phoneNumber,
        message,
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
        setErrors({}); // Clear errors on successful submission
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
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
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
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
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
            {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
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
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
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
