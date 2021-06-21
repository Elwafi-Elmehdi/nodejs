const mongoose = require('mongoose')
// const validator = require('validator')ss

const TaskSchema = new mongoose.Schema({
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
},{
 timestamps:true
})

const Task = mongoose.model('Task',TaskSchema)

module.exports = Task