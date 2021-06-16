require("../src/db/mongoose")
const Task = require("../src/models/task")

// Task.findByIdAndDelete("60c0b401457b855ec72f2ca0").then((task)=>{
//  console.log(task)
//  return Task.countDocuments({completed:false})
// }).then((i)=>{
//  console.log(i)
// })

const deleteTaskById = async (id,completed) => {
 const deletedTask = await Task.findByIdAndDelete(id)
 const count = await Task.countDocuments({completed})
 return { deletedTask,count}
}
deleteTaskById('60c1416a0a2d3391eb72167f',false).then((data)=>console.log(data))
// 60c1416a0a2d3391eb72167f