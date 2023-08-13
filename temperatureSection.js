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
        locationIcon.src = "./assets/pin.svg"
        weatherStatusIcon.src = `https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`
        weatherStatusInfo.innerHTML = json.weather[0].description

        humidity.innerHTML = `${json.main.humidity} <span>%</span>`
        windSpeed.innerHTML = `${parseInt(json.wind.speed)} <span>km/h</span>`
        selectedCity.innerHTML = `${json.name}, ${json.sys.country}`
        
        maxTemp.innerHTML = `${parseInt(json.main.temp_max)}°`
        minTemp.innerHTML = `${parseInt(json.main.temp_min)}°`

})

}