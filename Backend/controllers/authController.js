const userModel = require ("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
exports.register = async(req,res)=>{
  try{
    const {username,password}= req.body;

    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = await userModel.create({
      username:username,
      password:hashedPassword
    });
    res.status(200).json({
      success:true,
      message:"User created successfully"
    })
  }catch(err){
    console.log(err);
    res.status(500).json({
      success:false,
      message:"Internal server error"
    })
  }
}

exports.login= async (req,res)=>{
  try{
    const {username,password}= req.body;
    const existingUser = await userModel.findOne({username:username});
    if(!existingUser){
      console.log("User not found");
      return res.status(404).json({
        success:false,
        message:"User not found"
      })
      
    }
    const isPasswordCorrect = await bcrypt.compare(password,existingUser.password);
    if(!isPasswordCorrect){
      return res.status(401).json({
        success:false,
        message:"Incorrect password"
      })
    }
    const token = jwt.sign({username:existingUser.username,id:existingUser._id},
      process.env.SECRET_KEY,
      {expiresIn:"24h"});

      
      const options = {
        expires: new Date(Date.now() + 3*24*60*60*1000),
        httpOnly:true
      }

    res.cookie("token",token,options).status(200).json({
      success:true,
      message:"Login successful",
      token:token,
      user:existingUser
    })
    // console.log(existingUser);
  }catch(err){
    console.log(err);
    res.status(500).json({
      success:false,
      message:"Internal server error"
    })
  }
}