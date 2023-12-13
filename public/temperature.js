import {

    selectedCity, weatherTemperature, weatherStatusIcon, weatherStatusInfo,
    windSpeed, humidity, maxTemp, minTemp, locationIcon

} from '../export.js'

export function temperature(json) {
    
    // Adding data in the temperature section
    weatherTemperature.innerHTML = `${json.main.temp.toFixed(0)}`
    locationIcon.src             = "./assets/pin.svg"
    weatherStatusIcon.src        = `https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`
    weatherStatusInfo.innerHTML  = json.weather[0].description
        
    selectedCity.innerHTML = `${json.name}, ${json.sys.country}`
    humidity.innerHTML     = `${json.main.humidity} <span>%</span>`
    windSpeed.innerHTML    = `${json.wind.speed.toFixed(0)} <span>km/h</span>`
    maxTemp.innerHTML      = `${json.main.temp_max.toFixed(0)}°`
    minTemp.innerHTML      = `${json.main.temp_min.toFixed(0)}°`
}