const express = require('express')
const router = new express.Router()
const User = require('../models/User')
const auth = require('../middleware/auth')
const resConsts = require('../consts/responce')
const userConsts = require('../consts/user')
const multer = require('multer')
const url = '/users'

// Read All Users
router.get(url,auth,async (req,res)=>{
    try {
        const users = await User.find({})
        res.send(users)
    }catch (e){
        res.status(500).send({error: resConsts.internalServerError})
    }
})
// Register  User
router.post(url,async (req,res)=>{
    try {
        const user = new User(req.body)
        if(!user)
            return res.status(404).send({error:resConsts.internalServerError})
        await user.save()
        res.send(user)
    }catch (e) {
        res.status(500).send({error: resConsts.internalServerError})
    }
})

// Delete User
router.delete(url+'/me',auth,async (req,res) => {
    try{
        const user = await User.findByIdAndDelete(req.user._id)
        if(!user){
            return res.status(404).send({error:resConsts.unauthorized})
        }
        res.send(user)
    } catch (e) {
        res.status(500).send({error: resConsts.internalServerError})
    }
})

//Login User

router.post(url+'/login',async (req,res) =>{
    try {
        const usercreds = {...req.body}
        const user = await User.findByCredentials(usercreds.email,usercreds.password)
        const token = await user.generateToken();
        res.send({user,token})
    }catch (e) {
        res.status(401).send({error:e.message})
    }
})

// User Logout

router.post(url+'/logout',auth,async (req,res) =>{
    try {
        console.log(req.token)
        req.user.tokens = req.user.tokens.filter(elem => elem.token !== req.token)
        await req.user.save()
        res.send()
    }catch (e) {
        res.status(500).send(e.message)
    }
})
// User LogoutAll

router.post(url+'/logoutAll',auth,async (req,res)=>{
    try {
        console.log(req)
        req.user.tokens = []
        await req.user.save()
        res.send()
    }catch (e) {
        res.status(500).send()
    }
})

// User Profile

router.get(url+'/me',auth,async (req,res)=>{
    try {
        res.send(req.user)
    }catch (e) {
        res.status(500).send()
    }
})

// Upload Profil Img
const upload = multer({
    limits :{
        fileSize: 1000000
    }
})

router.post(url+'/me/avatar',auth,upload.single('avatar'),async (req,res)=>{
    const img = req.file
    if(!img){
        return res.status(400).send()
    }
    try {
        req.user.avatar = img.buffer
        await req.user.save()
        res.send()
    }catch (e) {
        res.status(500).send()
    }
})

router.get(url+'/me/avatar',auth,(req,res)=>{
    try {
        img = req.user.avatar
        res.set('Content-Type','image/jpg')
        res.send(img)
    }catch (e) {
        res.status(500).send()
    }
})

module.exports = router
