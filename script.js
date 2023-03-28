// API Weather: https://open-meteo.com/en/docs#api_form
// https://home.openweathermap.org/users/sign_up

// https://www.youtube.com/watch?v=iILFBGm_I9M&list=WL&index=240&t=16s


// const searchInput = document.querySelector('#search-input')
const searchButton = document.querySelector('#search-button')
const weatherTemperature = document.querySelector('#weather-temperature')
const windSpeed = document.querySelector('#wind-speed')
const humidity = document.querySelector('#humidity')

searchButton.addEventListener('click', () => {
    const APIKey = 'email'
    const city = document.querySelector('#search-input').value

    if(!city || city == ''){
        
        Swal.fire({
            title: "Não foi possível localizar",
            text: "Por favor, digite novamente.",
            icon: "error"
          })
    
          return
    }

})