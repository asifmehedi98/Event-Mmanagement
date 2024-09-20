import { useState } from "react";
import { FaHome, FaEllipsisV, FaMapMarkerAlt, FaBed, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import venues from "../../venue_data"; // Assuming you have this file
import BookingModal from "../component/BookingModal";
import ReviewModal from "../component/ReviewModal"; // Assuming ReviewModal is in the same folder

const Venues = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/dashboard");
  };

  const [sorting, setSorting] = useState("Select capacity");
  const [locationFilter, setLocationFilter] = useState("Select location");
  const [showBars, setShowBars] = useState(true);

  // State to manage booking modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null); // Store selected venue

  // State to manage review modal
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const handleSort = (e) => {
    const selectedCapacity = e.target.value;
    setSorting(selectedCapacity);
  };

  const handleLocationSort = (e) => {
    const selectedLocation = e.target.value;
    setLocationFilter(selectedLocation);
  };

  const toggleBars = () => {
    setShowBars(!showBars);
  };

  const openBookingModal = (venue) => {
    setSelectedVenue(venue); // Set the selected venue
    setIsModalOpen(true); // Open the booking modal
  };

  const closeBookingModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedVenue(null); // Clear selected venue
  };

  const openReviewModal = (venue) => {
    setSelectedVenue(venue); // Set the selected venue for reviews
    setIsReviewModalOpen(true); // Open the review modal
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false); // Close the review modal
    setSelectedVenue(null); // Clear selected venue
  };

  // Filtering based on capacity and location
  const sortedVenues = venues.filter((venue) => {
    const matchesCapacity =
      sorting === "Select capacity" || venue.capacity === parseInt(sorting);
    const matchesLocation =
      locationFilter === "Select location" || venue.location === locationFilter;
    return matchesCapacity && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-slate-100" data-theme="halloween">
      {/* Navbar and Sorting Bar Container */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 sm:translate-y-0 ${showBars ? "translate-y-0" : "-translate-y-full sm:translate-y-0"}`}>
        {/* Navbar */}
        <div className="py-4 px-4 sm:px-8 bg-white shadow-sm flex flex-row items-center justify-between w-full">
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-500">Venue List</h2>
          <button className="btn btn-ghost rounded-md bg-red-400 text-white text-md sm:text-md hover:bg-orange-600 hover:text-white" onClick={handleHome}>
            <FaHome className="inline mr-2 text-lg sm:text-2xl" /> Home
          </button>
        </div>

        {/* Sorting Bar */}
        <div className="py-4 px-4 sm:px-8 bg-white border-none shadow-md flex flex-row justify-start items-center w-full space-x-2 sm:space-x-4">
          {/* Sorting by Capacity */}
          <div className="relative w-full sm:w-auto">
            <FaBed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 text-lg" />
            <select value={sorting} onChange={handleSort} className="block w-full pl-10 bg-white border border-orange-500 px-4 py-2 text-md sm:text-md rounded leading-tight focus:outline-none text-orange-500 hover:text-white hover:bg-orange-500 duration-100">
              <option>Select capacity</option>
              <option>50</option>
              <option>200</option>
              <option>300</option>
              <option>500</option>
              <option>1000</option>
            </select>
          </div>

          {/* Sorting by Location */}
          <div className="relative w-full sm:w-auto">
            <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 text-lg" />
            <select value={locationFilter} onChange={handleLocationSort} className="block w-full pl-10 bg-white border border-orange-500 px-4 py-2 text-md sm:text-md rounded leading-tight focus:outline-none text-orange-500 hover:text-white hover:bg-orange-500 duration-100">
              <option>Select location</option>
              <option>Dhanmondi</option>
              <option>Banani</option>
              <option>Gulshan</option>
              <option>Uttara</option>
            </select>
          </div>
        </div>
      </div>

      {/* Three-dot menu for small screens */}
      <div className="fixed -top-6 left-1/2 -translate-x-1/2 z-50 sm:hidden">
        <button onClick={toggleBars} className="text-gray-500 bg-white p-2 rounded-full shadow-md hover:bg-orange-500 hover:text-white">
          <FaEllipsisV className="text-2xl" />
        </button>
      </div>

      {/* Padding top to prevent content overlap */}
      <div className="pt-36">
        {/* Cards Section */}
        <div className="container mx-auto py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {sortedVenues.length === 0 ? (
            <div className="col-span-full text-center">
              <div className="text-6xl text-gray-500" role="img" aria-label="Sad face">
                😢
              </div>
              <p className="text-xl text-gray-700">Sorry, no venues found</p>
            </div>
          ) : (
            sortedVenues.map((venue) => (
              <div key={venue.id} className="max-w-full bg-white border border-gray-200 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:border-orange-500 hover:shadow-xl">
                {/* Image */}
                <a href="#">
                  <img className="rounded-t-lg w-full h-50 sm:w-80 mx-auto mt-4 object-cover" src={venue.image} alt={venue.name} />
                </a>
                <hr className="my-2 border-gray-200" />

                {/* Venue Details */}
                <div className="p-5">
                  <h5 className="mb-2 text-lg sm:text-2xl font-bold tracking-tight text-gray-500">{venue.name}</h5>
                  <p className="mb-3 text-md sm:text-md font-normal text-orange-500">{`Location: ${venue.location}`}</p>
                  <p className="mb-3 text-md sm:text-md font-normal text-orange-500">{`Capacity: ${venue.capacity}`}</p>
                  <p className="mb-3 text-md sm:text-md font-normal text-orange-500">{`Price: $${venue.price}`}</p>

                  {/* Buttons */}
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => openBookingModal(venue)}
                      className="inline-flex items-center px-3 py-2 text-md sm:text-md font-medium text-white bg-blue-700 rounded-lg hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-orange-500"
                    >
                      Book now
                    </button>
                    <button
                      onClick={() => openReviewModal(venue)}
                      className="inline-flex items-center justify-center px-4 py-2 text-md font-base text-white bg-yellow-500 rounded-lg shadow-lg hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 transition duration-200"
                    >
                      <FaStar className="mr-2 text-white" />
                      Reviews
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Booking Modal */}
      {isModalOpen && selectedVenue && (
        <BookingModal
          onClose={closeBookingModal}
          venue={selectedVenue} // Pass the selected venue details
        />
      )}

      {/* Review Modal */}
      {isReviewModalOpen && selectedVenue && (
        <ReviewModal
          onClose={closeReviewModal}
          venue={selectedVenue} // Pass the selected venue details for reviews
        />
      )}
    </div>
  );
};

export default Venues;
