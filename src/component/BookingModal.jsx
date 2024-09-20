import { useState } from "react";
import PropTypes from "prop-types";
import emailjs from '@emailjs/browser';

const BookingModal = ({ venue, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    people: "2", // Default value for dropdown
    roomCategory: "",
    checkinDate: "",
    checkoutDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendMail = () => {
    const message = {
      to_name: formData.name, // User's name
      email: formData.email, // User's email
      venue_name: venue.name,
      venue_location: venue.location,
      venue_capacity: venue.capacity,
      people: formData.people,
      room_category: formData.roomCategory,
      checkin_date: formData.checkinDate,
      checkout_date: formData.checkoutDate,
    };
  

    emailjs.send(
      'service_mmzklcm', // Replace with your EmailJS service ID
      'booking_mail', // Replace with your EmailJS template ID
      message,
      'j0DqWBxLed5fA-64F' // Replace with your EmailJS public key
    )
    .then((response) => {
      console.log("Email successfully sent!", response.status, response.text);
    })
    .catch((err) => {
      console.error("Failed to send email. Error:", err);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Details: ", formData);
    console.log("Venue Details: ", venue);
    sendMail(); // Send the email confirmation
    onClose(); // Close the modal
  };

  return (
    <dialog
      id="booking_modal"
      className="modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-0 backdrop-blur-lg"
      open
    >
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="modal-box z-10 bg-orange-100 bg-opacity-70 backdrop-blur-3xl border border-orange-500 rounded-xl p-8 shadow-xl">
        <h3 className="font-bold text-3xl text-orange-600 text-center mb-4">Book Your Stay</h3>

        {/* Displaying Venue Details */}
        <div className="mb-4">
          <h4 className="text-2xl font-semibold">Venue Information</h4>
          <p><strong>Name:</strong> {venue.name}</p>
          <p><strong>Location:</strong> {venue.location}</p>
          <p><strong>Capacity:</strong> {venue.capacity}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="py-4">
              <label className="block text-lg mb-2 text-orange-700">Name:</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="input input-bordered w-full text-lg p-2 bg-white bg-opacity-60 border-orange-400 text-black"
                required
              />
            </div>
            <div className="py-4">
              <label className="block text-lg mb-2 text-orange-700">Email:</label>
              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered w-full text-lg p-2 bg-white bg-opacity-60 border-orange-400 text-black"
                required
              />
            </div>
            <div className="py-4">
              <label className="block text-lg mb-2 text-orange-700">How Many People:</label>
              <select
                name="people"
                value={formData.people}
                onChange={handleChange}
                className="select select-bordered w-full text-lg p-2 bg-white bg-opacity-60 border-orange-400 text-black"
              >
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="py-4">
              <label className="block text-lg mb-2 text-orange-700">Room Category:</label>
              <select
                name="roomCategory"
                value={formData.roomCategory}
                onChange={handleChange}
                className="select select-bordered w-full text-lg p-2 bg-white bg-opacity-60 border-orange-400 text-black"
                required
              >
                <option value="">Select Room</option>
                <option value="honeymoon">Honeymoon Suite - $32</option>
                <option value="single">Single Bed Room - $25</option>
                <option value="double">Double Bed Room - $40</option>
                <option value="deluxe">Deluxe Room - $50</option>
              </select>
            </div>
            <div className="py-4">
              <label className="block text-lg mb-2 text-orange-700">Check-in Date:</label>
              <input
                type="date"
                name="checkinDate"
                value={formData.checkinDate}
                onChange={handleChange}
                className="input input-bordered w-full text-lg p-2 bg-white bg-opacity-60 border-orange-400 text-black"
                required
              />
            </div>
            <div className="py-4">
              <label className="block text-lg mb-2 text-orange-700">Check-out Date:</label>
              <input
                type="date"
                name="checkoutDate"
                value={formData.checkoutDate}
                onChange={handleChange}
                className="input input-bordered w-full text-lg p-2 bg-white bg-opacity-60 border-orange-400 text-black"
                required
              />
            </div>
          </div>

          <div className="modal-action mt-4">
            <button
              type="submit"
              className="btn bg-orange-500 text-xl font-normal text-white hover:bg-orange-600 p-2"
            >
              Book Now
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn bg-red-500 text-xl font-normal text-white hover:bg-red-600 p-2"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

// Props validation
BookingModal.propTypes = {
  venue: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    capacity: PropTypes.number.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BookingModal;
