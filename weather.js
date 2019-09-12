const weather = document.querySelector(".js-weather");

const API_KEY = "d30f4b729098de2a70597d953ff30a48";
const COORDS = 'coords';

function getWeather(lat, lng) {
    fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    
 ).then(function(response){
     return response.json();
 }).then(function(json){
     const temperature = json.main.temp;
     const place = json.name;
     weather.innerText = `${temperature} @ ${place}`;
 });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function HandleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(params) {
    console.log("Cant access geo location");
}

function askForCoords(params) {
    navigator.geolocation.getCurrentPosition(HandleGeoSucces, handleGeoError);
}

function loadCoords(params) {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
      askForCoords();
    } else {
      const parseCoords = JSON.parse(loadedCoords);
      getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init(params) {
    loadCoords();
}

init();