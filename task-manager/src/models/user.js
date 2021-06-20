const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  name:{
   type: String,
   required: true,
   trim: true
  },
  tokens:[{
    token: {
      type:String,
      required:true
    }
  }],
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

 userSchema.methods.toJSON = function() {
   const user = this
   const userVO = user.toObject()
   delete userVO.password
   delete userVO.tokens
   
   return userVO
 }

 userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner',
})

userSchema.methods.generateJwtToken = async function(){
  const user = this
  const token = JWT.sign({_id: user._id.toString()},'thisIsTopSecret')
  user.tokens = user.tokens.concat({token})
  await user.save()
  return token
}

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