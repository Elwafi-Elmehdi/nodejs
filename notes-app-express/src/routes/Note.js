const express = require('express')
const router = new express.Router()
const Note = require('../models/Note')
const url = '/notes'
const consts = require('../consts/responce')


router.get(url,async (req,res) => {
    try {
        const notes = await Note.find({})
        res.send(notes)
    }catch (e) {
        res.status(500).send()
    }
})

router.post(url,async (req,res) => {

    if(!req.body){
        return res.status(401).send({error:consts.badCredentials})
    }

    try {
        const note = new Note({
            ...req.body,
            owner: req.body.owner
        })
        await note.save()
        res.send(note)
    }catch (e) {
        res.status(500).send({error:e.message})
    }
})

router.delete(url+'/:id',async (req,res) => {
    try {
        const _id = req.params.id
        const note = await Note.findOneAndDelete(_id)
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
        await Note.save(note)
        res.send(note)
    }catch (e) {
        res.status(500).send()
    }

})



module.exports = router
