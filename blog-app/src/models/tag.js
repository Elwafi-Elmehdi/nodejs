const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title:{
        required:true,
        type:String,
    },
    content:{
        type:String
    }
})

const Tag = new mongoose.model("Tag",schema);

module.exports = Tag

