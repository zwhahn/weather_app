document.getElementById('place-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const place = document.getElementById('place').value;
    getWeatherTest(place);
})

async function getWeatherTest(place) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}/?key=R8KYRLHHRZ6LPWGXCEJY4MLDX`);

        if (!response.ok) {
            throw new Error('Location not found');
        }

        window.location.href = `forecast.html?place=${place}`;
    }
    catch (error) {
        alert(error);
    }
}