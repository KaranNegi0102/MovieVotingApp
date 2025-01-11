const express = require("express");

const router = express.Router();
const {register,login} = require("../controllers/authController");
const {getProfile} = require("../controllers/profileController");
const authenticate = require("../middleware/auth");

//login and register rouyte
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/profile').get(authenticate,getProfile);



module.exports = router;
