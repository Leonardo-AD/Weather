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


// Getting current hours and minutes
let getTimeNow = new Date()
timeNow.innerHTML = `${getTimeNow.getHours()}:${getTimeNow.getMinutes()}`

setInterval(() => {

    let getTimeNow = new Date()
    timeNow.innerHTML = `${getTimeNow.getHours()}:${getTimeNow.getMinutes()}`

}, 5000)


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
                // background.style.backgroundImage = 'url(./assets/weather-sunny.png)'
                rainStats.innerHTML = `0 <span>%</span>`
                locationIcon.src = "./assets/pin.svg" 
                break;

            case 'Rain':
                // background.style.backgroundImage = 'url(./assets/weather-rainy.png)'
                rainStats.innerHTML = `60 <span>%</span>`
                locationIcon.src = "./assets/pin.svg"
                break;
            
            case 'Snow':
                // background.style.backgroundImage = 'url(./assets/weather-snow.png)'
                rainStats.innerHTML = `0 <span>%</span>`
                locationIcon.src = "./assets/pin.svg"
                break;
            
            case 'Storm':
                // background.style.backgroundImage = 'url(./assets/weather-storm.png)'
                rainStats.innerHTML = `50 <span>%</span>`
                locationIcon.src = "./assets/pin.svg"
                break;

            case 'Clouds':
                // background.style.backgroundImage = 'url(./assets/weather-partly-cloudy.png)'
                rainStats.innerHTML = `5 <span>%</span>`
                locationIcon.src = "./assets/pin.svg"
                break;
               
            case 'Haze':
                // background.style.backgroundImage = 'url(./assets/weather-cloudy.png)'
                rainStats.innerHTML = `10 <span>%</span>`
                locationIcon.src = "./assets/pin.svg"
                break; 

            default:
                break;
        }

        
        // Adding data in the temperature section
        weatherTemperature.innerHTML = `${parseInt(json.main.temp)}`
        humidity.innerHTML = `${json.main.humidity} <span>%</span>`
        windSpeed.innerHTML = `${parseInt(json.wind.speed)} <span>km/h</span>`
        selectedCity.innerHTML = `${json.name}, ${json.sys.country}`
        maxTemp.innerHTML = `${parseInt(json.main.temp_max)}°`
        minTemp.innerHTML = `${parseInt(json.main.temp_min)}°`


        // Adding sunrise and sunset times
        let getTimezone = json.timezone
        let getSunrise = json.sys.sunrise
        let getSunset =  json.sys.sunset
        
        sunrise.innerHTML = moment.utc(getSunrise, 'X').add(getTimezone, 'seconds').format('HH:mm') 
        sunset.innerHTML = moment.utc(getSunset, 'X').add(getTimezone, 'seconds').format('HH:mm')

        
        // Air quality section
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
                pm10.innerHTML = json.list[0].components.pm10.toFixed(0)
                so2.innerHTML = json.list[0].components.so2.toFixed(0)
                no2.innerHTML = json.list[0].components.no2.toFixed(0)
                o3.innerHTML = json.list[0].components.o3.toFixed(0)
                co.innerHTML = json.list[0].components.co.toFixed(0)
                
                console.log(json, "aqui")
            })
        }

        airQuality()
    })
}) 