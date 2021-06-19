const JWT = require('jsonwebtoken')

const token = JWT.sign({ _id: "abcd123456"},"thisIsTopSecret",{expiresIn:"4 seconds"})
const myFn = async () => {
 console.log(token);
 const isMatch = JWT.verify(token,"thisIsTopSecret")
 console.log(isMatch);

}

myFn()

setTimeout(()=>{
 myFn()
},5000)

