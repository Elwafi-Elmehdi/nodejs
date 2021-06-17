const mongoose = require('mongoose')
const validator = require('validator')


const userSchema = new mongoose.Schema({
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
 userSchema.pre('save',async function (next){
  console.log('Just before saving');
  next()
 })

const User = mongoose.model('User',userSchema)

module.exports = User;