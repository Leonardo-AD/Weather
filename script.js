import { searchButton, APIKey, rainStats, sunrise, sunset, timeNow, circlePosition } from './export.js'

import { getUserLocation, temperature, airQuality, weekWeather, sunPosition} from './public/index.js'


// Calling the function to get user location
getUserLocation(APIKey, searchButton)


// Getting click to search
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

        // Getting DT, timezone, sunrise, sunset, latitude and longitude
        const getDT       = json.dt
        const getTimezone = json.timezone
        const getSunrise  = json.sys.sunrise
        const getSunset   = json.sys.sunset
        const latitude    = json.coord.lat
        const longitude   = json.coord.lon
        
        
        // Calling the function to get temperature, humidity, wind speed and rain probability
        temperature(json)
        
        
        // Calling the function to set the sun position
        sunPosition(sunrise, sunset, timeNow, circlePosition, getDT, getTimezone, getSunrise, getSunset)


        // Calling the function to get the air quality
        airQuality(latitude, longitude, APIKey)
        
        
        // Adding data in the week weather section
        weekWeather(city, rainStats, APIKey)        
    })
})