const jwt = require('jsonwebtoken')
const consts = require('../consts/security')
const resConsts = require('../consts/responce')
const User = require('../models/User')

const auth = async (req,res, next) => {
    try {
        const token = req.get(consts.tokenHeader).substr('Bearer '.length)
        if(!token){
            res.status(401).send({error:resConsts.unauthorized})
        }
        const payload = await jwt.verify(token,consts.signature)
        const user = await User.findById(payload._id)
        req.user = user
        next()
    }catch (e) {
        res.status(500).send({error:e.message})
    }
}
