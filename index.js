const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");

// Connect to db
dotenv.config();
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
.then(console.log("Connected to MongoDB"))
.catch((err) => console.log(err));


// Create App
const app = express();
app.use(express.json());  // To be able to send json data as part of the body

// Set up routes
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);

// Start app
app.listen("5000", ()=>{
  console.log("Backend Node is running");
});