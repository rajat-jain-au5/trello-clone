var express = require("express");
var router = express.Router();
var auth = require("../middleware/auth");
var boardController = require("../controllers/boardController");
router.post("/addboard", auth, boardController.addBoard);

router.get("/all", auth, boardController.getBoard);

router.get("/:id", auth, boardController.getBoardById);
router.delete("/delete/:boardId", auth, boardController.deleteBoard);
module.exports = router;
