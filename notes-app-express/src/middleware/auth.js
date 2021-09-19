const jwt = require('jsonwebtoken')
const consts = require('../consts/security')
const resConsts = require('../consts/responce')
const User = require('../models/User')

const auth = async (req,res, next) => {
    try {
        const token = req.header(consts.tokenHeader).replace('Bearer ','')
        const payload = await jwt.verify(token,process.env.JWT_TOKEN)
        const user = await User.findOne({_id:payload._id,'tokens.token':token})
        if(!user){
            return res.status(401).send({error:resConsts.unauthorized})
        }
        req.token = token
        req.user = user
        next()
    }catch (e) {
        res.status(500).send()
    }
}
module.exports = auth
