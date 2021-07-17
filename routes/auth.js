const router = require("express").Router();
import User, { findOne } from "../models/User";

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

    const user = await newUser.save();
    const {password, ...others} = user._doc;
    console.log("User "+ others.toString()+ " successfully registered.")
    res.status(200).json(others);

  } catch(err){
    res.status(500).json(err);
  }
});

// Login
router.post("/login", async (req,res) => {
  try{
    const user = await findOne({username: req.body.username});
    !user && res.status(400).json("Wrong username!");

    const validate_password = validate(req.body.password, user.password);
    !validate_password && res.status(400).json("Wrong password!");

    const {password, ...others} = user._doc;
    console.log("User "+ others.toString()+ " successfully logged in.")
    res.status(200).json(others);

  } catch(err){
    res.status(500).json(err);
  }
});

// Export module
export default router;