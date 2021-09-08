const db = require('mongoose')

const dbName = "mongodb://127.0.0.1:27017/blog-api"

db.connect(dbName,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
},()=>{})
