const doWorkPromise = new Promise((resolve,reject) => {
 setTimeout(() => {
  reject('Things went wrong!')
  resolve([1,7,4])
 }, 2000);
})

doWorkPromise.then((res)=>{
 console.log('Success ',res)
}).catch((data)=>{
 console.log(data)
})

console.log('Hello CallBack')