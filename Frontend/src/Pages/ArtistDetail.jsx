import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { artists, assets } from "../assets/Common/assets";

const ArtistDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // Find artist
  const artist = artists.find((artist) => artist.name === id);

  if (!artist) {
    return <div>Artist not found!</div>;
  }

  // Fetch reviews from backend
  useEffect(() => {
  fetch(`http://localhost:8080/reviews/${artist.name}`)

      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, [artist.name]);

  // Submit review
  const submitReview = async (e) => {
    e.preventDefault();
    const newReview = { artist_userName: artist.name, rating, comment };

    const response = await fetch("http://localhost:8080/reviews/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReview),
    });

    if (response.ok) {
      const updatedReviews = await response.json(); // Get the updated list of reviews from the backend
      setReviews(updatedReviews); // Update reviews state with the new list
      setRating(0);
      setComment("");
    }
  };

  // Handle star click
  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  return (
    <div className="artist-detail container mx-auto mt-16 p-4">
     

      {/* Artist Info */}
      <div
        className="relative flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8 bg-cover bg-center p-8 rounded-lg"
        style={{ backgroundImage: `url(${assets.artist_bg1})` }}

      >
        <div className="absolute inset-0 bg-black opacity-70 backdrop-blur-10 rounded-lg"></div>

        <div className="relative z-10">
          <img
            src={artist.image}
            alt={artist.name}
            className="w-[300px] h-[300px] object-cover rounded-lg shadow-lg border-8 border-white"
          />
          <h2 className="text-3xl font-semibold mt-4 text-center text-white">{artist.name}</h2>
        </div>

        <div className="relative z-10 space-y-4 bg-opacity-90 p-6 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-white">About the Artist</h1>
          <p className="text-lg text-white">{artist.description}</p>
        </div>
      </div>

      {/* Review Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Reviews & Ratings</h2>

        {/* Review Form */}
        <form onSubmit={submitReview} className="mb-6 bg-sky-100 p-4 rounded-lg shadow-lg">
          <label className="block mb-2 font-semibold">Rating </label>
          <div className="flex mb-3">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`cursor-pointer text-2xl ${
                  index < rating ? "text-yellow-500" : "text-gray-300"
                }`}
                onClick={() => handleStarClick(index)}
              >
                {index < rating ? "★" : "☆"}
              </span>
            ))}
          </div>

          <label className="block mb-2 font-semibold">Comment:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg mb-3"
            rows="3"
            required
          ></textarea>

          <button
            type="submit"
            className="bg-sky-800 text-white py-2 px-4 rounded-lg hover:bg-sky-950"
          >
            Submit Review
          </button>
        </form>

        {/* Review List */}
        <div className="space-y-4">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="p-4 bg-white shadow-lg rounded-lg">
                <p className="text-lg font-semibold">Rating: ⭐ {review.rating}</p>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No reviews yet. Be the first to add one!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistDetail;
