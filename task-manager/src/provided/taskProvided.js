const express = require('express')
const Task = require('../models/task')
const router = new express.Router()
const auth = require('../middleware/auth')

// Tasks Endpoints



// Get Tasks Endpoint

router.get('/tasks',async (req,res) => {

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

router.get('/task/:id',async (req,res) => {
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

router.post('/tasks',auth,async (req,res) => {
  //  const task = new Task(req.body)
  const task = new Task({
    ...req.body,
    owner: req.user._id
  })
 try {
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


// Update Task EndPoint

router.patch('/task/:id',async (req,res)=>{
 const inputAttributes = Object.keys(req.body)
 const validUpdates = ['desc','completed']
 const isValid = inputAttributes.every(elem => validUpdates.includes(elem))
 if(!isValid){
   return res.status(400).send({error : "Invalid Updates!"})
 }
 try {
   const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
   if(!task){
     return res.status(404).send()
   }
   res.send(task)
 } catch (error) {
   res.status(500).send(error)
 }

})



// Delete Task EndPoint

router.delete('/task/:id',async (req,res) => {
 try {
   const task = await Task.findByIdAndDelete(req.params.id)
   if(!task){
     return res.status(404).send({error:"Task not found!"})
   }
   res.send(task)
   
 } catch (error) {
   res.status(500).send(error)
 }
})

module.exports = router