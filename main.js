document.getElementById('place-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const place = document.getElementById('place').value;

    window.location.href = `forecast.html?place=${place}`;
})