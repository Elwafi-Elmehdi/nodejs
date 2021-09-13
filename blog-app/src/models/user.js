const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullname: {
        type:String,
        required:true,
    },
    age: {
        type:Number,
        required:true,
        validate(age) {
            if(age <= 0){
                throw new Error("Age is not valid.")
            }
        }
    },
    email:{
        type:String,
        unique:true,
        required:true,
    }
})

const User = new mongoose.model('User',userSchema);

module.exports = User