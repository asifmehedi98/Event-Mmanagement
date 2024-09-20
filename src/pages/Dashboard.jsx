import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Dashboard = () => {
  const navigate = useNavigate();

  // Check if user is logged in, redirect to login if not
  useEffect(() => {
    const email = localStorage.getItem('email');
    if (!email) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('email');
    navigate('/login');
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-gray-900 text-white w-64 h-full fixed z-50 flex flex-col">
        <div className="p-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <nav className="flex-1">
          <ul className="space-y-3">
            <Link to={"/dashboard"}><li className="px-4 py-2 hover:bg-gray-800 cursor-pointer">Home</li></Link>
            <Link to="/profile"><li className="px-4 py-2 hover:bg-gray-800 cursor-pointer">Profile</li></Link>
            <Link to="/venues"><li className="px-4 py-2 hover:bg-gray-800 cursor-pointer">Venues</li></Link>
            
          </ul>
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 ml-64">
        <div className="navbar bg-gray-800 shadow-xl px-4 py-2">
          <a href="/" className="text-white text-xl font-bold">
            Event Management Service
          </a>
          <div className="flex items-center ml-auto space-x-4">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto bg-gray-700"
            />
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full overflow-hidden">
                  <img
                    alt="User avatar"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <ul className="menu menu-sm dropdown-content bg-gray-800 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li>
                  <a className="justify-between cursor-pointer" onClick={handleLogout}>
                    Logout
                    <span className="badge bg-red-500">New</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div className="carousel w-full">
          <div id="slide1" className="carousel-item relative w-full">
            <img
              src="/src/assets/images/rest1.jpg"
              className="w-full"
            />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#slide4" className="btn btn-circle">❮</a>
              <a href="#slide2" className="btn btn-circle">❯</a>
            </div>
          </div>
          <div id="slide2" className="carousel-item relative w-full">
            <img
              src="/src/assets/images/rest2.jpg"
              className="w-full"
            />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#slide1" className="btn btn-circle">❮</a>
              <a href="#slide3" className="btn btn-circle">❯</a>
            </div>
          </div>
          <div id="slide3" className="carousel-item relative w-full">
            <img
              src="/src/assets/images/rest3.jpg"
              className="w-full"
            />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#slide2" className="btn btn-circle">❮</a>
              <a href="#slide4" className="btn btn-circle">❯</a>
            </div>
          </div>
          <div id="slide4" className="carousel-item relative w-full">
            <img
              src="/src/assets/images/rest4.jpg"
              className="w-full"
            />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#slide3" className="btn btn-circle">❮</a>
              <a href="#slide1" className="btn btn-circle">❯</a>
            </div>
          </div>
        </div>

        <p className="p-20 text-center text-5xl font-semibold">About Us</p>

        {/* Timeline */}
        <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
          <li>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="timeline-start mb-10 md:text-end">
              <time className="font-mono italic">2011</time>
              <div className="text-lg font-black">First Establishement</div>
              Event Management Service was founded in 2011 with the goal of providing a platform for event organizers to manage their events efficiently. Our team of dedicated professionals has been working tirelessly to improve the platform and offer the best experience to our users.
            </div>
            <hr />
          </li>
          <li>
            <hr />
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="timeline-end mb-10">
              <time className="font-mono italic">2014</time>
              <div className="text-lg font-black">Start of a Glory</div>
              In 2014, Event Management Service reached a milestone of 1 million users. This marked the beginning of a new era for the platform, as we continued to grow and expand our services to meet the needs of our users. We are proud to have served millions of users over the years and look forward to many more years of success.
            </div>
            <hr />
          </li>
          <li>
            <hr />
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="timeline-start mb-10 md:text-end">
              <time className="font-mono italic">2018</time>
              <div className="text-lg font-black">Customer Satisfaction</div>
              Customer satisfaction has always been our top priority. In 2018, we introduced a new feedback system to gather user feedback and improve our services. This initiative has helped us better understand our users needs and make informed decisions to enhance the platform.
            </div>
            <hr />
          </li>
          <li>
           
            <hr />
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="timeline-end mb-10">
              <time className="font-mono italic">2020</time>
              <div className="text-lg font-black">Tackle the Covid</div>
              The COVID-19 pandemic posed a significant challenge to the event industry. In response, we introduced new features to support virtual events and help organizers adapt to the changing landscape. Despite the challenges, we remained committed to our mission of providing a seamless event management experience
            </div>
            <hr />
          </li>
          <li>
            <hr />
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="timeline-start mb-10 md:text-end">
              <time className="font-mono italic">2024</time>
              <div className="text-lg font-black">Multi Billion Doller Industry</div>
              In 2024, the event management industry is projected to be worth billions of dollars. Event Management Service is poised to capture a significant share of this market with our innovative solutions and user-centric approach. We are excited about the future and look forward to continued growth and success.
            </div>
          </li>
        </ul>
        <footer className="footer bg-base-200 text-base-content p-10">
  <nav>
    <h6 className="footer-title">Services</h6>
    <a className="link link-hover">Branding</a>
    <a className="link link-hover">Design</a>
    <a className="link link-hover">Marketing</a>
    <a className="link link-hover">Advertisement</a>
  </nav>
  <nav>
    <h6 className="footer-title">Company</h6>
    <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>
    <a className="link link-hover">Jobs</a>
    <a className="link link-hover">Press kit</a>
  </nav>
  <nav>
    <h6 className="footer-title">Legal</h6>
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
  </nav>
  <form>
    <h6 className="footer-title">Newsletter</h6>
    <fieldset className="form-control w-80">
      <label className="label">
        <span className="label-text">Enter your email address</span>
      </label>
      <div className="join">
        <input
          type="text"
          placeholder="username@site.com"
          className="input input-bordered join-item" />
        <button className="btn btn-primary join-item">Subscribe</button>
      </div>
    </fieldset>
  </form>
</footer>
      </div>
      
    </div>
  );
};

export default Dashboard;
