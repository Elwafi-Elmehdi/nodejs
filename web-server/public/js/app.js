let weatherForm = document.querySelector('#weatherForm')
let loc = document.querySelector('#location')

let messageOne = document.querySelector('#msgOne')
let messageTwo = document.querySelector('#msgTwo')



weatherForm.addEventListener('submit',(e) => {
 e.preventDefault()
 messageOne.textContent = 'Loading...'
 fetch('http://localhost:3000/weather?address='+encodeURIComponent(loc.value)).then((response)=>{
  response.json().then((data)=>{
   if(data.error)
    return messageOne.textContent = data.error

    let {location='Monzanbi9',forecast='Walo'} = data
    messageOne.textContent = location.desc
    messageTwo.textContent = `${forecast.weather_descriptions[0]}, its ${forecast.temperature}C and it feels like  ${forecast.feelslike}C, and There is ${forecast.precip}% of raining`
  })
 })
})
