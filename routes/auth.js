const router = require("express").Router();
const User = require("../models/User");

function validate(s1, s2) {
  const s1_trimmed = s1.toString().trim();
  const s2_trimmed = s2.toString().trim();
  return s1_trimmed === s2_trimmed;
}

// Register
router.post("/register", async (req,res) => {
  try{
    const newUser = new User({
      username: req.body.username,
      password: req.body.password
    });
    console.log("Attempting to save "+JSON.stringify(newUser));

    const user = await newUser.save();
    const {password, ...others} = user._doc;
    console.log("User "+ others.toString()+ " successfully registered.");
    res.status(200).json(others);

  } catch(err){
    res.status(500).json(err);
  }
});

// Login
router.post("/login", async (req,res) => {
  try{
    const user = await User.findOne({username: req.body.username});
    !user && res.status(400).json("Wrong username!");

    const validate_password = validate(req.body.password, user.password);
    !validate_password && res.status(400).json("Wrong password!");

    const {password, ...others} = user._doc;
    console.log("User "+ JSON.stringify(others) +" successfully logged in.");
    res.status(200).json(others);

  } catch(err){
    res.status(500).json(err);
  }
});

// Export module
module.exports = router;