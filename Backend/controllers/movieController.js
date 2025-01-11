const movieModel = require("../models/Movie");
const auth = require("../middleware/auth");

exports.allMovies = async(req,res)=>{
  try{
    const movies= await movieModel.find();
    res.status(200).json(movies);
  }
  catch(err){
    console.log(err);
  }
}

exports.voteMovie = async (req, res) => {
  try {
    const userId = req.userId;
    const movie = await movieModel.findById(req.params.id);
    console.log(movie);

    if (movie && !movie.votedBy.includes(userId)) {
      movie.votedBy.push(userId);
      movie.votes+1; 
      await movie.save();

      const updatedMovie = await movieModel.find().populate("votedBy", "username"); 
      io.emit('update-votes', updatedMovie);
      res.status(200).json({ message: "Vote successful" });
    } else {
      res.status(404).json({ message: "Already voted or  Movie not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.removeVote = async(req,res)=>{

  try{
    const userId = req.userId;
    const movie = await movieModel.findById(req.params.id);
  if(movie && movie.votedBy.includes(userId)){
    movie.votedBy.pull(userId);
    movie.votes -=1;
    await movie.save();

    const updatedMovie = await movieModel.find().populate("votedBy","username");
    io.emit('update-votes', updatedMovie);
    res.status(200).json({message:"Vote removed"});
  }
  else{
    res.status(404).json({message:"Already voted or Movie not found"});
  }

  }
  catch(err){
    console.log(err);
    res.status(500).json({message:"Server error"});
  }
  
}