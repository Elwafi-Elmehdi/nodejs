const express = require('express')
const cors = require('cors')
require('./db/mongoose')
const app = express()
const port  = process.env.PORT || 3000

const userRouter = require('./provided/userProvided')
const taskRouter = require('./provided/taskProvided')
const path = require("path");

app.use(express.json())
app.use(cors())
app.use(userRouter)
app.use(taskRouter)

app.use('/default',express.static(path.join(__dirname,'../avatars') ))

app.listen(port,() =>{
 console.log("Lisening on ",port);
})
