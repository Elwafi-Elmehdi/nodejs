const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullname: {
        type:String
    },
    age: {
        type:Number,
        validate() {
            if(age <= 0){
                throw new Error("Age is not valid.")
            }
        }
    },
    email:{
        type:String,
        unique:true
    }
})