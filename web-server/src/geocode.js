const request = require('request')


const geocode = (address, callback) => {

 const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWVoZGktZWx3YWZpIiwiYSI6ImNrb3Q3empqcTA4c2kyb3Fqd3E3MTh5cm0ifQ.4IldGzpqvpRQD5lJm8jYcw&limit=1'

 request({ url:url, json:true }, (error,responce) => {

  if(error)

   callback(undefined,'Unable to connect to the API!')

  else if(responce.body.features.length === 0)

   callback(undefined,'Unable to find the location!')
  
  else{

   const {center,place_name} = responce.body.features[0]

   const data = {
     x:center[0],
     y:center[1],
     desc:place_name
   }

   callback(data,undefined)
  }
 })
}

module.exports = geocode