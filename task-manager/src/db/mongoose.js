const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
 useNewUrlParser: true,
 useCreateIndex: true
})

const User = mongoose.model('User',{
 name:{
  type: String
 },
 age:{
  type: Number
 }
})

const Task = mongoose.model('Task',{
 desc:{
  type:String
 },
 completed:{
  type:Boolean
 }
})

const day = new Task({
 desc:"Sbah lkhir",
 completed:true
})

day.save().then((result) => {
 console.log(result);
}).catch((err) => {
 console.log(err);
});



// const me = new User({
//  name:"Mehdi",
//  age: "sasas"
// })

// me.save().then(() => {
//  console.log(me);
// }).catch((error)=>{
//  console.log("Error ",error)
// })