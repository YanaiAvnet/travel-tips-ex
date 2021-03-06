// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}

function getWeather(lat, lng) {
    const API_KEY = '5efc1835e14a60c8ca2d45c294953201';
    return fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lng}&APPID=${API_KEY}`)
        .then(res => res.json())
        .then(weatherInfo => [weatherInfo.main, weatherInfo.weather[0].main]);
}

export default {
    getWeather
}