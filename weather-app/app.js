const request = require('request')
const log = console.log

const url = 'http://api.weatherstack.com/current?access_key=dfc51fabfc312a1a9f97262e8ed2e790&query=31.6308771,-8.0449503'

request({url:url, json:true}, (erro,responce) => {
   const data = responce.body.current
   // log(data.current)
   log(`currently its ${data.temperature} and it feels like ${data.feelslike}`)
})