var mongoose = require('mongoose')
var Schema = mongoose.Schema
// var db = require('../mongo')

var ListSchema = new mongoose.Schema({
    title: {
        type: String
    },
    index: {
        type: Number
    },
    id: {
        type: String
    },
    cards: [
        {
            text: {
                type: String
            },
            id: {
                type: String
            }
        }]
})

var List = mongoose.model('list', ListSchema)

module.exports = List