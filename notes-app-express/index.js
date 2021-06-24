const express = require('express')
require('./src/db/mongoose')
const userRouter = require('./src/routes/User')
const app = express()
const port = 3000

// Routes
app.use(userRouter)

// Express Configuration
app.use(express.json())


app.listen(port,() => {
    console.log("SERVER RUNING ON",port)
})
