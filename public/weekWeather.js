import { day_1, day_2, day_3, day_4, day_5 } from '../export.js'
import { day1_status, day2_status, day3_status, day4_status, day5_status } from '../export.js'
import { TempDay1, TempDay2, TempDay3, TempDay4, TempDay5 } from '../export.js'

export function weekWeather(city, rainStats, APIKey){

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${APIKey}&lang=pt_br`)
    .then(res => res.json())    
    .then(json => {
        console.log(json)
        console.log(json.list[4].main.temp_max.toFixed(0))

        // example of propability in 3h (0.2mm x 100%) = 20% 
        let pop = json.list[0].pop * 100
        rainStats.innerHTML = `${pop.toFixed(0)} <span>%</span>`
        

        // Getting any forecast day and setting the first letter to capital
        function settingDaysOfWeek(){
            
            moment.locale('pt-br')

            let gettingDay_1 = moment().add(1, 'day').calendar() 
            let gettingDay_2 = moment().add(2, 'day').calendar()
            let gettingDay_3 = moment().add(3, 'day').calendar()
            let gettingDay_4 = moment().add(4, 'day').calendar()
            let gettingDay_5 = moment().add(5, 'day').calendar()

            day_1.innerHTML = gettingDay_1[0].toUpperCase() + gettingDay_1.slice(1).split(' ').shift().split('-').shift()
            day_2.innerHTML = gettingDay_2[0].toUpperCase() + gettingDay_2.slice(1).split(' ').shift().split('-').shift()
            day_3.innerHTML = gettingDay_3[0].toUpperCase() + gettingDay_3.slice(1).split(' ').shift().split('-').shift()
            day_4.innerHTML = gettingDay_4[0].toUpperCase() + gettingDay_4.slice(1).split(' ').shift().split('-').shift()
            day_5.innerHTML = gettingDay_5[0].toUpperCase() + gettingDay_5.slice(1).split(' ').shift().split('-').shift()

        }

        
        function maxTemperature(){
            // day 1 = [0-7 or 0-8 check hour to check corretly] array with any of them and get the max and then get the min as well

                // bugs:
                    // At the other size of world the icon apears like night even stay day?! 
                    // The value of min and max weather are inverted: (max = min) and (min = max) maybe the idea above resolve it

            // this way will stay updated when the API refresh the datas any 3 hours. DOOOOO ITTT NOW!
            // [0] it's the current day, i need get it to reduce the API requests

            //15h temperature > 12h   //03h temperature < 06h  
            TempDay1.innerHTML = `${json.list[6].main.temp_max.toFixed(0)}° <span>${json.list[2].main.temp_min.toFixed(0)}°</span>` 
            TempDay2.innerHTML = `${json.list[14].main.temp_max.toFixed(0)}° <span>${json.list[10].main.temp_min.toFixed(0)}°</span>` 
            TempDay3.innerHTML = `${json.list[22].main.temp_max.toFixed(0)}° <span>${json.list[18].main.temp_min.toFixed(0)}°</span>` 
            TempDay4.innerHTML = `${json.list[30].main.temp_max.toFixed(0)}° <span>${json.list[26].main.temp_min.toFixed(0)}°</span>` 
            TempDay5.innerHTML = `${json.list[38].main.temp_max.toFixed(0)}° <span>${json.list[34].main.temp_min.toFixed(0)}°</span>` 
        }


        function setForecastIcon(){
            day1_status.src = `https://openweathermap.org/img/wn/${json.list[5].weather[0].icon}@2x.png`
            day2_status.src = `https://openweathermap.org/img/wn/${json.list[13].weather[0].icon}@2x.png`
            day3_status.src = `https://openweathermap.org/img/wn/${json.list[21].weather[0].icon}@2x.png`
            day4_status.src = `https://openweathermap.org/img/wn/${json.list[29].weather[0].icon}@2x.png`
            day5_status.src = `https://openweathermap.org/img/wn/${json.list[37].weather[0].icon}@2x.png`
        }

        setForecastIcon()
        maxTemperature()
        settingDaysOfWeek()


        // https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png



    })
}

// yesterday at 17:43:   city.list[0] -> dt_txt: "2023-10-07 21:00:00" - temp_max: 26.92 - temp_min: 25.8
// today at ?:
// if the hour change i can use the forecast request instead weather request