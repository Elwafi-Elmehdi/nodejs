const add = (a,b) => {
 return new Promise((resolve,reject) => {
  setTimeout(() => {
   resolve(a+b)
  }, 2000);
 })
}

const doWork = async (a,b) => {
  const sum = await add(a,b);
  const sum2 = await add(sum,100)
  const sum3 = await add(sum2,1000)
  return sum3
}

doWork(5,5).then((resulat)=>{
 console.log(resulat)
}).catch((error)=>{
 console.log(error)
})

