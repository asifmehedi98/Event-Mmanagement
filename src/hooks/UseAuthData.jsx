import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuthData = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get email from local storage
    const email = localStorage.getItem('email');

    // If no email found, redirect to login
    if (!email) {
      navigate('/login');
      return;
    }

    // Fetch user data from server by email
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/getUserDataByEmail?email=${email}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data); // Set the user data
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error: clear local storage and navigate to login
        localStorage.removeItem('email');
        navigate('/login');
      }
    };

    fetchUserData(); // Call the function to fetch user data
  }, [navigate]);

  return userData; // Return the fetched user data
};

export default useAuthData;
