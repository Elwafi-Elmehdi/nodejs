const express = require('express');
const Category = require('../models/Category')
const router = new express.Router();

router.post('/categories',async (req,res)=>{
    try {
        const category = new Category({...req.body});
        await category.save();
        res.send(category)
    }
    catch (e) {
        res.status(400).send({error:"User Error"})
    }

})

module.exports = router
