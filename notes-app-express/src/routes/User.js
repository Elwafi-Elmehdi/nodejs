const express = require('express')
const app = express();
const router = new express.Router()
const resConsts = require('../consts/responce')
const securityConsts = require('../consts/security')

router.get('/users',async (req,res)=>{
    res.send("Users Route is up")
})

module.exports = router