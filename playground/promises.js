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


const add = (a,b) => {
 return new Promise((resolve,reject)=>{
  setTimeout(() => {
   resolve(a + b)
  }, 2000);
 })
} 

// add(1,2).then((sum)=>{
//  console.log(sum)
// })

add(1,2).then((sum) =>{
 console.log(sum)
 return add(sum,2)
}).then((sum2)=>{
 console.log(sum2)
}).catch((e)=>{
 console.log(e)
})