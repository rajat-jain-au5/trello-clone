var List = require("../Model/List");

const listController = {};
listController.getBoard = async (req, res) => {
  try {
    var userId = req.user.id;
    var { id } = req.params;

    let product = await List.findOne({ uid: userId });
    let list = product.lists
      .filter((el) => el.boardId === id)
      .sort((a, b) => a.index - b.index);

    res.json({ data: list });
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
};
listController.addList = async (req, res) => {
  try {
    var list = await List.findOne({ uid: req.user.id });
    var object = {
      title: req.body.title,
      _id: req.body.listId,
      index: req.body.index,
      boardId: req.body.boardId,
    };
    if (list == null) {
      const list = new List();
      list.lists.push(object);
      list.uid = req.user.id;

      list.save();
      res.send(list.lists);
    } else {
      list.lists.push(object);
      list.save();
      res.send(list.lists);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

listController.updateTitle = async (req, res) => {
  try {
    var userId = req.user.id;
    const { listId } = req.params;
    const { title, index, boardId } = req.body;
    let post = await List.findOneAndUpdate(
      { uid: userId, lists: { $elemMatch: { _id: listId } } },
      {
        $set: {
          "lists.$.title": title,
        },
      }, // list fields you like to change
      { new: true, safe: true }
    );
    res.json({ data: post.lists });
  } catch (err) {
    console.log(err);
  }
};

listController.deleteList = async (req, res) => {
  try {
    const userId = req.user.id;
    const { listId } = req.params;
    const list = await List.findOne({ uid: userId });
    const li = list.lists.pull({ _id: listId })[0];

    list.save();
    res.json({ data: li });
  } catch (err) {
    console.log(err);
  }
};

listController.dragNdrop = async (req, res) => {
  try {
    const {
      droppableIdStart,
      droppableIdEnd,
      droppableIndexStart,
      droppableIndexEnd,
      draggableId,
      type,
      listId,
      boardId,
    } = req.body;
    var userId = req.user.id;

    if (type === "list") {
      const lists1 = await List.find({ uid: userId });
      lists1[0].lists.forEach(async (el) => {
        if (el.boardId == boardId) {
          if (el._id == draggableId) {
            el.index = droppableIndexEnd;
          } else if (
            el.index > droppableIndexStart &&
            el.index <= droppableIndexEnd
          ) {
            el.index--;
          } else if (
            el.index < droppableIndexStart &&
            el.index >= droppableIndexEnd
          ) {
            el.index++;
          }
        }
      });
      await lists1[0].save();
      res.send(lists1[0]);
    }
    if (droppableIdStart == droppableIdEnd) {
      const list = await List.find({ uid: userId });
      list[0].lists.forEach(async (el) => {
        if (el.boardId == boardId) {
          if (el._id == droppableIdStart) {
            var card = el.cards.splice(droppableIndexStart, 1)[0];
            el.cards.splice(droppableIndexEnd, 0, card);
          }
        }
      });
      await list[0].save();
      res.send(list[0]);
    }
    if (droppableIdStart != droppableIdEnd) {
      const user = await List.find({ uid: userId });

      user[0].lists.forEach(async (el) => {
        if (el.boardId == boardId) {
          if (el._id == droppableIdStart) {
            user[0].lists.forEach(async (a) => {
              if (a.boardId == boardId) {
                if (a._id == droppableIdEnd) {
                  const cardstart = el.cards.splice(droppableIndexStart, 1)[0];
                  cardend = a.cards.splice(droppableIndexEnd, 0, cardstart);
                }
              }
            });
          }
        }
      });

      await user[0].save();
    }
    res.send("list send");
  } catch (err) {
    console.log(err);
  }
};
module.exports = listController;
