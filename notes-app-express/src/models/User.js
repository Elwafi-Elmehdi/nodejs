const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    email:{
        unique:true,
        required:true,
        trim:true,
        type:String,
    },
    password:{
        type:String,
        trim:true,
        required:true
    }
})

userSchema.pre('save', async function (next){
    const user = this
    const password = user.password
    const encodedPassword = await bcrypt.hash(password,8)
    user.password = encodedPassword
    next()
})


const User =  mongoose.model('User',userSchema)
module.exports = User
