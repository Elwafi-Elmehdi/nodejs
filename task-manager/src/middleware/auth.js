const User = require('../models/user')
const jwt = require('jsonwebtoken')


const auth = async (req,res,next) => {
  try {
   const token = req.header('Authorization').replace('Bearer ','')
   const decoded = jwt.decode(token,'thisIsTopSecret')
   const user = User.findOne({_id:decoded._id,'tokens.token':token})

   if(!user){
     throw new Error()
   }
   req.user = user
   next()
  } catch (error) {
   res.status(401).send({error: "You are Unautorized!"})
  }
}

module.exports = auth