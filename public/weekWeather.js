import { day_1, day_2, day_3, day_4, day_5 } from '../export.js'

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
        function settingDays(){
            
            moment.locale('pt-br')

            let gettingDay_1 = moment().add(1, 'day').calendar() 
            let gettingDay_2 = moment().add(2, 'day').calendar()
            let gettingDay_3 = moment().add(3, 'day').calendar()
            let gettingDay_4 = moment().add(4, 'day').calendar()
            let gettingDay_5 = moment().add(5, 'day').calendar()

            day_1.innerHTML = gettingDay_1.split(' ').shift() 
            day_2.innerHTML = gettingDay_2[0].toUpperCase() + gettingDay_2.slice(1).split('-').shift() 
            day_3.innerHTML = gettingDay_3[0].toUpperCase() + gettingDay_3.slice(1).split('-').shift() 
            day_4.innerHTML = gettingDay_4[0].toUpperCase() + gettingDay_4.slice(1).split('-').shift()
            day_5.innerHTML = gettingDay_5[0].toUpperCase() + gettingDay_5.slice(1).split('-').shift()   
        }

        settingDays()
        //get any city of the search field using utc?
    })
}

//libraries links: https://momentjs.com/ -- https://github.com/datejs/Datejs -- https://metring.com.br/tutorial-momentjs