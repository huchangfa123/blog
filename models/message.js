const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UsermessageSchema = new Schema({
  name: {type: String, default: 'huchanfa'},
  birth: {type: String, default: '1995-08-20'},
  introduce: {type: String, default: '123'},
  Only: {type: Boolean, default: true}
})
const message = mongoose.model('message', UsermessageSchema)
module.exports = message
