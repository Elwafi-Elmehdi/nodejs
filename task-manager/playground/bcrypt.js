
const bcrypt = require('bcryptjs')
const myFn = async () => {
 const pwd = 'Saida'
 const hashedPwd = await bcrypt.hash(pwd, 8)
 const isMatched = await bcrypt.compare('Saida',hashedPwd)
 console.log(pwd);
 console.log(hashedPwd);
 console.log(isMatched)
}

myFn()