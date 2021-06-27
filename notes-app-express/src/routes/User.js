const express = require('express')
const router = new express.Router()
const User = require('../models/User')
const resConsts = require('../consts/responce')
const userConsts = require('../consts/user')
const url = '/users'

// Read All Users
router.get(url,async (req,res)=>{
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
router.delete(url+'/:id',async (req,res)=>{
    const _id = req.params.id
    try{
        const user = await User.findByIdAndDelete(_id)
        if(!user){
            return res.status(404).send({error:resConsts.pageNotFound})
        }
        res.send(user)
    } catch (e) {
        res.status(500).send({error: resConsts.internalServerError})
    }
})

module.exports = router
