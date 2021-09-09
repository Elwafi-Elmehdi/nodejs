const express = require('express')
const cors = require('cors')
require('./db/mongoose')
const app = express()

const userRouter = require('./provided/userProvided')
const taskRouter = require('./provided/taskProvided')
const path = require("path");

app.use(express.json())
app.use(cors())
app.use(userRouter)
app.use(taskRouter)

app.use('/default',express.static(path.join(__dirname,'../avatars') ))

module.exports = app
