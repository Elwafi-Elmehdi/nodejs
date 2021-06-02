const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const getweather = require('./utils/getweather')


const app = express()

// Variables
const author = 'Mehdi Elwafi'

// Paths
const publicDir = path.join(__dirname,'../public')
const viewsDir = path.join(__dirname,'../templates/views')
const partialsDir = path.join(__dirname,'../templates/partials')

// Partials
hbs.registerPartials(partialsDir)

// Serving Static dir
app.use(express.static(publicDir))

// HBS Templating Express Configuration 
app.set('view engine','hbs')
app.set('views',viewsDir)

app.get('',(req,res)=>{
 res.render('index',{
  title:'Weather',
  name:author,
})
})

app.get('/weather',(req,res)=>{
  const address = req.query.address
  if(!address)
    return res.send({
      error:'Please provide an address!'
    })
  geocode(address,(data,error) => {
     
      if(error)
       return res.send({
         error:error
        })
      let obj = {}
      obj.location = data;
      getweather(data, (data,error) => {
       if(error)
        return res.send({
          error:error
        })
       obj.forecast = data
       return res.send(obj)
      })
     })
  

})

app.get('/about',(req,res)=>{
 res.render('about',{
  title:'About',
  name:author,
  msg:'About page created by Mehdi Elwafi'
 })
})

app.get('/help',(req,res)=>{
 res.render('help',{
  title:'Help',
  name:author,
  desc:'You can contact me for help'
 })
})

// Error Pages
app.get('/help/*',(req,res)=>{
  res.render('error',{
    title:'404',
    name:author,
    msg:'Help artical not found!'})
})

app.get('*',(req,res)=>{
  res.render('error',{
    title:'404',
    name:author,
    msg:'Page not found!'})
})

app.listen(3000,() => {
 console.log("Server is running on port 3000");
})