const express = require('express')
const router = new express.Router()
const User = require('../models/User')
const resConsts = require('../consts/responce')
const securityConsts = require('../consts/security')
const url = '/users'

router.get(url,async (req,res)=>{
    try {
        const users = await User.find({})
        res.send(users)
    }catch (e){
        res.status(500).send({error: resConsts.internalServerError})
    }
})
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

module.exports = router
