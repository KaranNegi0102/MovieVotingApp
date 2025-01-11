const mongoose = require("mongoose");

const movieModel = new mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  votes:{
    type: Number,
    default: 0
  },
  votedBy :[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }],
  
})

module.exports = mongoose.model("Movie" , movieModel);