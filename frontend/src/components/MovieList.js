import React, { useState, useEffect } from 'react';
import axios from "axios";
import socket from "../socket";
import MovieCard from './MovieCard';
import { useNavigate } from 'react-router-dom';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem('authToken');
    // console.log(token);
    
    if (token) {

      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUserId(decodedToken.id);
      console.log(decodedToken.id); 

      axios.get("http://localhost:5000/api/v1/allMovies", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then((res) => {
          setMovies(res.data);
        })
        .catch((err) => {
          console.error("Error fetching movies:", err);
        });
    } else {
      navigate('/login');
    }

    // Listen for vote updates
    socket.on("update-votes", (updatedMovies) => {
      setMovies(updatedMovies);
    });

    // Clean up the listener
    return () => {
      socket.off("update-votes");
    };
  }, []);

  const handleVote = (id ) => {
    console.log(id);
    const token = localStorage.getItem('authToken');
    
    if (token) {
      axios.post(`http://localhost:5000/api/v1/vote/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => {
          socket.emit("vote", id);
          console.log("Vote successful",id);
        })
        .catch((err) => {
          console.error("Error voting:", err);
        });
    } else {
      console.log('No token found, please login!');
    }
  };

  const handleRemoveVote = (id) => {
    const token = localStorage.getItem('authToken');

    if(token){
      axios.post(`http://localhost:5000/api/v1/removeVote/${id}`, {  }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(()=>{
        //yaha par kuch krna hoga
        socket.emit("removeVote", id);
        console.log("Vote removed",id);
      }).catch((err)=>{
        console.error("Error removing vote:", err);
      })
    }
    else{
      console.log('No token found, please login!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login'); // Redirect to login after logout
  };



  return (
    <div className="bg-gray-900 text-white p-6 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-200 mb-6">Movie List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} handleVote={handleVote} userId={userId} handleRemoveVote={handleRemoveVote} />
        ))}
      </div>
      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-300 ease-in-out"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default MovieList;
