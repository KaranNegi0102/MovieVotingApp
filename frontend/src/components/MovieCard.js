import React from 'react';

const MovieCard = ({ movie, handleVote , userId , handleRemoveVote}) => {

  const checkVoted = movie.votedBy.includes(userId);

  return (
    <div className=" rounded-lg p-4"
    style={
      {
        backgroundImage: 'url("/bgwallpaper2.jpeg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    }
    >
      <div className="bg-white-800 border-2 border-white-800 text-white p-6 rounded-lg shadow-lg max-w-xs w-full">
        <h3 className="text-xl font-semibold text-gray-200 mb-2">{movie.title}</h3>
        <p className="text-gray-400 mb-4">Votes: <span className="font-bold">{movie.votes}</span></p>
        <button
          onClick={() => checkVoted ? handleRemoveVote(movie._id) : handleVote(movie._id)}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none"
        >
          {
            checkVoted ? "Voted" : "Vote"
          }
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
