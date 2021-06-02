let weatherForm = document.querySelector('#weatherForm')
let loc = document.querySelector('#location')

weatherForm.addEventListener('submit',(e) => {
 e.preventDefault()

 fetch('http://localhost:3000/weather?address='+encodeURIComponent(loc.value)).then((response)=>{
  response.json().then((data)=>{
   if(data.error)
    return console.log(data)
   console.log(data);
  })
 })
})
