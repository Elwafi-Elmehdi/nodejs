const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title:{
        required:true,
        type:String,
    }
    content:{
        type:String
    }
})
