const doWorkCallback = (callback) => {
 setTimeout(() => {
  callback(undefined,[1,7,4])
 }, 2000);
}

doWorkCallback((err,res)=> {
 if(err)
  return console.log(err)
 console.log('Success ',res)
})

console.log('Hello CallBack')