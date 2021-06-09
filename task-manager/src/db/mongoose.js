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
 password:{
   type:String,
   required:true,
   trim: true,
   minlength:6,
   validate(value) {
    if(value.toLowerCase().includes("password"))
      throw new Error("password is invalid")
   }
   
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
  trim:true,
  required:true,
  type:String
 },
 completed:{
  
  default:false,
  type:Boolean
 }
})

const day = new Task({
 desc:"   foo",
})

day.save().then((result) => {
 console.log(result);
}).catch((err) => {
 console.log(err);
});



// const me = new User({
//  name:"  aziz   ",
//  email:"  Hello@gmail.com  ",
//  password: "     passw"
// })

// me.save().then(() => {
//  console.log(me);
// }).catch((error)=>{
//  console.log(error)
// })