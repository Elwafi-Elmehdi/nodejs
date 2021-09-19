require('./db/mongoose')
const userRouter = require('./routes/User')
const noteRouter = require("./routes/Note")
const express = require('express')
const app = express()


// Routes
app.use(userRouter)
app.use(noteRouter)

app.use(express.json())

module.exports = app