const mongoose = require('mongoose')
const Schema = mongoose.Schema

const idenSchema = new Schema({
  id: {type: String},
  token: {type: String}
})

const identity = mongoose.model('identity', idenSchema)

module.exports = identity
