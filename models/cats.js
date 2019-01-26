const mongoose = require('mongoose')



const catSchema = new mongoose.Schema({
  name: {type:String, required:true},
  img: {type:String},
  owner: String,
  about: String,
  likes: {type:Number, default:0},
  shotsUpToDate: Boolean
})

const Cat = mongoose.model('Cat',catSchema);

module.exports = Cat;
