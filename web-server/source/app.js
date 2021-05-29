const path = require('path')
const express = require('express')
const app = express()

// Paths
const publicDir = path.join(__dirname,'../public')
const viewsDir = path.join(__dirname,'../templates')


// Serving Static dir
app.use(express.static(publicDir))

// HBS Templating Express Configuration 
app.set('view engine','hbs')
app.set('views',viewsDir)

app.get('',(req,res)=>{
 res.render('index')
})

app.get('/about',(req,res)=>{
 res.render('about',{msg:'ABout page created by Mehdi Elwafi'})
})

app.get('/help',(req,res)=>{
 res.render('help',{desc:'You can contact @mehdi for help'})
})

app.listen(3000,() => {
 console.log("Server is running on port 3000");
})