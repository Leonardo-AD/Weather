// Getting user location
export function getUserLocation(APIKey, searchButton){

    let userLat, userLon  

    navigator.geolocation.getCurrentPosition( (position) => {
        userLat = position.coords.latitude
        userLon = position.coords.longitude
        
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLon}&appid=${APIKey}&lang=pt_br`)
        .then(res => res.json())
        .then(json => {
            document.querySelector('#search-input').value = json.name
            searchButton.click()
        })
        .catch( error => console.log(error) )
    })
}