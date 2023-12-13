import { 
    day_1, day_2, day_3, day_4, day_5,
    day1_status, day2_status, day3_status, day4_status, day5_status,
    TempDay1, TempDay2, TempDay3, TempDay4, TempDay5
} from '../export.js'

export function weekWeather(city, rainStats, APIKey){

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${APIKey}&lang=pt_br`)
    .then(res => res.json())    
    .then(json => {

        // example of propability in 3h (0.2mm x 100%) = 20% 
        let pop = json.list[0].pop * 100
        rainStats.innerHTML = `${pop.toFixed(0)} <span>%</span>`
        

        function setDaysOfWeek(){
            
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

        
        function setForecast(){

            let test = json.list
            let minWeekTempValues = []
            let maxWeekTempValues = []

            for(let i = 0; i < test.length; i++){
                minWeekTempValues.push(json.list[i].main.temp_max.toFixed(0)) 
                maxWeekTempValues.push(json.list[i].main.temp_min.toFixed(0))
            }

            TempDay1.innerHTML = `${ Math.max(...maxWeekTempValues.slice(0, 8)) }°   <span>${ Math.min(...minWeekTempValues.slice(0, 8)) }°</span>` 
            TempDay2.innerHTML = `${ Math.max(...maxWeekTempValues.slice(8, 16)) }°  <span>${ Math.min(...minWeekTempValues.slice(8, 16)) }°</span>` 
            TempDay3.innerHTML = `${ Math.max(...maxWeekTempValues.slice(16, 24)) }° <span>${ Math.min(...minWeekTempValues.slice(16, 24)) }°</span>` 
            TempDay4.innerHTML = `${ Math.max(...maxWeekTempValues.slice(24, 32)) }° <span>${ Math.min(...minWeekTempValues.slice(24, 32)) }°</span>` 
            TempDay5.innerHTML = `${ Math.max(...maxWeekTempValues.slice(32, 40)) }° <span>${ Math.min(...minWeekTempValues.slice(32, 40)) }°</span>`

            day1_status.src = `https://openweathermap.org/img/wn/${json.list[5].weather[0].icon}@2x.png`
            day2_status.src = `https://openweathermap.org/img/wn/${json.list[13].weather[0].icon}@2x.png`
            day3_status.src = `https://openweathermap.org/img/wn/${json.list[21].weather[0].icon}@2x.png`
            day4_status.src = `https://openweathermap.org/img/wn/${json.list[29].weather[0].icon}@2x.png`
            day5_status.src = `https://openweathermap.org/img/wn/${json.list[37].weather[0].icon}@2x.png`
        }

        setDaysOfWeek()
        setForecast()
    })
    .catch( error => console.log(error) )
}