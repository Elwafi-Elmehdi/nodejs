const express = require('express')
const jwt = require('jsonwebtoken')
const userRouter = require('./src/routes/User')
const app = express()
app.use(userRouter)

app.use(express.json())
const port = 3000





app.get('/',async (req,res)=>{
    token = await jwt.sign({msg:'Hello World'},securityConsts.signature)
    res.send({message: resConsts.unauthorized,token})
})

app.listen(port,() => {
    console.log("SERVER RUNING ON ",port)
})
