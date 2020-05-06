// var express = require('express');
// var router = express.Router();

// var Cards = require('../Model/Card')
// var Lists = require('../Model/List')


// router.post('/add/:listId', async (req,res)=>{
//     try{
//         console.log(req.body.text)
//     //     var object={
//     //                 text:req.body.text,
//     //                 id:req.body.id,
//     //                 // cards:req.body.cards
//     //             }
//     //    Lists.findOne({_id:req.body.listId})
//     //    .then(list=>{
//     //        const newCard = new Cards(object)
//     //        list.cards=newCard

//     //        Lists
//     //       .save()
//     //       .then(list => {
//     //         console.log("saved user profile1");
//     //         // res.redirect("/profile/2");
//     //         req.send(list)
//     //       })
//     //       .catch(err => console.log(err));
//     //    })
//     //   
//         let list = await Cards.create(object);
//         // console.log("sasa", list);
//        res.send(list) 
//     }
//     catch(err){
//         console.log(err)
//         res.status(400).send(err)
//     }
    
// })


// router.get('/all', async (req,res)=>{
//     try{
//         var card =await Cards.find();
//         // console.log("sasa", list);
//         res.send(card)

//     }
//     catch(err){
//         console.log(err)
//         res.status(400).send(err)
//     }
// })

// router.patch('/update/:cardId', (req,res)=>{
//     try{
//         // console.log(req.body)
//         var object={
//             text:req.body.text,
//             id:req.body.id,
//             // cards:req.body.cards
//         }
//        let card =Cards.findByIdAndUpdate({id:req.params.cardId},{$set:{object}},{upsert:true})
//        res.send(card)
//     // let li = Lists.findOne({id:req.body.id})
//     // .then(list =>{
//     //    var li= Lists.updateOne(object);
//     //     res.send(li)
//     // })
        

//     }
//     catch(err){
//         console.log(err)
//         res.status(400).send(err)
//     }
// })

// module.exports=router