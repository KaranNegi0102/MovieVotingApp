const express = require("express");
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const movieModel = require("./models/Movie");
const connectDB = require("./config/databaseDB");
const cors = require("cors");

// Connection to DB
connectDB();

// Middlewares
app.use(cors({
  origin: "http://localhost:3000", // Replace with your frontend's origin
}));
app.use(express.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Server for Socket.IO
const { Server } = require("socket.io");
const http = require("http");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Adjust if your frontend runs on a different port
    methods: ["GET", "POST"],
  },

});
global.io = io;  //done this so that io globally accessible hojaye


// Real-time communication setup
io.on("connection", (socket) => {
  console.log("User connected to Socket.IO");

  // Listen for vote events
  socket.on('vote', async (movieId) => {
    try {
      const movie = await movieModel.findById(movieId);
      if (movie) {
        movie.votes += 1;
        await movie.save();

        // Fetch updated movies and broadcast to all clients
        const updatedMovies = await movieModel.find();
        io.emit('update-votes', updatedMovies);
      }
    } catch (err) {
      console.error("Error updating vote:", err);
    }
  });


  socket.on('removeVote', async (movieId) => {
    try {
      const movie = await movieModel.findById(movieId);
      if (movie) {
        
        await movie.save();

        // Fetch updated movies and broadcast to all clients
        const updatedMovies = await movieModel.find();
        io.emit('update-votes', updatedMovies);
      }
    } catch (err) {
      console.error("Error updating vote:", err);
    }
  });

  socket.on('disconnect', () => {
    console.log("User disconnected from Socket.IO");
  });
});

// Routes

app.use("/api/v1",require("./routes/movieRoute"));
app.use("/auth",require("./routes/authRoute"));



// Server listening
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});