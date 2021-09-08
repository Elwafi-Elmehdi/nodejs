const express = require('express');
const Category = require('../models/Category')
const router = new express.Router();

router.post('/categories/',async (req,res)=>{
    const category = new Category({...req.body});
    res.send(category)
})

module.exports = router
