 import {

    searchButton, selectedCity, weatherTemperature, weatherStatusIcon, weatherStatusInfo,
    windSpeed, humidity, APIKey, maxTemp, minTemp, rainStats,
    locationIcon, qualityStatus, qualityStatusRate,
    pm2_5, pm10, so2, no2, o3, co, 
    sunrise, sunset, timeNow,
    day_1, day_2, day_3, day_4, day_5,
    maxTempDay1, maxTempDay2, maxTempDay3, maxTempDay4, maxTempDay5,
    minTempDay1, minTempDay2, minTempDay3, minTempDay4, minTempDay5

} from './export.js'

import { temperatureSection } from './temperatureSection.js'
import { airQualitySection } from './airQualitySection.js'


// Getting user location 
function getUserLocation(){

    let userLat  
    let userLon 

    navigator.geolocation.getCurrentPosition( (position) => {
        userLat = position.coords.latitude
        userLon = position.coords.longitude
        
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLon}&appid=${APIKey}&lang=pt_br`)
        .then(res => res.json())
        .then(json => {
            document.querySelector('#search-input').value = json.name
            searchButton.click()
        })
    })
}
// Calling the function to get user location
getUserLocation()


// Getting click to search
searchButton.addEventListener('click', () => {
    let city = document.querySelector('#search-input').value
    
    if(!city){
        
        Swal.fire({
            title: "Não foi possível localizar",
            text: "Por favor, digite novamente.",
            icon: "error",
            background: "#E7E6FB"
          })
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}&lang=pt_br`)
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
                rainStats.innerHTML = `0 <span>%</span>`
                break;

            case 'Rain':
                rainStats.innerHTML = `60 <span>%</span>`
                break;
            
            case 'Snow':
                rainStats.innerHTML = `0 <span>%</span>`
                break;
            
            case 'Storm':
                rainStats.innerHTML = `50 <span>%</span>`
                break;

            case 'Clouds':
                rainStats.innerHTML = `5 <span>%</span>`
                break;
               
            case 'Haze':
                rainStats.innerHTML = `10 <span>%</span>`
                break; 
                
            default:
                break;
        }

        temperatureSection()


        // Adding local time, sunrise and sunset
        let getDT       = json.dt
        let getTimezone = json.timezone
        let getSunrise  = json.sys.sunrise
        let getSunset   = json.sys.sunset
        let latitude    = json.coord.lat
        let longitude   = json.coord.lon
        
        timeNow.innerHTML = moment.utc(getDT, 'X').add(getTimezone, 'seconds').format('HH:mm')
        sunrise.innerHTML = moment.utc(getSunrise, 'X').add(getTimezone, 'seconds').format('HH:mm') 
        sunset.innerHTML  = moment.utc(getSunset, 'X').add(getTimezone, 'seconds').format('HH:mm')

        
        airQualitySection(latitude, longitude)
        
        
        // Adding data in the week weather section
        let lat = json.coord.lat
        let lon = json.coord.lon
        
        function weekWeather(){

            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric&lang=pt-br`)
            .then(res => res.json())    
            .then(json => {
                console.log(json)
                console.log(json.list[4].main.temp_max.toFixed(0))
            })
        }

        weekWeather()
        
    })
})