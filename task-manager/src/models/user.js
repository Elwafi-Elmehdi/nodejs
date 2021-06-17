const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

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
   unique:true,
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

userSchema.statics.findByCredentials = async (email,password) => {

  const user = await User.findOne({email})
  if(!user) {
    throw new Error("Email Not found")
  }
  const isMatch =  await bcrypt.compare(password,user.password)
  if(!isMatch){
    throw new Error("Bad Credentials")
  }
  return user
}

 userSchema.pre('save', async function (next){
   const user = this
   if(user.isModified('password')){
     user.password = await bcrypt.hash(user.password,8)
   }
  next()
 })

const User = mongoose.model('User',userSchema)

module.exports = User;