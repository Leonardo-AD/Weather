// https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=44.34&lon=10.99&appid={API key}
// Test the URL above in: https://openweathermap.org/api/hourly-forecast#JSON

// https://www.youtube.com/watch?v=iILFBGm_I9M&list=WL&index=240&t=16s
// http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={APIkey} read the parameters

import {

    searchButton, 
    selectedCity, 
    weatherTemperature, 
    windSpeed, 
    humidity,
    APIKey,
    background,
    maxTemp,
    minTemp,
    rainStats

} from './export.js'

searchButton.addEventListener('click', () => {
    const city = document.querySelector('#search-input').value

    if(!city){
        
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

        switch (json.weather[0].main) { 
            case 'Clear':
                background.style.backgroundImage = 'url(./assets/weather-sunny.png)'
                rainStats.innerHTML = `0 <span>%</span>` 
                break;

            case 'Rain':
                background.style.backgroundImage = 'url(./assets/weather-rainy.png)'
                rainStats.innerHTML = `60 <span>%</span>`
                break;
            
            case 'Snow':
                background.style.backgroundImage = 'url(./assets/weather-snow.png)'
                rainStats.innerHTML = `0 <span>%</span>`
                break;
            
            case 'Storm':
                background.style.backgroundImage = 'url(./assets/weather-storm.png)'
                rainStats.innerHTML = `50 <span>%</span>`
                break;

            case 'Clouds':
                background.style.backgroundImage = 'url(./assets/weather-partly-cloudy.png)'
                rainStats.innerHTML = `5 <span>%</span>`
                break;
               
            case 'Haze':
                background.style.backgroundImage = 'url(./assets/weather-cloudy.png)'
                rainStats.innerHTML = `10 <span>%</span>`
                break; 

            default:
                break;
        }

        weatherTemperature.innerHTML = `${parseInt(json.main.temp)}`

        humidity.innerHTML = `${json.main.humidity} <span>%</span>`

        windSpeed.innerHTML = `${parseInt(json.wind.speed)} <span>km/h</span>`

        selectedCity.innerHTML = `${json.name}, ${json.sys.country}`

        maxTemp.innerHTML = `${parseInt(json.main.temp_max)}°`

        minTemp.innerHTML = `${parseInt(json.main.temp_min)}°`

        console.log(json)
    })

}) 