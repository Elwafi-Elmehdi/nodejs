const request = require('request')
const log = console.log

const getweather = (data,callback) => {
 const url = 'http://api.weatherstack.com/current?access_key=dfc51fabfc312a1a9f97262e8ed2e790&query='+encodeURIComponent(data.x)+','+encodeURIComponent(data.y)
 request({url:url,json:true},(error,responce) => {
  if(error)
   callback(undefined,"Unable to connect to API !")
  else if (responce.body.error)
  callback(undefined,"Unable to find the location !")
  else{
   const data = responce.body.current
   log(`currently its ${data.temperature} and it feels like ${data.feelslike}`)
  }
 })
}

module.exports = getweather