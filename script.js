import {   
            searchButton, searchInput, APIKey, rainStats, windDirection, sunrise, sunset, 
            timeNow, circlePosition, voiceSearchButton, closeVoiceSearch

        }         
from './export.js'

import { getEnterClick, getUserLocation, temperature, airQuality, weekWeather, sunPosition, errorAlert, voiceSearch } from './public/index.js'

// Calling the function that gets Enter key press to search a city input
getEnterClick(searchInput, searchButton)

// Calling the function to get user location
getUserLocation(APIKey, searchButton)


// Getting click or voice to search
voiceSearchButton.addEventListener('click', () => { voiceSearch(searchButton, voiceSearchButton, closeVoiceSearch, searchInput) })

searchButton.addEventListener('click', () => {
    
    const city = document.querySelector('#search-input').value

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}&lang=pt_br`)
    .then(res => res.json())
    .then(json => {

        // Getting DT, timezone, sunrise, sunset, latitude and longitude
        const getDT                = json.dt
        const getTimezone          = json.timezone
        const getSunrise           = json.sys.sunrise
        const getSunset            = json.sys.sunset
        const latitude             = json.coord.lat
        const longitude            = json.coord.lon
        windDirection.style.rotate = `${json.wind.deg}deg` 
        
        
        // Calling the function to get temperature, humidity, wind speed and rain probability
        temperature(json)
        
        
        // Calling the function to set the sun position
        sunPosition(sunrise, sunset, timeNow, circlePosition, getDT, getTimezone, getSunrise, getSunset)


        // Calling the function to get the air quality
        airQuality(latitude, longitude, APIKey)
        
        
        // Adding data in the week weather section
        weekWeather(city, rainStats, APIKey)        
    })
    .catch(
        () => {
            errorAlert(city)
            console.log(`Não foi possível localizar: ${city}`)
        }
    )
})