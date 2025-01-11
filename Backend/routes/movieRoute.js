const express = require("express");

const router = express.Router();

const {allMovies,voteMovie,removeVote} = require("../controllers/movieController");
const authenticate = require("../middleware/auth");


//testing route
// router.route('/test').get(authenticate,(req,res)=>{
//   res.json({
//     success:true,
//     message:"testing route"
//   });
// })

//this route was for all Movies
router.route('/allMovies').get(allMovies);

// this route is for voting the movies
router.route('/vote/:id').post(authenticate,voteMovie);
router.route('/removeVote/:id').post(authenticate,removeVote);



module.exports = router;