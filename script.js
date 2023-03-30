// API Weather: https://open-meteo.com/en/docs#api_form
// https://home.openweathermap.org/users/sign_up

// https://www.youtube.com/watch?v=iILFBGm_I9M&list=WL&index=240&t=16s
// http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={APIkey} read the parameters

// const searchInput = document.querySelector('#search-input')
const searchButton = document.querySelector('#search-button')

searchButton.addEventListener('click', () => {
    const APIKey = 'd5c9103c9c7225eb8814a372432fd7e9'
    const city = document.querySelector('#search-input').value

    if(!city || city == ' '){   // ALTERAR TAMANHO DO ALERT!!!
        
        Swal.fire({
            title: "Não foi possível localizar",
            text: "Por favor, digite novamente.",
            icon: "error",
            background: "#E7E6FB"
          })
    
          return
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(res => res.json())
    .then(json => {
        
        if(json.code === '404'){
            
            Swal.fire({
                title: "Não foi possível localizar",
                text: "Por favor, digite novamente.",
                icon: "error",
                background: "#E7E6FB"
              })
        
              return
        }

        const citySelected = document.querySelector('#city-selected')
        const weatherTemperature = document.querySelector('#weather-temperature')
        const windSpeed = document.querySelector('#wind-speed')
        const humidity = document.querySelector('#humidity')
    })

})  