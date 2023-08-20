 import {

    searchButton, APIKey, rainStats, 
    sunrise, sunset, timeNow,

} from './export.js'

import { getUserLocation } from './getUserLocation.js'
import { temperatureSection } from './temperatureSection.js'
import { airQualitySection } from './airQualitySection.js'


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

        //Calling the function to get temperature, humidity, wind speed and rain probability
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


        //Calling the function to get the air quality
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

                // example of propability in 3h (0.2mm x 100%) = 20%
                let pop = json.list[0].pop * 100
                rainStats.innerHTML = `${pop.toFixed(0)} <span>%</span>`
            })
        }

        weekWeather()
        
    })
})