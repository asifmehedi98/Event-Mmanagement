import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import reviewsData from "../../review"; // Adjust the path as necessary

const ReviewModal = ({ venue, onClose }) => {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    reviewer_name: "",
    rating: "5",
    comment: "",
  });

  useEffect(() => {
    // Filter reviews by venue_id
    const venueReviews = reviewsData.filter(
      (review) => review.venue_id === venue.id
    );
    setReviews(venueReviews);
  }, [venue.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReview = {
      review_id: reviews.length + 1, // Replace with proper unique ID generation
      venue_id: venue.id,
      reviewer_name: formData.reviewer_name,
      rating: formData.rating,
      comment: formData.comment,
      date: new Date().toLocaleDateString(), // Current date
    };

    try {
      // POST request to save the review
      const response = await fetch("http://localhost:3001/api/saveReview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReview),
      });

      if (!response.ok) {
        throw new Error("Failed to save review");
      }

      const result = await response.json();
      console.log("Review saved successfully:", result);

      // Update local state with the new review
      setReviews([...reviews, newReview]);

      // Reset the form
      setFormData({ reviewer_name: "", rating: "5", comment: "" });
    } catch (error) {
      console.error("Error saving review:", error);
    }
  };

  return (
    <dialog
      id="review_modal"
      className="modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-0 backdrop-blur-lg"
      open
    >
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="modal-box z-10 bg-orange-100 bg-opacity-70 backdrop-blur-3xl border border-orange-500 rounded-xl p-8 shadow-xl">
        <h3 className="font-bold text-3xl text-orange-600 text-center mb-4">Venue Reviews</h3>

        {/* Displaying Venue Details */}
        <div className="mb-4">
          <h4 className="text-2xl font-semibold">Venue Information</h4>
          <p><strong>Name:</strong> {venue.name}</p>
          <p><strong>Location:</strong> {venue.location}</p>
        </div>

        {/* Display Existing Reviews */}
        <div className="grid grid-cols-1 gap-4 mb-4">
          <h4 className="text-2xl font-semibold mb-2">Existing Reviews</h4>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review.review_id}
                className="bg-white border border-gray-300 rounded-lg shadow-md p-4"
              >
                <p>
                  <strong className="text-lg">{review.reviewer_name}</strong>
                  <span className="text-gray-500"> ({review.rating}/5)</span>
                </p>
                <p className="mt-2">{review.comment}</p>
                <p className="text-sm text-gray-500 mt-1">{review.date}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No reviews available for this venue.</p>
          )}
        </div>

        {/* Review Submission Form */}
        <form onSubmit={handleSubmit} className="mt-4">
          <h4 className="text-2xl font-semibold mb-2">Leave a Review</h4>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-lg mb-1">Your Name:</label>
              <input
                type="text"
                name="reviewer_name"
                value={formData.reviewer_name}
                onChange={handleChange}
                className="input input-bordered w-full p-2"
                required
              />
            </div>
            <div>
              <label className="block text-lg mb-1">Rating:</label>
              <select
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="select select-bordered w-full p-2"
              >
                <option value="5">5 (Excellent)</option>
                <option value="4">4 (Good)</option>
                <option value="3">3 (Average)</option>
                <option value="2">2 (Poor)</option>
                <option value="1">1 (Terrible)</option>
              </select>
            </div>
            <div>
              <label className="block text-lg mb-1">Your Review:</label>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                className="textarea textarea-bordered w-full p-2"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn bg-green-500 text-xl font-normal text-white hover:bg-green-600 mt-4"
          >
            Submit Review
          </button>
        </form>

        <div className="modal-action mt-4">
          <button
            type="button"
            onClick={onClose}
            className="btn bg-red-500 text-xl font-normal text-white hover:bg-red-600 p-2"
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

// Props validation
ReviewModal.propTypes = {
  venue: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired, // Added venue ID for filtering reviews
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ReviewModal;
