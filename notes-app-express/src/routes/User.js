const express = require('express')
const router = new express.Router()
const User = require('../models/User')
const resConsts = require('../consts/responce')
const securityConsts = require('../consts/security')

router.get('/users',async (req,res)=>{
    try {
        const users = await User.find({})
        res.send(users)
    }catch (e){
        res.status(500).send({error: resConsts.internalServerError})
    }
})

module.exports = router