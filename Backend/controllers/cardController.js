var express = require("express");

var List = require("../Model/List");
var cardController = {};

cardController.addCard = async (req, res) => {
  try {
    var userId = req.user.id;
    const { text, listId } = req.body;
    const list = await List.findOne({ uid: userId });
    var card = list.lists.filter((el) => el._id == listId)[0];
    card.cards.push({ text });
    list.save();

    res.send(card);
  } catch (err) {
    console.log(err);
  }
};

cardController.updateCard = async (req, res) => {
  try {
    const userId = req.user.id;
    const { listId, cardId } = req.params;
    const { text } = req.body;
    List.findOne({ uid: userId }, function (e, data) {
      if (e) console.log(e);
      data.lists.id(listId).cards.id(cardId).text = text;
      data.save();
      res.json({ data });
    });
  } catch (err) {
    console.log(err);
  }
};

cardController.deleteCard = async (req, res) => {
  try {
    const userId = req.user.id;
    const { cardId } = req.params;
    const { listId } = req.params;
    const list = await List.findOne({ uid: userId });
    var li = list.lists.filter((el) => el._id == listId)[0];
    li.cards = li.cards.filter((el) => el._id != cardId);
    list.save();
    res.json({ data: list });
  } catch (err) {
    console.log(err);
  }
};

module.exports = cardController;
