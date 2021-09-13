const mongoose = require('mongoose');

const {Schema} = mongoose;

const categorySchema = new Schema({
    title : {
        type:String,
        unique:true,
        required:true
    },
    body:{
      type:String,
      maxlength:250
    }
})

const Category = new mongoose.model('Category',categorySchema)
module.exports = Category
