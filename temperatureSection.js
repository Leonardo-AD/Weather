import {

    selectedCity, weatherTemperature, weatherStatusIcon, weatherStatusInfo,
    windSpeed, humidity, APIKey, maxTemp, minTemp, rainStats,
    locationIcon

} from './export.js'


export function temperatureSection() {

const city = document.querySelector('#search-input').value

if (!city) {

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

        if (json.cod === '404') {

            Swal.fire({
                title: `Não foi possível localizar: ${city}`,
                text: "Não conseguimos encontrar a cidade.",
                icon: "error",
                background: "#E7E6FB"
            })
        }

        // Adding data in the temperature section
        weatherTemperature.innerHTML = `${parseInt(json.main.temp)}`
        locationIcon.src = "./assets/pin.svg"
        weatherStatusIcon.src = `https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`
        weatherStatusInfo.innerHTML = json.weather[0].description

        selectedCity.innerHTML = `${json.name}, ${json.sys.country}`
        humidity.innerHTML = `${json.main.humidity} <span>%</span>`
        windSpeed.innerHTML = `${parseInt(json.wind.speed)} <span>km/h</span>`
        // rainStats.innerHTML = `${pop.toFixed(0)} <span>%</span>`
        
        maxTemp.innerHTML = `${parseInt(json.main.temp_max)}°`
        minTemp.innerHTML = `${parseInt(json.main.temp_min)}°`

})

}