import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bg from '../assets/images/bg1.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch all user data from server
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/getAllUserData');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserData(data); // Set user data state
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error scenario (show error message, retry, etc.)
      }
    };

    fetchData(); // Call fetchData on component mount
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if the entered email and password match any user data using forEach

    let found = false;
    userData.forEach((user) => {
      if (user.email === email && user.password === password) {
        found = true;
      }
    });

    if (found) {
      navigate('/dashboard');
      localStorage.setItem('email', email);
    } else {
      document.body.classList.add('no-scroll');
      setModalOpen(true);
    }
  };

 


  const closeModal = () => {
    document.body.classList.remove('no-scroll');
    setModalOpen(false);
  };

  return (
    <div className="hero min-h-screen" style={{
      backgroundImage: `url(${bg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white">User Login Panel</h1>
        </div>
        <div className="card w-96 max-w-sm bg-base-100 bg-opacity-40 backdrop-blur-sm shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full">Login</button>
            </div>
          </form>
          <div className="form-control mb-10 flex items-center justify-center space-y-2">
            <p className="text-black font-normal">Dont have an account?</p>
            <button
              type="button"
              className="btn btn-success text-lg text-white hover:underline"
              onClick={() => navigate('/signup')}
            >
              Create New
            </button>
          </div>
        </div>
      </div>
      {/* Modal for displaying login failure */}
      <dialog id="credentials_err" className="modal" open={modalOpen}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Login Failed!</h3>
          <p className="py-4">Invalid email or password. Please try again.</p>
          <div className="modal-action">
            <button className="btn" onClick={closeModal}>Close</button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Login;
