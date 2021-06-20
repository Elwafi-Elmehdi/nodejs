const mongoose = require('mongoose')
// const validator = require('validator')ss

const Task = mongoose.model('Task',{
 desc:{
  trim:true,
  required:true,
  type:String
 },
 completed:{
  
  default:false,
  type:Boolean
 },
 owner: {
  type: mongoose.Schema.Types.ObjectId,
  required: true,
  ref:"User"
 }
})

module.exports = Task