const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const port = 3000

const resConsts = require('./src/consts/responce')
const securityConsts = require('./src/consts/security')

app.use(express.json())

app.get('/',async (req,res)=>{
    token = await jwt.sign({msg:'Hello World'},securityConsts.signature)
    res.send({message: resConsts.unauthorized,token})
})

app.listen(port,() => {
    console.log("SERVER RUNING ON ",port)
})
