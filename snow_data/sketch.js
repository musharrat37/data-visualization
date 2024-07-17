let backgroundMap;
let table1;
let xgeo, ygeo, lon, lat, density;

let mapGeoLeft = 0.1424; 
let mapGeoRight = 0.131; 
let mapGeoTop = 51.5164;
let mapGeoBottom =  51.5093; 

function setup() {
  createCanvas(600, 600);
  fill(255, 0, 0);
  noStroke();
  image(backgroundMap, 0, 0, width, height);
  filter(INVERT);
  textAlign(CENTER, CENTER);
}

function preload() {
  backgroundMap = loadImage("snow.png");
  table1 = loadTable("cholera.csv", "csv", "header");
}

function draw() {
  
  for (let r = 0; r < table1.getRowCount(); r++) {
    let tableRow = table1.rows[r];
    lat = tableRow.get("lat");
    lon = tableRow.get("lon");
    density = tableRow.get("count");
    
    xgeo = map(lon*-1, mapGeoRight, mapGeoLeft, width,0);
    ygeo = map(lat, mapGeoTop, mapGeoBottom,0, height);
    
    if(density > 0){
      fill(205, 0, 0, 255*(10/density));
      circle(xgeo, ygeo, density*2);
    }else{
      textSize(32);
      fill(190, 202, 15);
      text('W', xgeo, ygeo);
    }
  }
  
  noLoop();
}
