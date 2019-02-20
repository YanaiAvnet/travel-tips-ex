function saveToStorage(key, value) {
    var str = JSON.stringify(value);
    sessionStorage.setItem(key, str);
}

function loadFromStorage(key) {
    var str = sessionStorage.getItem(key)
    return JSON.parse(str)
}

function saveLocation(lat, lng) {
    saveToStorage('location', {lat, lng});
}

function getLastLocation() {
    return loadFromStorage('location');
}

export default {
    saveToStorage,
    loadFromStorage,
    getLastLocation,
    saveLocation
}