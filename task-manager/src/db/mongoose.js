const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
 useNewUrlParser: true,
 useCreateIndex: true
})

const User = mongoose.model('User',{
 name:{
  type: String,
  required: true,
  trim: true
 },
 email:{
  type:String,
  required:true,
  trim:true,
  lowercase:true,
  validate(value){
   if(!validator.isEmail(value)){
    throw new Error('email is invalid')
   }
  },
 },

 age:{
  default: 0,
  type: Number,
  validate(value){
   if(value < 0)
    throw new Error('age is invalid')
  },
 },
})

const Task = mongoose.model('Task',{
 desc:{
  type:String
 },
 completed:{
  type:Boolean
 }
})

// const day = new Task({
//  desc:"Sbah lkhir",
//  completed:true
// })

// day.save().then((result) => {
//  console.log(result);
// }).catch((err) => {
//  console.log(err);
// });



const me = new User({
 name:"  Said   ",
 email:"  Hello@gmail.com  ",
})

me.save().then(() => {
 console.log(me);
}).catch((error)=>{
 console.log("Error ",error)
})