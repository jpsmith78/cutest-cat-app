const mongoose = require('mongoose')



const catSchema = new mongoose.Schema({
  name: {type:String, required:true},
  img: {type:String},
  owner: String,
  ownerId: String,
  about: String,
  willScratch: Boolean,
  likes: {type:Number, default:0}
})

const Cat = mongoose.model('Cat',catSchema);

module.exports = Cat;
