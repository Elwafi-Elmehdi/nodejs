const mongoose = require('mongoose')


const postSchema = new mongoose.Schema({
    summary:{
        type:String
    },
    title:{
        type:String
    },
    content:{
        type:String
    }
})

const Post = new mongoose.model('Post',postSchema)

module.exports = Post