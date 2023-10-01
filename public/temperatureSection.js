import {

    selectedCity, weatherTemperature, weatherStatusIcon, weatherStatusInfo,
    windSpeed, humidity, maxTemp, minTemp, locationIcon

} from '../export.js'

export function temperatureSection(city, APIKey) {

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}&lang=pt_br`)
        .then(res => res.json())
        .then(json => {

            // Adding data in the temperature section
            weatherTemperature.innerHTML = `${parseInt(json.main.temp)}`
            locationIcon.src = "./assets/pin.svg"
            weatherStatusIcon.src = `https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`
            weatherStatusInfo.innerHTML = json.weather[0].description
            
            selectedCity.innerHTML = `${json.name}, ${json.sys.country}`
            humidity.innerHTML = `${json.main.humidity} <span>%</span>`
            windSpeed.innerHTML = `${parseFloat(json.wind.speed).toFixed()} <span>km/h</span>`

            maxTemp.innerHTML = `${parseInt(json.main.temp_max)}°`
            minTemp.innerHTML = `${parseInt(json.main.temp_min)}°`
    })
}