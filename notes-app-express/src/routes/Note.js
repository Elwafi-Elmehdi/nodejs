const express = require('express')
const router = new express.Router()
const Note = require('../models/Note')
const url = '/notes'
const consts = require('../consts/responce')
const auth = require('../middleware/auth')
const multer = require('multer')
const upload = multer()


router.get(url,auth,async (req,res) => {
    try {
        const notes = await Note.find({owner:req.user._id})
        res.send(notes)
    }catch (e) {
        res.status(500).send()
    }
})

router.post(url,auth,async (req,res) => {

    if(!req.body){
        return res.status(401).send({error:consts.badCredentials})
    }

    try {
        const note = new Note({
            ...req.body,
            owner: req.user._id
        })
        await note.save()
        res.send(note)
    }catch (e) {
        res.status(500).send({error:e.message})
    }
})

router.delete(url+'/:id',auth,async (req,res) => {
    try {
        const _id = req.params.id
        const note = await Note.findOneAndDelete({_id,owner:req.user._id})
        if(!note){
            return res.status(404).send({error:consts.pageNotFound})
        }
        res.send(note)
    }catch (e){
        res.status(500).send({error:consts.internalServerError})
    }
})

router.patch(url+'/:id',async (req,res)=>{
    const _id = req.params.id
    const changes = {...req.body}
    if(!changes.label || !changes.body || !_id){
        return res.status(400).send()
    }
    try{
        const note = await Note.findById(_id)
        if(!note){
            return res.status(404).send()
        }
        note.label = changes.label
        note.body = changes.body
        await note.save(note)
        res.send(note)
    }catch (e) {
        res.status(500).send()
    }
})



module.exports = router
