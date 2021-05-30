const path = require('path')
const express = require('express')
const hbs = require('hbs')


const app = express()

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
  name:'Mehdi',
})
})

app.get('/about',(req,res)=>{
 res.render('about',{
  title:'About',
  name:'Mehdi',
  msg:'About page created by Mehdi Elwafi'
 })
})

app.get('/help',(req,res)=>{
 res.render('help',{
  title:'Help',
  name:'Mehdi',
  desc:'You can contact @mehdi for help'
 })
})

// Error Pages
app.get('/help/*',(req,res)=>{
  res.render('error',{
    title:'404',
    name:'Mehdi',
    msg:'Help artical not found!'})
})

app.get('*',(req,res)=>{
  res.render('error',{
    title:'404',
    name:'Mehdi',
    msg:'Page not found!'})
})

app.listen(3000,() => {
 console.log("Server is running on port 3000");
})