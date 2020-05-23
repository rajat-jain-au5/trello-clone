const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Board = require("./Board");
// const Blogs = require("./Blog");
var userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
   boards: [{ type: Schema.Types.ObjectId, ref: "board" }],
});
const User = mongoose.model("user", userSchema);
module.exports = User;
