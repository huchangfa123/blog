const mongoose = require('mongoose')

const Schema = mongoose.Schema

const paperSchema = new Schema({
  title: {type: String},
  content: {type: String}
})
const Paper = mongoose.model('paper', paperSchema)

module.exports = Paper
