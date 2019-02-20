// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}

function getWeather(lat, lng) {
    const API_KEY = '5efc1835e14a60c8ca2d45c294953201';
    return fetch(`http://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lng}&APPID=${API_KEY}`)
        .then(res => res.json().then(json => [json.main, json.weather[0].main]));
}

export default {
    getWeather
}