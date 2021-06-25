const express = require('express')
require('./src/db/mongoose')
const userRouter = require('./src/routes/User')
const app = express()
app.use(express.json())
const port = 3000

// Routes
app.use(userRouter)

app.listen(port,() => {
    console.log("SERVER RUNING ON",port)
})
