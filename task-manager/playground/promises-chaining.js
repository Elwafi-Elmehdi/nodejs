
require('../src/db/mongoose')
const User = require('../src/models/user')

User.findByIdAndUpdate('60bff99b1aba9b64a35faa36',{age:1}).then((user)=>{
 console.log(user)
 return User.countDocuments({age:1})

}).then((count)=>{
 console.log(count)
}).catch((err)=>{
 
})