const mongodb = require('mongodb')
const {MongoClient,ObjectID} = mongodb

const id = new ObjectID()

console.log(id)
console.log(id.getTimestamp())

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL,{useNewUrlParser:true},(error, client) => {
  if (error)
   return console.log('Unable to connect to db')
  const db = client.db(databaseName)
  db.collection('users').insertOne({
   name:'Mohammed',
   age: 21,
   _id: id
  },(error,result)=>{
    if(error)
      return console.log('Error')
    console.log(result.ops)
    console.log(result.insertedCount)
  })
  // db.collection('users').insertMany([
  //   {
  //     name:"Reda",
  //     age:19
  //   },
  //   {
  //     name:"Saida",
  //     age:22
  //   }
  // ],(err,result) => {
  //   if(err)
  //     return console.log('Error')
  //   console.log(result.ops)
  // }
  // )

  // db.collection('tasks').insertMany([
  //   {
  //     desc:"Eat breakfast",
  //     state:true
  //   },
  //   {
  //     desc:"brush teeth",
  //     state:false
  //   },
  //   {
  //     desc:"revise algorithms",
  //     state:true
  //   },
  // ],(er,result) => {
  //   if(er)
  //     return console.log(er)
  //   console.log(result.ops)
  // })
})