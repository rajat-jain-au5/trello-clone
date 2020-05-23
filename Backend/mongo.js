const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const uri = process.env.MongoDB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(
  async (res) => {
    console.log("mongodb is connected succesfully");
  },
  (err) => {
    console.log("error in connection");
  }
);
