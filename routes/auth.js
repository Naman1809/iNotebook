const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt =require('bcryptjs')
const { body, validationResult } = require("express-validator");
const JWT_SECRET = 'Namanisaverygood$$boy';
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");
//ROUTE 1: create a user using:POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("name", "Min length of password must be 5 charcters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success=false;
    // if there are errors, return Bad Request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    // check wheter the user with same email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: " Sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password,salt);
      // creating a  new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
const data={
    user:{
        id:user.id
    }
}
const authtoken= jwt.sign(data,JWT_SECRET);
success = true;
res.json({success,authtoken});
    } catch (error) {
      console.error(error.message);
      res.status(500).send(success,"Some error occured");
    }
  }
);

// ROUTE 2 : now we will autenitcate a user
router.post('/login',[
  body("email", "Enter a valid email").isEmail(),
  body("password", "password cannot be blank").exists(),
], async (req,res) =>{
  let success=false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success,errors: errors.array() });
  }

const {email, password} = req.body;
try{
  let user = await User.findOne({email});
  if (!user) {
    return res.status(400).json({ success,error: " Please try with valid credentials1" });
  }
  const passwordCompare = await bcrypt.compare(password,user.password);
  if(!passwordCompare){
    return res.status(400).json({success, error: " Please try with valid credentials2" });

  }
  const data ={
    user:{
      id:user.id
    }
  }
  const authtoken= jwt.sign(data,JWT_SECRET);
      
      success = true;
      res.json({success,authtoken});
}catch(error){
  console.log(error.message);
  res.status(500).send("Internal Server Error")
}

})

//ROUTE 3: Getting details od the logined user POST "/api/auth/getuser"
 
router.post('/getuser',fetchuser ,async(req,res) =>{

  try{
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user);
  } catch(error){
console.error(error.message);
res.status(500).send("Internal Server Error")
}})
module.exports = router;
