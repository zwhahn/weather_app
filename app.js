async function getWeather () {
    const response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/19119/?key=R8KYRLHHRZ6LPWGXCEJY4MLDX');
    const weatherData = await response.json();
    console.log(weatherData);
    const currentTemp = weatherData.currentConditions.temp;
    console.log(currentTemp);
}

getWeather();