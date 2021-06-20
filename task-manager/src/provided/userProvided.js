const express = require('express');
const { ObjectId } = require('mongodb');
const User = require('../models/user')
const router = new express.Router()
const mongoose = require('../db/mongoose')
const auth = require('../middleware/auth')
// User Endpoints

// Save User Endpoint

router.post('/users',async (req,res) =>{
 const user = new User(req.body); 

  try{
    const token = await user.generateJwtToken() 
    await user.save()
    res.status(201).send({user,token})
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
    const token =  await user.generateJwtToken()
    console.log(token);
    res.send({user,token})
  } catch (error) {
    res.status(404).send()
  }
})

router.post('/users/logout',auth,async (req,res) => {

  try {
    req.user.tokens = req.user.tokens.filter((token)=>{
      return token.token !== req.token
    })
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send()
  }

})


router.post('/users/logoutAll',auth,async (req,res) => {

  try {
    req.user.tokens = []
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send()
  }

})

router.get('/users/me',auth,async (req,res) => {
  res.send(req.user);
})

router.get('/users',auth,async (req,res) =>{

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

router.patch('/user/:id',auth,async (req,res) => {

 const updateInputs = Object.keys(req.body)
 const validUpdates = ['email','name','age','password']
 const isValid = updateInputs.every( att => validUpdates.includes(att))

 if(!isValid){
   return res.status(400).send({error : "Invalid Updates!"})
 }
 try {
   const user = req.user
   if(!user){
    return res.status(404).send()
   }
   updateInputs.forEach(element => {
     user[element] = req.body[element]
   })
   await user.save()
   res.send(user)
 } catch (error) {
   res.status(500).send(error)
 }
})


// Delete User 

router.delete('/users/me',auth, async (req,res) => {
 try {

   await req.user.remove()
   res.send(req.user)

 } catch (error) {
   res.status(500).send(error)
 }
})

module.exports = router