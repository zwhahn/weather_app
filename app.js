async function getWeather () {
    const response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/19119/?key=R8KYRLHHRZ6LPWGXCEJY4MLDX');
    const weatherData = await response.json();
    console.log(weatherData);
    const currentTemp = weatherData.currentConditions.temp;
    const weatherForecast = []
    for (let i =0; i < weatherData.days.length; i++){
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
    console.log(weatherForecast);
}

function fahrenheitToCelsius(fahrenheit){
    return (fahrenheit - 32) * 5 / 9;
}

getWeather();