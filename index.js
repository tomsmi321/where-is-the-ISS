
const map = L.map('mapid').setView([0, 0], 1);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileURL, {attribution})
tiles.addTo(map)
let markerArr = [];
let marker;


let myIcon = L.icon({
    iconUrl: 'icons8-satellite-50.png',
    iconSize: [40, 40],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
});

function setCoordinates(latitude, longitude) {
    let lat = document.getElementById("lat");
    lat.innerText = latitude.toFixed(5);
    let lon = document.getElementById("lon");
    lon.innerText = longitude.toFixed(5);
}

function updateMarker(latitude, longitude, icon) {
    // if there is somthing in the marker array already then remove that layer from the map
    // remove it from the array leaving an empty array
    if(marker) {
        map.removeLayer(marker);
        markerArr.pop();
    }
    // create the new marker
    marker = L.marker([latitude, longitude], {icon: icon})
    // add the new marker to the marker array
    markerArr.push(marker)
    // add the marker to the map
    L.layerGroup(markerArr).addTo(map);
}

async function getISSData() { 
    let api_url = 'https://api.wheretheiss.at/v1/satellites/25544';
    let response = await fetch(api_url);
    let data = await response.json();
    let {latitude, longitude} = data;
   
    setCoordinates(latitude, longitude)

    map.setView([latitude, longitude]);
    map.getZoom();
    // update the marker
    updateMarker(latitude, longitude, myIcon);
}

// set the function to run every 5 seconds
async function run() {
    setInterval(() => {
        getISSData();
    }, 5000);
}

run();

