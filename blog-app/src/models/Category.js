const mongoose = require('mongoose');

const {Schema} = mongoose;

const Category = new Schema({
    title : {
        type:String,
        required:true
    },
    body:{
      type:String,
      maxlength:250
    }
})

module.exports = Category
