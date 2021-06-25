const express = require('express')
const router = new express.Router()
const Note = require('../models/Note')
const url = '/notes'
const consts = require('../consts/responce')


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


module.exports = router
