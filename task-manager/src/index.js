const express = require('express')
require('./db/mongoose')
const app = express()
const port  = process.env.PORT || 3000

const userRouter = require('./provided/userProvided')
const taskRouter = require('./provided/taskProvided')
// const auth = require('./middleware/auth')

// app.use(auth)


//  // Desactivating Services 
// app.use( (req,res,next) => {
//   res.status(503).send('The Site is under Maintenance Please try another time')
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port,() =>{
 console.log("Lisening on ",port);
})
const Task = require('./models/task')
const User = require('./models/user')
const fn = async () => {
 // const taska = await Task.findById('60cf883c0feb2b2228a465ee')
 // await taska.populate('owner').execPopulate()
 // console.log(taska.owner);
 const user = await User.findById('60cf86ef2ac033214c5bdeb6')
 await user.populate('tasks').execPopulate()
 console.log(user.tasks);
}
fn()