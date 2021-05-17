const request = require('request')
const log = console.log

// const url = 'http://api.weatherstack.com/current?access_key=dfc51fabfc312a1a9f97262e8ed2e790&query=31.6308771,-8.0449503'

// request({url:url, json:true}, (erro,responce) => {
//    const data = responce.body.current
//    // log(data.current)
//    log(`currently its ${data.temperature} and it feels like ${data.feelslike}`)
// })
const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibWVoZGktZWx3YWZpIiwiYSI6ImNrb3Q3empqcTA4c2kyb3Fqd3E3MTh5cm0ifQ.4IldGzpqvpRQD5lJm8jYcw&limit=1'

request({json:true,url:url}, (error,responce) => {
 const data = responce.body.features[0].geometry
 log(`The latitude is ${data.coordinates[0]} and the longitude is ${data.coordinates[1]}`)
})