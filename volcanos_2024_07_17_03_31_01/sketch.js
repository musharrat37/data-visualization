//reference data: https://www.ngdc.noaa.gov/hazel/view/hazards/volcano/
//within the last known eruption period of 1964 or later

//clicking on each volcano will trigger a sound effect

let backgroundMap, foto;
let table1;
let xgeo=[], ygeo=[], lon, lat, elev;
let song;

let mapGeoLeft = -180; 
let mapGeoRight = 180; 
let mapGeoTop = 90;
let mapGeoBottom = -90; 

function setup() {
  createCanvas(800, 500);
  image(backgroundMap, 0, 0, width, height);
  filter(GRAY);
  noStroke();
  foto.resize(20,20);
}

function preload() {
  backgroundMap = loadImage("earth.jpg");
  table1 = loadTable("volcanoes.csv", "csv", "header");
  foto = loadImage("volcano_clipart.png");
  song = loadSound('sound effect volcano.mp3');
}

function draw() {
  
   for (let r = 0; r < table1.getRowCount(); r++) {
    let tableRow = table1.rows[r];
    lat = tableRow.get("Latitude");
    lon = tableRow.get("Longitude");
    elev = tableRow.get("Elevation (m)");
    
    xgeo[r] = (width * (lon - mapGeoLeft)) / (mapGeoRight - mapGeoLeft);
    ygeo[r] = height - (height * (lat - mapGeoBottom)) / (mapGeoTop - mapGeoBottom);
    
    if(elev > 0){
      //fill(255,0,0);
      //circle(xgeo,ygeo,5);
      image(foto, xgeo[r], ygeo[r]);
    }else{
      push();
      tint(0, 80, 204);
      image(foto, xgeo[r], ygeo[r]);
      pop();
    }
  } 
}
function mousePressed() {
   for (let r = 0; r < table1.getRowCount(); r++){
     let d = dist(mouseX,mouseY,xgeo[r],ygeo[r]);
      if(d < 25){
       if (song.isPlaying()) {
         song.stop();
       } else {
         song.play();
       }
     }
  }
}



