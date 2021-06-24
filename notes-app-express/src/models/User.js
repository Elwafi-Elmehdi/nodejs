const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    email:{
        required:true,
        trim:true,
        type:String,
    },
    password:{
        type:String,
    }
})


const User =  mongoose.model('User',userSchema)
module.exports = User