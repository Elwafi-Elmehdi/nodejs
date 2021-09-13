const express = require('express');
const Category = require('../models/category')
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

router.get('/categories/all',async (req,res)=>{
    try {
        const categories = await Category.find({})
        res.send(categories)
    }catch (e) {
        res.status(500).send()
    }
})

router.get('/categories/:title',async (req,res)=>{
    try {
        const title = req.params.title
        const category = await Category.findOne({title:title})
        res.send(category)
    }catch (e) {
        res.status(500).send()
    }
})

router.delete('/categories/:title',async (req,res)=>{
    try {
        const title = req.params.title
        const category = await Category.findOneAndDelete({title:title})
        res.send(category)
    }catch (e) {
        res.status(500).send()
    }
})

module.exports = router
