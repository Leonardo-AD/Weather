 import {
    searchButton, 
    selectedCity, 
    weatherTemperature,
    weatherStatusIcon,
    weatherStatusInfo,
    windSpeed, 
    humidity,
    APIKey,
    maxTemp,
    minTemp,
    rainStats,
    locationIcon,
    qualityStatus,
    qualityStatusRate,
    pm2_5,
    pm10,
    so2,
    no2,
    o3,
    co,
    sunrise,
    sunset,
    timeNow
    
} from './export.js'
 

// Getting user position 
// function getUserLocation(){

//     let userLat  
//     let userLon 

//     navigator.geolocation.getCurrentPosition( (position) => {
//         userLat = position.coords.latitude
//         userLon = position.coords.longitude

//         console.log(position.coords.latitude, position.coords.longitude)
        
//         fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${userLat}&lon=${userLon}&appid=${APIKey}&lang=pt_br`)
//         .then(res => res.json())
//         .then(json => {
//             document.querySelector('#search-input').value = "Olinda"
//             console.log(json)
//         })
//     })
// }

// getUserLocation()


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
                
                
        // Adding data in the temperature section
        weatherTemperature.innerHTML = `${parseInt(json.main.temp)}`
        locationIcon.src             = "./assets/pin.svg"
        weatherStatusIcon.src        = `https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`
        weatherStatusInfo.innerHTML  = json.weather[0].description
        humidity.innerHTML           = `${json.main.humidity} <span>%</span>`
        windSpeed.innerHTML          = `${parseInt(json.wind.speed)} <span>km/h</span>`
        selectedCity.innerHTML       = `${json.name}, ${json.sys.country}`
        maxTemp.innerHTML            = `${parseInt(json.main.temp_max)}°`
        minTemp.innerHTML            = `${parseInt(json.main.temp_min)}°`


        // Adding local time, sunrise and sunset
        let getDT       = json.dt
        let getTimezone = json.timezone
        let getSunrise  = json.sys.sunrise
        let getSunset   = json.sys.sunset
        
        timeNow.innerHTML = moment.utc(getDT, 'X').add(getTimezone, 'seconds').format('HH:mm')
        sunrise.innerHTML = moment.utc(getSunrise, 'X').add(getTimezone, 'seconds').format('HH:mm') 
        sunset.innerHTML  = moment.utc(getSunset, 'X').add(getTimezone, 'seconds').format('HH:mm')

        
        // Adding data in the air quality section
        function airQuality(){
            const lat = json.coord.lat
            const lon = json.coord.lon

            fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${APIKey}&lang=pt_br`)
            .then(res => res.json())
            .then(json => {

                if(json.list[0].main.aqi == 0 || json.list[0].main.aqi <= 40){
                    qualityStatus.innerHTML = "Boa"
                    qualityStatusRate.innerHTML = `${json.list[0].main.aqi}`
                }

                else if(json.list[0].main.aqi >= 41 || json.list[0].main.aqi <= 80){
                    qualityStatus.innerHTML = "Moderada"
                    qualityStatusRate.innerHTML = `${json.list[0].main.aqi}`
                }

                else if(json.list[0].main.aqi >= 81 || json.list[0].main.aqi <= 120){
                    qualityStatus.innerHTML = "Ruim"
                    qualityStatusRate.innerHTML = `${json.list[0].main.aqi}`
                }

                else if(json.list[0].main.aqi >= 121 || json.list[0].main.aqi <= 200){
                    qualityStatus.innerHTML = "Muito ruim"
                    qualityStatusRate.innerHTML = `${json.list[0].main.aqi}`
                }
                
                else{
                    qualityStatus.innerHTML = "Péssima"
                    qualityStatusRate.innerHTML = `${json.list[0].main.aqi}`
                }

                pm2_5.innerHTML = json.list[0].components.pm2_5.toFixed(0)
                pm10.innerHTML  = json.list[0].components.pm10.toFixed(0)
                so2.innerHTML   = json.list[0].components.so2.toFixed(0)
                no2.innerHTML   = json.list[0].components.no2.toFixed(0)
                o3.innerHTML    = json.list[0].components.o3.toFixed(0)
                co.innerHTML    = json.list[0].components.co.toFixed(0)
                
            })

        }

        airQuality()
    })
})