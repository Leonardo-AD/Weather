export function sunPosition(sunrise, sunset, timeNow, circlePosition, getDT, getTimezone, getSunrise, getSunset){

    timeNow.innerHTML = moment.utc(getDT, 'X').add(getTimezone, 'seconds').format('HH:mm')
    sunrise.innerHTML = moment.utc(getSunrise, 'X').add(getTimezone, 'seconds').format('HH:mm')
    sunset.innerHTML  = moment.utc(getSunset, 'X').add(getTimezone, 'seconds').format('HH:mm')

    
    // This section below calculate the position of the circle that represents the position of the sun on the sky
    // After some hours of Physic and geolocation (azimute and Zenith concepts) I made this mathematical formula
    
    // sunPosition = (timeNowValue - sunriseValue) * (100 / hoursGap)
    
    // where:
    // timeNowValue = time now value 
    // sunriseValue = time of the sunrise;
    // 100 = value of the position-x of the yellow circle thats represents the sun
    // hoursGap = the value of sun light between the sunset and sunrise -> (sunsetValue - sunriseValue)
    // to get sunriseValue, sunsetValue and timeNowValue I used the function toString(10) this 10 references the decimal numbers
    // with toString(10) we set the string that has a number in a decimal number value. 
    // without that function the return was NaN :(
        
    // I did replace the ':' to '.', just to improve the precision of the number and get the complete values
    // with results i did apply on the circlePosition and this references the value between 0 - 100 of the x position
    // if the x position value equal 50 -> the sun are rigth on the midle of the skies
    // 0 means that the sun dosen't have rise yet and 100 means the sun has set
    // if the sunPosition > 100 his value will be set as 100 because if the sunPosition bigger than 100 the circle continues his rotation and i don't want that
    
    let sunriseValue = sunrise.innerHTML.toString(10).replace(':','.')
    let sunsetValue  = sunset.innerHTML.toString(10).replace(':','.')
    let timeNowValue = timeNow.innerHTML.toString(10).replace(':','.')
    
    let hoursGap    = sunsetValue - sunriseValue
    let sunPosition = (timeNowValue - sunriseValue) * (100 / hoursGap)

    if(timeNowValue > sunriseValue && sunPosition > 0 && sunPosition <= 100){
        circlePosition.style.cssText = `--pos-x: ${sunPosition.toFixed(2)}`
    }
    else{
        circlePosition.style.cssText = `--pos-x: ${0}`
    }
} 