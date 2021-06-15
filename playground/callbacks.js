const add = (a,b) => {
 return new Promise((resolve,reject) => {
  setTimeout(() => {
   resolve(a+b)
  }, 2000);
 })
}


doWorkCallback((err,res)=> {
 if(err)
  return console.log(err)
 console.log('Success ',res)
})

console.log('Hello CallBack')