const mongoose = require('mongoose')



const catSchema = new mongoose.Schema({
  name: {type:String, required:true},
  favoriteFood: {type:String, required:true},
  owner: {type:String, required:true},
  shotsUpToDate: Boolean
})

const Cat = mongoose.model('Cat',catSchema);

module.exports = Cat;
