var express = require("express");
var router = express.Router();
var auth = require("../middleware/auth");
var listController = require('../controllers/listController')
var cardController = require('../controllers/cardController')

// lists 
router.post("/add", auth, listController.addList)
router.get("/boardId/:id", auth, listController.getBoard)
router.post("/updatetitle/:listId", auth, listController.updateTitle)
router.delete("/delete/:listId", auth, listController.deleteList )
router.post("/dragginlist", auth, listController.dragNdrop )

//cards
router.post("/addcard", auth, cardController.addCard)
router.post("/updatecard/:listId/:cardId", auth, cardController.updateCard)
router.delete("/delete/:listId/:cardId", auth, cardController.deleteCard)




module.exports = router;
