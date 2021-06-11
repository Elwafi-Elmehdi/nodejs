require("../src/db/mongoose")
const Task = require("../src/models/task")

Task.findByIdAndDelete("60c0b401457b855ec72f2ca0").then((task)=>{
 console.log(task)
 return Task.countDocuments({completed:false})
}).then((i)=>{
 console.log(i)
})