const mongoose = require('mongoose');

const {Schema} = mongoose;

const categorySchema = new Schema({
    title : {
        type:String,
        required:true
    },
    body:{
      type:String,
      maxlength:250
    }
})

const Category = new mongoose.model('Category',categorySchema)
module.exports = Category
