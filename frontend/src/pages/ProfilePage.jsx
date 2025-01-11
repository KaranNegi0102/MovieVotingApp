import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token) {
      axios
        .get("http://localhost:5000/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUsername(res.data.username);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 401) {
            localStorage.removeItem('authToken');
            navigate('/login');
          }
        });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setUsername('');
    navigate('/login'); // Redirect to login after logout
  };

  return (
    
      <div className="flex gap-5 items-center bg-gray-800 p-4 rounded-lg shadow-md w-72">
       
        <div className="mb-1">
          <p className="text-xl font-medium">{username}</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition w-full"
        >
          Logout
        </button>
      </div>
    
  );
};

export default ProfilePage;
