const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = async (req,res,next)=>{
  try{
    console.log("headers====> ",req.headers.authorization)
    console.log("body====> ",req.body.token);
    console.log("cookies====> ",req.cookies.token);

    const token = req.cookies.token || req.body.token || req.headers.authorization && req.headers.authorization.split(' ')[1];
    console.log("yaha hu ab mei =====>",token)
    // Assuming login response contains a token

    if(!token){
      return res.status(401).json({
        success:false,
        message:"Unauthorized h bhai",
      })
    }
    const decode = jwt.verify(token,process.env.SECRET_KEY);
    console.log("decode",decode)
    req.user=decode;
    console.log(req.user)
    req.userId=decode.id;
    console.log(req.userId)
    next();
    
  }catch(err){
    console.log(err)
    res.status(500).json({
      success:false,
      message:"Internal server error"
    })
  }
}

module.exports = authenticate;