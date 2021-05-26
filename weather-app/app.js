const request = require('request')
const geocode = require('./utils/geocode')
const getweather = require('./utils/getweather')
const log = console.log

geocode('marrakech',(data,error) => {
 log('Data : ',data)
 log('Error : ',error)
 getweather(data, (data,error) => {
  log(data)
  log(error)
 })
})



// const url = 'http://api.weatherstack.com/current?access_key=dfc51fabfc312a1a9f97262e8ed2e790&query=31.6308771,-8.0449503'

// request({url:url, json:true}, (erro,responce) => {
 
//  if(erro)
//   log("Unable to connect to API !")
//  else if (responce.body.error)
//   log("Unable to find the location !")
//  else{
//   const data = responce.body.current
//   log(`currently its ${data.temperature} and it feels like ${data.feelslike}`)
//  }

// })
// const url2 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibWVoZGktZWx3YWZpIiwiYSI6ImNrb3Q3empqcTA4c2kyb3Fqd3E3MTh5cm0ifQ.4IldGzpqvpRQD5lJm8jYcw&limit=1'

// request({json:true,url:url2}, (error,responce) => {
//  if(erro)
//   log("Unable to connect to API !")
//  else if (responce.body.features === 0)
//   log("Unable to find the location !")
//  else{
//  const data = responce.body.features[0].geometry
//  log(`The latitude is ${data.coordinates[0]} and the longitude is ${data.coordinates[1]}`)
//  }
// })