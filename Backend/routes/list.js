var express = require('express');
var router = express.Router();

var List = require('../Model/List')


router.post('/add', async (req, res) => {
    try {
        
        var object = {
            title: req.body.title,
            _id: req.body.listId,
            index: req.body.index
        }
        let list = await List.create(object);
      
        res.send(list)
    }
    catch (err) {
        console.log(err)
        res.status(400).send(err)
    }

})

router.post('/addcard', async (req, res) => {
    try {
        const { text, listId } = req.body
        
        const list = await List.findById(listId)
        
        list.cards.push({ text })
        await list.save();
        res.send(list)
    }
    catch (err) {
        console.log(err)
    }
})

router.post('/updatetitle/:listId', async (req, res) => {
    try {
        const { listId } = req.params
        const { title, index } = req.body

        await List.findOneAndUpdate({ _id: listId }, { title }, { upsert: true }, function (err, doc) {
            if (err) return res.send(500, { error: err });
            return res.send('Succesfully saved.');
        });

    }
    catch (err) {
        console.log(err)
    }
})


router.post('/dragginlist', async (req, res) => {
    try {
        console.log(req.body)
        const { droppableIdStart,
            droppableIdEnd,
            droppableIndexStart,
            droppableIndexEnd,
            draggableId,
            type, listId } = req.body
    

        if (type === "list") {
            const lists = await List.find({})
            lists.forEach(async el => {
                if (el._id == draggableId) {
                    el.index = droppableIndexEnd
                }
                else if (el.index > droppableIndexStart && el.index <= droppableIndexEnd) {
                    el.index--
                }
                else if (el.index < droppableIndexStart && el.index >= droppableIndexEnd) {
                    el.index++
                }
                await el.save()
            })
        }
        if(droppableIdStart==droppableIdEnd){
            const list= await List.findById(droppableIdStart)
            const card= list.cards.splice(droppableIndexStart,1)[0]
            console.log(card)
            list.cards.splice(droppableIndexEnd,0,card)
           await  list.save()
        }
        if(droppableIdStart != droppableIdEnd){
            const listStart = await List.findById(droppableIdStart)
            const listEnd = await List.findById(droppableIdEnd)
            const cardstart = listStart.cards.splice(droppableIndexStart,1)[0]
            await listStart.save();
            listEnd.cards.splice(droppableIndexEnd,0,cardstart)
            await listEnd.save();
        }
         



        //   lists.save()
        res.send("list send")
    }
    catch (err) {
        console.log(err)
    }


})
router.post('/updatecard/:listId/:cardId', async (req, res) => {
    try {
        const { listId, cardId } = req.params
        // console.log(req.params, req.body.text)
        const { text } = req.body
        await List.update({ '_id': listId, 'cards._id': cardId }, { $set: { 'cards.$.text': text } }, function (err, doc) {
            if (err) return res.send(500, { error: err });
            return res.send('Succesfully saved.');
        });


    }
    catch (err) {
        console.log(err)
    }
})

router.delete('/delete/:listId', async (req,res)=>{
    try{
         const {listId} =req.params
         console.log(listId)
        const list = await List.findByIdAndRemove(listId)
        // const list = await List.deleteOne(listId)
        // console.log(list)
         res.send(list)
    }
    catch(err){
    console.log(err)
    }
})

router.get('/all', async (req, res) => {
    try {
        var list = await List.find().sort({ index: 1 })
        res.send(list)

    }
    catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
})



router.delete('/delete/:listId/:cardId', async (req, res) => {
    try {
        const { cardId } = req.params
        const { listId } = req.params
        const list = await List.findById(listId)
        console.log(list)
        list.cards = list.cards.filter(el => el._id != cardId)
        // console.log(list)
        await list.save();
        res.send(list)
       

    }
    catch (err) {
        console.log(err)
    }
})
module.exports = router;
