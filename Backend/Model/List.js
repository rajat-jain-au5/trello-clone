var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// var db = require('../mongo')

var ListSchema = new mongoose.Schema({
  lists: [
    {
      title: {
        type: String,
      },
      index: {
        type: Number,
      },

      cards: [
        {
          text: {
            type: String,
          },
          id: {
            type: String,
          },
        },
      ],
      boardId: String,
    },
],
  uid: String,
});

var List = mongoose.model("list", ListSchema);

module.exports = List;
