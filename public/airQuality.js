import {
    qualityStatus, qualityStatusRate,
    pm2_5, pm10, so2, no2, o3, co
} from '../export.js'

export function airQuality(latitude, longitude, APIKey) {

    fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${APIKey}&lang=pt_br`)
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

        // Adding data in the air quality section
        pm2_5.innerHTML = json.list[0].components.pm2_5.toFixed(0)
        pm10.innerHTML  = json.list[0].components.pm10.toFixed(0)
        so2.innerHTML   = json.list[0].components.so2.toFixed(0)
        no2.innerHTML   = json.list[0].components.no2.toFixed(0)
        o3.innerHTML    = json.list[0].components.o3.toFixed(0)
        co.innerHTML    = json.list[0].components.co.toFixed(0)
    })
    .catch( error => console.log(error) )
}