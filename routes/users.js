const router = require("express").Router();
const User = require("../models/User");

// Register
router.put("/:id", async (req,res) => {
  if (req.body.userId == req.params.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body
      }, {new: true});
      console.log("User "+ JSON.stringify(updatedUser) +" was updated successfully");
      res.status(200).json(updatedUser);

    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    console.log("URL id and json data id do not match")
    res.status(401).json("URL id and json data id do not match");
  }
});

// Delete
router.delete("/:id", async (req,res) => {
  if (req.body.userId == req.params.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      const msg = {"message": "User was deleted", "userId": req.params.id};
      res.status(200).json(msg);

    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    console.log("URL id and json data id do not match")
    res.status(401).json("URL id and json data id do not match");
  }
});

// Export module
module.exports = router;