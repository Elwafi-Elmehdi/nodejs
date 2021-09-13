const express = require('express');
const Tag = require('../models/tag')
const router = new express.Router();

router.post('/tags/',async (req,res)=>{
    try {
        const tag = new Tag({...req.body});
        await tag.save();
        res.send(tag)
    }
    catch (e) {
        res.status(400).send({error:"User Error"})
    }
})

module.exports = router
