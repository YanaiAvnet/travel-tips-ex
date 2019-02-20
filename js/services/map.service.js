
export default {
    initMap,
    addMarker,
    panTo,
    getGeocodeFromCoords,
    getCoordsFromGeocode
}

var map;

window.initMap = initMap

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            map = new google.maps.Map(
                document.querySelector('#map'), {
                    center: { lat, lng },
                    zoom: 15
                })
            console.log('Map!', map);
        })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: map,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    map.panTo(laLatLng);
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyD0VRHm94yt7mcVzgsqr9NrHG--4zC8wRg';
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
        // elGoogleApi.onerror = reject.bind(null,'Google script failed to load')
    })
}

function getGeocodeFromCoords(lat, lng) {
    const API_KEY = 'AIzaSyB-H55Zg3dIlXeloikcy7iq5MGG1D7YGgw';
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`)
        .then(res => res.json().then(json => json.results[0].formatted_address))
}

function getCoordsFromGeocode(address) {
    const API_KEY = 'AIzaSyB-H55Zg3dIlXeloikcy7iq5MGG1D7YGgw';
    var addressStr = address.replace('+', ' ')
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${addressStr}&key=${API_KEY}`)
    .then(res => res.json().then(json => json.results[0]))
        // .then(res => res.json().then(json => json.results[0].address_components.map(component => component.short_name).join(', ')))
}