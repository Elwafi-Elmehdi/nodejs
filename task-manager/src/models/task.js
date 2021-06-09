const mongoose = require('mongoose')
// const validator = require('validator')s

const Task = mongoose.model('Task',{
 desc:{
  trim:true,
  required:true,
  type:String
 },
 completed:{
  
  default:false,
  type:Boolean
 }
})

module.exports = Task