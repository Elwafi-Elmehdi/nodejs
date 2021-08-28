const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')
const sharp = require('sharp')

// Multer Lib (File Uploads)
const multer = require('multer')


// Save User Endpoint

router.post('/users/register',async (req,res) =>{
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

// GET tasks?completed=true
// GET tasks?limit=10&skip=10
// GET 
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
 const validUpdates = ['email','name','age','password','bio']
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

// Profile Image Upload 
const uplaod = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req,file,cb){
    if(!file.originalname.match(/\.(png|jpg|jpeg)$/)){
      return cb(new Error('You can upload Images only (png/jpg/jpeg)'))
    }
    cb(undefined,true)
  }
})
router.post('/users/me/avatar',auth,uplaod.single('avatar'), async (req,res) => {
  const buffer = await sharp(req.file.buffer).resize({width:140,height:140}).png().toBuffer();
  req.user.avatar = buffer  
  await req.user.save()
  res.send()
},(error,req,res,next) =>{ 
  res.status(400).send({error:error.message})
})

router.delete('/users/me/avatar',auth,async (req,res)=>{
  try {
    req.user.avatar = undefined;
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send()
  }
})

router.get('/users/:id/avatar',async (req,res)=>{
  try {
    const user = await User.findById(req.params.id)
    if(!user){
      throw new Error("User or Avatar not found")
    }
    if(!user.avatar){
        return res.redirect('http://localhost:3000/default/default-avatar.png')
    }
    res.set('Content-Type','image/png')
    res.send(user.avatar)
  } catch (error) {
    res.status(404).send({error: error.message})
  } 

})

module.exports = router
