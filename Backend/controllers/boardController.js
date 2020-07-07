var Board = require("../Model/Board");
const boardController = {};

boardController.addBoard = async (req, res) => {
  try {
    console.log(req.body);
    var userId = req.user.id;
    var object = {
      boardtitle: req.body.boardtitle,
      uid: userId,
    };
    let board = await Board.create(object);
    // console.log(board)

    res.send(board);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

boardController.getBoard = async (req, res) => {
  try {
    const userId = req.user.id;
    var board = await Board.find({ uid: userId });

    console.log(board);
    res.send(board);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

boardController.getBoardById = async (req, res) => {
  try {
    var userId = req.user.id;
    var { id } = req.params;

    let product = await Board.findOne({ _id: id });
    // console.log("21",product)
    res.json({ data: product });
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
};

boardController.deleteBoard= async (req,res)=>{
   try {
     const userId = req.user.id;
     const { boardId } = req.params;
    let board = await Board.findOneAndDelete({ _id: boardId });
    board.save()
     res.json({ data: board });
   } catch (err) {
     console.log(err);
   }
}
module.exports = boardController;
