const mongoose  = require("mongoose");

require("dotenv").config();
const connectDB= async()=>{
  try{
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB connected : ${connection.connection.host}`);
  }catch(error){
    console.log("Error in connecting to MongoDB");
    console.log(error);
    process.exit(1);
  }
}

module.exports = connectDB;