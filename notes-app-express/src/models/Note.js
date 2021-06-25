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
        type: mongoose.Types.ObjectId
    }
},{
    timestamps:true
})

const Note = mongoose.model('Note',noteSchema);
module.exports = Note
