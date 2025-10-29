const params = new URLSearchParams(window.location.search);
const place = params.get(`place`);

if (place) {
    getWeather(place)
}

async function getWeather () {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}/?key=R8KYRLHHRZ6LPWGXCEJY4MLDX`);
    const weatherData = await response.json();
    console.log(weatherData);
    const currentTemp = weatherData.currentConditions.temp;
    const weatherForecast = []
    for (let i =0; i < 5; i++){
        day = weatherData.days[i]
        weatherForecast.push({
            date: day.datetime,
            tempMaxF: Math.round(day.tempmax),
            tempMinF: Math.round(day.tempmin),
            tempMaxC: Math.round(fahrenheitToCelsius(day.tempmax)),
            tempMinC: Math.round(fahrenheitToCelsius(day.tempmin)),
            conditions: day.conditions,
            icon: day.icon
        })
    }
    return populateDayDivs(weatherForecast);
}

function populateDayDivs(weatherForecast){
    const dayDivs = document.querySelectorAll(`.day`);
    
    weatherForecast.forEach(function(dayData, index) {
        const dayDiv = dayDivs[index];
        if (!dayDiv) return; // safeguard in case there are fewer divs than days
        
        dayDiv.querySelector('.date').textContent = dayData.date;
        dayDiv.querySelector('.temp-max').textContent = dayData.tempMaxF;
        dayDiv.querySelector('.temp-min').textContent = dayData.tempMinF;
        dayDiv.querySelector('.conditions').textContent = dayData.conditions;
    });
}

function fahrenheitToCelsius(fahrenheit){
    return (fahrenheit - 32) * 5 / 9;
}