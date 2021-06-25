const express = require('express')
require('./src/db/mongoose')
const userRouter = require('./src/routes/User')
const noteRouter = require('./src/routes/Note')
const app = express()
app.use(express.json())
const port = 3000

// Routes
app.use(userRouter)
app.use(noteRouter)

app.listen(port,() => {
    console.log("SERVER RUNING ON",port)
})
