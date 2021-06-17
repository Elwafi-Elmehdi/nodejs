const express = require('express');
const { ObjectId } = require('mongodb');
const User = require('../models/user')
const router = new express.Router()
const mongoose = require('../db/mongoose')
// User Endpoints

// Save User Endpoint

router.post('/users',async (req,res) =>{
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

router.post('/users/login',async (req,res) => {
  try {
    const user = await User.findByCredentials(req.body.email,req.body.password)
    res.send(user)
  } catch (error) {
    res.status(404).send()
  }

})

router.get('/users',async (req,res) =>{

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

router.get('/user/:id',async (req,res)=>{
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

// Update User EndPoint

router.patch('/user/:id',async (req,res) => {

  console.log(ObjectId(req.params.id))

 const updateInputs = Object.keys(req.body)
 const validUpdates = ['email','name','age','password']
 const isValid = updateInputs.every( att => validUpdates.includes(att))

 if(!isValid){
   return res.status(400).send({error : "Invalid Updates!"})
 }
 try {
   const user = await User.findById(req.params.id)
   console.log(user);
   updateInputs.forEach(element => {
     user[element] = req.body[element]
   })
   await user.save()
   if(!user){
    return res.status(404).send()
  }

  //  Complete bug to be completed
   
   res.send(user)

 } catch (error) {
   res.status(500).send(error)
 }
})


// Delete User 

router.delete('/user/:id', async (req,res) => {
 try {
   const user = await User.findByIdAndDelete(req.params.id);
   if(!user){
     return res.status(404).send({error:"User Not found!"})
   }
   res.status(200).send(user)
   
 } catch (error) {
   res.status(500).send(error)
 }
})

module.exports = router