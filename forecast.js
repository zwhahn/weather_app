const params = new URLSearchParams(window.location.search);
const place = params.get(`place`);

let forecastDays = 5;
let weatherForecast_F = []
let weatherForecast_C = []
var unitSymbol = 'F';


if (place) {
    getWeather(place)
}

const forecastTitle = document.getElementById('forecast-title');
forecastTitle.textContent = `5-Day Forecast of ${place}`;


async function getWeather () {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}/?key=R8KYRLHHRZ6LPWGXCEJY4MLDX`);
    const weatherData = await response.json();
    // console.log(weatherData);
    weatherForecast_F = [];
    weatherForecast_C = [];
    for (let i = 0; i < forecastDays; i++){
        day = weatherData.days[i]
        console.log(day);
        weatherForecast_F.push({
            weekday: getWeekday(day.datetime),
            date: formatDate(day.datetime),
            tempMax: Math.round(day.tempmax),
            tempMin: Math.round(day.tempmin),
            conditions: day.conditions,
            icon: day.icon
        })
        // console.log(weatherForecast_F);
        weatherForecast_C.push({
            weekday: getWeekday(day.datetime),
            date: day.datetime,
            tempMax: Math.round(fahrenheitToCelsius(day.tempmax)),
            tempMin: Math.round(fahrenheitToCelsius(day.tempmin)),
            conditions: day.conditions,
            icon: day.icon
        })
    }
    if (unitSymbol == 'F'){
        populateDayDivs(weatherForecast_F);
    }
    else {
        populateDayDivs(weatherForecast_C)
    }
}


const switchUnitsBtn = document.getElementById('switch-units-btn');
switchUnitsBtn.addEventListener('click', function() {
    if (unitSymbol == 'F') {
        unitSymbol = 'C';
        updateDayDivs(weatherForecast_C);
        switchUnitsBtn.textContent = 'F°';
    }
    else {
        unitSymbol = 'F';
        updateDayDivs(weatherForecast_F);
        switchUnitsBtn.textContent = 'C°';
    }
})


const backBtn = document.getElementById('back-btn');
backBtn.addEventListener('click', function() {
    window.location.href = `index.html`;
})


function populateDayDivs(weatherForecast){
    const flexContainer = document.getElementById(`flex-container`);
    
    weatherForecast.forEach(function(dayData, index) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');


        const iconCircle = document.createElement('div');
        iconCircle.classList.add('icon-circle');
        const iconImg = document.createElement('img');
        iconImg.src = `./assets/weather-icons/${dayData.icon}.svg`;
        iconImg.classList.add('icon-img');
        iconCircle.append(iconImg);


        const weekdayDiv = document.createElement('h2');
        weekdayDiv.innerHTML = `${dayData.weekday}`;


        const dateDiv = document.createElement('div');
        dateDiv.textContent = dayData.date;
        dateDiv.classList.add('date');


        const tempMaxHolder = document.createElement('div');
        tempMaxHolder.classList.add('data-holder');
        const tempMaxTitle = document.createElement('div');
        tempMaxTitle.innerHTML = 'High:'
        tempMaxTitle.classList.add('data-title')
        const tempMaxDiv = document.createElement('div');
        tempMaxDiv.textContent = `${dayData.tempMax}°${unitSymbol}`;
        tempMaxDiv.classList.add('temp-max');
        tempMaxHolder.append(tempMaxTitle, tempMaxDiv);


        const tempMinHolder = document.createElement('div');
        tempMinHolder.classList.add('data-holder');
        const tempMinTitle = document.createElement('div');
        tempMinTitle.innerHTML = 'Low:'
        tempMinTitle.classList.add('data-title')
        const tempMinDiv = document.createElement('div');
        tempMinDiv.textContent = `${dayData.tempMin}°${unitSymbol}`;
        tempMinDiv.classList.add('temp-min');
        tempMinHolder.append(tempMinTitle, tempMinDiv);


        const conditionsDiv = document.createElement('div');
        conditionsDiv.textContent = dayData.conditions;
        conditionsDiv.classList.add('conditions');


        dayDiv.append(iconCircle, weekdayDiv, dateDiv, conditionsDiv, tempMaxHolder, tempMinHolder);
        flexContainer.append(dayDiv);
    });
}

function updateDayDivs(weatherForecast){
    const dayDivs = document.querySelectorAll(`.day`);
    
    weatherForecast.forEach(function(dayData, index) {
        const dayDiv = dayDivs[index];
        
        dayDiv.querySelector('.temp-max').textContent = `${dayData.tempMax}°${unitSymbol}`;
        dayDiv.querySelector('.temp-min').textContent = `${dayData.tempMin}°${unitSymbol}`;

    });
}

function fahrenheitToCelsius(fahrenheit){
    return (fahrenheit - 32) * 5 / 9;
}

function getWeekday(dateString) {
    const [year, month, day] = dateString.split('-');  // split into individual numbers so JS interprets as local timezone
    const date = new Date(year, month - 1, day);       // month is 0-indexed
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
    const [year, month, day] = dateString.split('-');  // split into individual numbers so JS interprets as local timezone
    const date = new Date(year, month - 1, day);       // month is 0-indexed
    console.log(date)
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"     
    });
}