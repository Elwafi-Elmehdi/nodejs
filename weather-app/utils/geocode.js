const request = require('request')


const geocode = (address, callback) => {

 const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWVoZGktZWx3YWZpIiwiYSI6ImNrb3Q3empqcTA4c2kyb3Fqd3E3MTh5cm0ifQ.4IldGzpqvpRQD5lJm8jYcw&limit=1'

 request({ url:url, json:true }, (error,responce) => {

  if(error)
   callback(undefined,'Unable to connect to the API!')
  else if(responce.body.features.length === 0)
   callback(undefined,'Unable to find the location!')
  else{
   const x = responce.body.features[0].center[0]
   const y = responce.body.features[0].center[1]
   const desc = responce.body.features[0].place_name

   const data = {
     x:x,
     y:y,
     desc:desc
   }
   callback(data,undefined)
  }
 })

}

module.exports = geocode