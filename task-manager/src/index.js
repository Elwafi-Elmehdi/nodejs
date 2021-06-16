const express = require('express')
const mongoose = require('./db/mongoose')

// Models
const User = require("./models/user")
const Task  = require("./models/task")
const e = require('express')

const app = express()
const port  = process.env.PORT || 3000

app.use(express.json())

app.post('/users',async (req,res) =>{
 const user = new User(req.body); 

  try{
    await user.save()
    res.status(201).send(user)
  }catch(e){
    res.status(400).send(e)
  }
//  user.save().then(()=>{
//   res.status(201).send(user)
//  }).catch((err)=>[
//   res.status(400).send(err)
//  ])
})

app.get('/users',async (req,res) =>{

  try {
    const users = await User.find({})
    res.status(200).send(users)
  } catch (error) {
    res.status(500).send(error)
  }
 
//  User.find({}).then((users)=>{
//   res.status(201).send(users)
//  }).catch((err)=>[
//   res.status(400).send(err)
//  ])
})

app.get('/users/:id',async (req,res)=>{
 const _id = req.params.id
 try {
   const user = await User.findById(_id)
   if(!user)
    return res.status(401).send()
    res.send(user)
 } catch (error) {
   res.status(500).send(error)
 }
//  User.findById(_id).then((user)=>{

//   if(!user)
//    return res.status(404).send()
//   res.status(201).send(user)
//  }).catch((e)=>{
//   res.status(500).send(e)
//  })
})

// Tasks Endpoints
app.get('/tasks',async (req,res) => {

  try {
    const tasks = await Task.find({})
    res.send(tasks)
  } catch (error) {
    res.status(500).send()
  }
 
//   Task.find({}).then((tasks)=>{
//   res.status(201).send(tasks)
//  }).catch((e)=>{
//   res.status(500).send()
//  })
})

app.get('/tasks/:id',async (req,res) => {
 const _id = req.params.id
 try {
   const taska = await Task.findById(_id)
   if(!taska)
    return res.status(404).send()
    res.send(taska)
 } catch (error) {
   res.status(500).send(error)
 }
//  Task.findById(_id).then((task)=>{
//   if(!task)
//    return res.status(404).send()
//   res.status(201).send(task)
//  }).catch((e)=>{
//    res.status(500).send()
//  })
})

app.post('/tasks',async (req,res) => {
  try {
    const task = new Task(req.body)
    const taska = await task.save()
    res.send(taska)
  } catch (error) {
    res.status(500).send()
  }


//  task.save().then(()=>{
//   res.status(201).send(task)
//  }).catch((err)=>[
//   res.status(400).send(err)
//  ])
})

app.listen(port,() =>{
 console.log("Lisening on ",port);
})