const JWT = require('jsonwebtoken')


const myFn = async () => {
 const token = JWT.sign({ _id: "abcd123456"},"thisIsTopSecret")
 console.log(token);
}

myFn()