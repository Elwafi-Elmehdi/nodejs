const express = require('express')
const app = express()
const port = 3000
const resConsts = require('./src/consts/responce')

app.use(express.json())

app.get('/',(req,res)=>{
    res.send({message: resConsts.unauthorized })
})

app.listen(port,() => {
    console.log("SERVER RUNING ON ",port)
})
