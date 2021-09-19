const mongoose = require('mongoose')
const User = require('../../src/models/User')
const jwt = require('jsonwebtoken')

const userOneId = new mongoose.Types._ObjectId()

const userOne = {
    _id: userOneId,
    firstname:"Mehdi",
    lastname:"ELwafi",
    email:"mehdi@mehdi.dev",
    password:"Hello,Wolrd@#"
}

const initDB = async () => {
    await User.deleteMany()
    new User(userOne).save()
}

module.exports = {
    userOneId,
    userOne,
    initDB
}