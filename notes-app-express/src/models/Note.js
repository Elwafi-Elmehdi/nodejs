const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    label: {
        type:String,
        required:true,
        trim:true,
        minlength:5,
        maxlength:25
    },
    body: {
        type:String,
        trim:true,
        minlength:4,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        required:true
    },
    images:[{
        image:{
            type:Buffer
        }
    }]
},{
    timestamps:true
})

noteSchema.methods.toJSON = function (next){
    const note = this
    const noteVO = note.toObject()
    delete noteVO.images
    return noteVO
    next()
}

const Note = mongoose.model('Note',noteSchema);
module.exports = Note
