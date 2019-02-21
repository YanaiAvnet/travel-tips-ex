import locService from './services/loc.service.js'
import mapService from './services/map.service.js'
import weatherService from './services/weather.service.js'
import storageService from './services/storage.service.js'

window.onload = () => {
    var urlParams = new URLSearchParams(window.location.search);
    var defaultLat = +urlParams.get('lat')
    var defaultLng = +urlParams.get('lng')
    var isDefaultLocation = (!!defaultLat && !!defaultLng);
    // initializing a default location or going to geolocation if available
    console.log('default:', defaultLat, defaultLng);
    
    mapService.initMap(defaultLat, defaultLng)
        .then(() => {
            if (isDefaultLocation) renderPosition(defaultLat, defaultLng);
            else goToMyLocation();
        })
        .catch(console.warn);

    //going to geolocation on click
    document.querySelector('.my-location-btn').addEventListener('click', goToMyLocation)

    //searching address
    document.querySelector('.go-btn').addEventListener('click', goToAddress)

    //copying location
    document.querySelector('.copy-location-btn').addEventListener('click', () => onCopyLocation(storageService.getLastLocation()))
}

function renderPosition(lat, lng) {
    console.log('rendering position:', lat, lng);
    mapService.panTo(lat, lng);
    mapService.addMarker({ lat, lng })
    weatherService.getWeather(lat, lng)
        .then(res => renderWeather(res));
    mapService.getGeocodeFromCoords(lat, lng)
        .then(res => document.querySelector('.location-name').innerHTML = res);
    storageService.saveLocation(lat, lng);
}

function goToMyLocation() {
    locService.getPosition()
        .then(pos => {
            let lat = pos.coords.latitude;
            let lng = pos.coords.longitude;
            renderPosition(lat, lng);
        })
        .catch(err => {
            console.log('unable to get position', err);
        })
}

function renderWeather(weatherStats) {
    var strHtml = '<ul>'
    for (var stat in weatherStats[0]) {
        strHtml += `<li>${stat}: ${weatherStats[0][stat]}</li>`;
    }
    strHtml += `<li>${weatherStats[1]}</li>`;
    strHtml += '</ul>'
    strHtml = strHtml.replace(/_/g, ' ');
    document.querySelector('.weather-container').innerHTML = strHtml;
}

function goToAddress() {
    var searchVal = document.querySelector('.search-input').value;
    mapService.getCoordsFromGeocode(searchVal)
        .then(res => {
            renderPosition(res.geometry.location.lat, res.geometry.location.lng)
        })
}

function onCopyLocation(location) {
    var queryStr = `https://yanaiavnet.github.io/travel-tips-ex/?lat=${location.lat}&lng=${location.lng}`;
    const el = document.createElement('textarea');
    // el.style.display = 'none';
    el.value = queryStr;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};