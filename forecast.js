const params = new URLSearchParams(window.location.search);
const place = params.get(`place`);
let weatherForecast_F = []
let weatherForecast_C = []
var units = 'F';

const switchUnitsBtn = document.getElementById('switch-units');
switchUnitsBtn.addEventListener('click', function(event) {
    if (units == 'F') {
        units = 'C';
        updateDayDivs(weatherForecast_C);
        switchUnitsBtn.textContent = 'F';
    }
    else {
        units = 'F';
        updateDayDivs(weatherForecast_F);
        switchUnitsBtn.textContent = 'C';
    }
})

if (place) {
    getWeather(place)
}

async function getWeather () {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}/?key=R8KYRLHHRZ6LPWGXCEJY4MLDX`);
    const weatherData = await response.json();
    console.log(weatherData);
    weatherForecast_F = []
    weatherForecast_C = []
    for (let i =0; i < 5; i++){
        day = weatherData.days[i]
        weatherForecast_F.push({
            weekday: getWeekday(day.datetime),
            date: formatDate(day.datetime),
            tempMax: Math.round(day.tempmax),
            tempMin: Math.round(day.tempmin),
            conditions: day.conditions,
            icon: day.icon
        })
        weatherForecast_C.push({
            date: day.datetime,
            tempMax: Math.round(fahrenheitToCelsius(day.tempmax)),
            tempMin: Math.round(fahrenheitToCelsius(day.tempmin)),
            conditions: day.conditions,
            icon: day.icon
        })
    }
    if (units == 'F'){
        populateDayDivs(weatherForecast_F);
    }
    else {
        populateDayDivs(weatherForecast_C)
    }
    console.log(weatherForecast_F);
}

function populateDayDivs(weatherForecast){
    const flexContainer = document.getElementById(`flex-container`);
    
    weatherForecast.forEach(function(dayData, index) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');


        const weekdayDiv = document.createElement('h2');
        weekdayDiv.innerHTML = `${dayData.weekday}`;


        const dateDiv = document.createElement('div');
        dateDiv.textContent = dayData.date;


        const tempMaxHolder = document.createElement('div');
        tempMaxHolder.classList.add('data-holder');
        const tempMaxTitle = document.createElement('div');
        tempMaxTitle.innerHTML = 'High:'
        tempMaxTitle.classList.add('data-title')
        const tempMaxDiv = document.createElement('div');
        tempMaxDiv.textContent = dayData.tempMax;
        tempMaxDiv.classList.add('temp-max');
        tempMaxHolder.append(tempMaxTitle, tempMaxDiv);


        const tempMinHolder = document.createElement('div');
        tempMinHolder.classList.add('data-holder');
        const tempMinTitle = document.createElement('div');
        tempMinTitle.innerHTML = 'Low:'
        tempMinTitle.classList.add('data-title')
        const tempMinDiv = document.createElement('div');
        tempMinDiv.textContent = dayData.tempMin;
        tempMinDiv.classList.add('temp-min');
        tempMinHolder.append(tempMinTitle, tempMinDiv);


        const conditionsDiv = document.createElement('div');
        conditionsDiv.textContent = dayData.conditions;

        dayDiv.append(weekdayDiv, dateDiv, conditionsDiv, tempMaxHolder, tempMinHolder);

        flexContainer.append(dayDiv);
    });
}

function updateDayDivs(weatherForecast){
    const dayDivs = document.querySelectorAll(`.day`);
    
    weatherForecast.forEach(function(dayData, index) {
        const dayDiv = dayDivs[index];
        
        dayDiv.querySelector('.temp-max').textContent = dayData.tempMax;
        dayDiv.querySelector('.temp-min').textContent = dayData.tempMin;

    });
}

function fahrenheitToCelsius(fahrenheit){
    return (fahrenheit - 32) * 5 / 9;
}

function getWeekday(dateString) {
    const date = new Date(dateString);
    const dateWeekday = date.toLocaleDateString("en-US", {
            weekday: "long",
    });

    const todayWeekday = new Date().toLocaleDateString("en-US", {
            weekday: "long",
    });

    if (dateWeekday == todayWeekday) {
        return 'Today'
    }
    else {
        return dateWeekday;
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"     
    });
}