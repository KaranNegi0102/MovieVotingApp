const userModel = require("../models/userModel");
exports.getProfile= async(req,res)=>{
  try{
    const userId = req.userId;
    const user= await userModel.findById(userId).select("username");
    res.status(200).json(user);

  }catch(err){
    console.log(err);
    res.status(500).json({message:"Server error"});
  }
}
