// https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php


let backgroundMap;
let earthquakes;
let mini = [];
let maxi = [];

let serial; // variable for the serial object
let state1 = 0; // variable to hold the data we're sending
let state2 = 0;
let state3 = 0;

// if you use other maps, you would enter different boundaries here (in latitude/longitude)
let mapGeoLeft = -180.00;          // Longitude 180 degrees west (-180)
let mapGeoRight = 180.00;          // Longitude 180 degrees east (+180)
let mapGeoTop = 90.00;          // Latitude 90 degrees north   (+90)
let mapGeoBottom = -90.00;          // Latitude 90 degrees south   (-90)

function setup() {
  createCanvas(800, 400);
  image(backgroundMap, 0, 0, width, height);
  
  // serial constructor
  serial = new p5.SerialPort();

  // serial port to use - you'll need to change this
  serial.open('COM6');

}

function preload() {
  backgroundMap = loadImage("earth.jpg");
  earthquakes = loadJSON('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson');
}

function draw() {
  for (let r = 0; r < earthquakes.features.length; r++) {
    if (maxi < earthquakes.features[r].geometry.coordinates[2]) {
      maxi = earthquakes.features[r].geometry.coordinates[2];
    }
    if (mini > earthquakes.features[r].geometry.coordinates[2]) {
      mini = earthquakes.features[r].geometry.coordinates[2];
    }
  }
  for (let r = 0; r < earthquakes.features.length; r++) {
    let lon = earthquakes.features[r].geometry.coordinates[0];
    let lat = earthquakes.features[r].geometry.coordinates[1];
    let dep = earthquakes.features[r].geometry.coordinates[2]; // depth
    let mag = earthquakes.features[r].properties.mag; // magnitude
    let dur = earthquakes.features[r].properties.dmin; // duration

    let xgeo = width * (lon - mapGeoLeft) / (mapGeoRight - mapGeoLeft);
    let ygeo = height - height * (lat - mapGeoBottom) / (mapGeoTop - mapGeoBottom);
    
    let dep2 = map(dep, mini, maxi, 2, 30);

    if (mag > 5) {                     // magnitude decides on red or yellow
      fill(255, 0, 0, 100);
    } else {
      fill(dur*100, dur*100, 0, 100);       // duration affects color of yellow
    }
    circle(xgeo, ygeo, dep2); // depth in km affects size
    if(xgeo>109 && xgeo<180 && mag>2){
      state1 = 1;
    }else{
      state1 = 0;
    }
    if(xgeo>-163 && xgeo<-57 && mag>2){
      state2 = 2;
    }else{
      state2 = 0;
    }
    if(xgeo>-44 && xgeo<96 && mag>2){
      state3 = 3;
    }else{
      state3 = 0;
    }
    serial.write(state1);
    serial.write(state2);
    serial.write(state3);
    console.log(state1);
    console.log(state2);
    console.log(state3);
    
  }
  fill(0);
  textAlign(CENTER);
  let d = new Date(earthquakes.features[0].properties.time);
  text("Latest: "+earthquakes.features[0].properties.place+" / "+d.toUTCString(), width/2, height -5);
  noLoop();
}