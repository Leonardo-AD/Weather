// https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=44.34&lon=10.99&appid={API key}
// Test the URL above in: https://openweathermap.org/api/hourly-forecast#JSON
// https://home.openweathermap.org/users/sign_up

// https://www.youtube.com/watch?v=iILFBGm_I9M&list=WL&index=240&t=16s
// http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={APIkey} read the parameters

// const searchInput = document.querySelector('#search-input')
const searchButton = document.querySelector('#search-button')

const citySelected = document.querySelector('#city-selected')
const weatherTemperature = document.querySelector('#weather-temperature')
const windSpeed = document.querySelector('#wind-speed')
const humidity = document.querySelector('#humidity')

searchButton.addEventListener('click', () => {
    const APIKey = 'd5c9103c9c7225eb8814a372432fd7e9'
    const city = document.querySelector('#search-input').value

    if(!city || city == ' '){
        
        Swal.fire({
            title: "Não foi possível localizar",
            text: "Por favor, digite novamente.",
            icon: "error",
            background: "#E7E6FB"
          })
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(res => res.json())
    .then(json => {
        
        if(json.cod === '404'){
            
            Swal.fire({
                title: `Não foi possível localizar: ${city}`,
                text: "Não conseguimos encontrar a cidade.",
                icon: "error",
                background: "#E7E6FB"
              })
        }

        weatherTemperature.innerHTML = `${parseInt(json.main.temp)}`
        humidity.innerHTML = `${json.main.humidity} <span>%</span>`
        windSpeed.innerHTML = `${parseInt(json.wind.speed)} <span>km/h</span>`
        citySelected.innerHTML = `${json.name}, ${json.sys.country}`

        console.log(json)
    })

})  