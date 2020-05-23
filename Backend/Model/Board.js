const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var List = require('./List')
const BoardSchema = new Schema({
  boardtitle: String,
  uid: String,
  lists: [{ type: Schema.Types.ObjectId, ref: "list" }],
});

const Board = mongoose.model("board", BoardSchema);

module.exports = Board;
