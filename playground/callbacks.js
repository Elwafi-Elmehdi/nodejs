const doWorkCallback = (callback) => {
 setTimeout(() => {
  callback('Error',undefined)
 }, 2000);
}

doWorkCallback((err,res)=> {
 if(err)
  return console.log(err)
 console.log(res)
})

console.log('Hello CallBack')