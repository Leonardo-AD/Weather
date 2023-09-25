 import {

    searchButton, APIKey, rainStats, 
    sunrise, sunset, timeNow, circlePosition

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


        //This section below calculate the position of the circle that represents the position of the sun on the sky
        //After some hours of Physic and geolocation (azimute and Zenith concepts) I finish release this mathematical formula
        
        //sunPosition = (timeNowValue - sunriseValue) * (100 / hoursGap)
        //where:
        //timeNowValue = time now value
        //sunriseValue = time of the sunrise
        //100 = value of the position-x of the yellow circle thats represents the sun
        //hoursGap = the value of sun light between the sunset and sunrise -> (sunsetValue - sunriseValue)

        //to get sunriseValue, sunsetValue and timeNowValue I ever used the function toString(10) this 10 references the decimal numbers
        //with toString(10) we set the string that has a number in number and now we have the value. 
        //without that function the return was NaN :(
            
        //I did replace the ':' to '.', just to improve the precision of the number and get the complete values
        //I dis use parseFloat for the value in hoursGap
        //even using this formula isn't really exactly the real position of the sun in the sky, but is the best that i can done at the moment

        //with results i did apply on the circlePosition and this references the value between 0 - 100 of the x position
        //if the x position value equal 50 -> the sun are rigth on the midle of the skies
        //0 means that the sun dosen't have rise and 100 means the sun has set
        //if the sunPosition > 100 his value will be set as 100, once that the sunPosition biger than 100 makes the circle continues his rotation and i don't want it

        let sunriseValue = sunrise.innerHTML.toString(10).replace(':','.')
        let sunsetValue = sunset.innerHTML.toString(10).replace(':','.')
        let timeNowValue = timeNow.innerHTML.toString(10).replace(':','.')

        let hoursGap = parseFloat(sunsetValue) - parseFloat(sunriseValue)
        let sunPosition = (timeNowValue - sunriseValue) * (100 / hoursGap)
        
        if(timeNowValue > sunriseValue){

            if(sunPosition > 0 && sunPosition <= 100){                
                circlePosition.style.cssText = `--pos-x: ${sunPosition.toFixed(2)}`
            }
            else{
                circlePosition.style.cssText = `--pos-x: ${0}`
            }
        }


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