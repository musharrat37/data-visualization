//alternative fuel stations in the US. Full dataset is too large so it is set to show 200 results. Filtered to show all the stations that are open and can be accessed by the public

//circle radius gets increase from least to most abundant source

//https://developer.nrel.gov/api/alt-fuel-stations/v1.geojson?api_key=fNTo5o73e0o9ZDCi1pdfYcT0fKxX8gEGDIXFvbuo&status=E&access=public&fuel_type=all&country=US&limit=200

let backgroundMap;
let url;
let mapGeoLeft, mapGeoRight, mapGeoTop, mapGeoBottom;

let stations;
let fuel_type = [];

function preload() {
  url =
    "https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/[-124.7497,24.438,-67.2409,49.778]/800x450?access_token=pk.eyJ1Ijoic2F1ZGE3MyIsImEiOiJjbGFrODV5MHAwZDJyM25wa2x6MXc3Y3RuIn0.YbXh2uMFSzFh1ZMihfI4UA";
  backgroundMap = loadImage(url);
  stations = loadJSON('https://developer.nrel.gov/api/alt-fuel-stations/v1.geojson?api_key=fNTo5o73e0o9ZDCi1pdfYcT0fKxX8gEGDIXFvbuo&status=E&access=public&fuel_type=all&country=US&limit=200');
  
}

function setup() {
  
  let temp1 = split(url, "[");
  let temp2 = split(temp1[1],"]");
  let coord = split(temp2[0], ",");
  console.log(coord);
  
  mapGeoLeft = coord[0];
  mapGeoRight = coord[2];
  mapGeoBottom = coord[1];
  mapGeoTop = coord[3];

  let temp3 = split(temp2[1], "?");
  let temp4 = split(temp3[0], "x");
  temp4[0] = temp4[0].replace("/", "");
  let w = temp4[0];
  let h = temp4[1];
  console.log(temp4);
  createCanvas(w, h);
  image(backgroundMap, 0, 0, width, height);
  noStroke();
}

function draw() {
  
   for (let r = 0; r < stations.features.length; r++){
     let lon = stations.features[r].geometry.coordinates[0];
     let lat = stations.features[r].geometry.coordinates[1];
     let fuel_type = stations.features[r].properties.fuel_type_code;
     
     let xgeo = width * (lon - mapGeoLeft) / (mapGeoRight - mapGeoLeft);
    let ygeo = height - height * (lat - mapGeoBottom) / (mapGeoTop - mapGeoBottom);
     
     if(fuel_type == "LNG"){
       fill(255,0,0);
       circle(xgeo, ygeo, 3);
       rect(20,440,30,8);
       text("LNG",60,448);
     }else if(fuel_type == "HY"){
       fill(200,0,0,200);
       circle(xgeo, ygeo, 5);
       rect(20,420,30,8);
       text("Hydrogen",60,428);
     }else if(fuel_type == "CNG"){
       fill(200,90,0,170);
       circle(xgeo, ygeo, 8);
       rect(20,400,30,8);
       text("CNG",60,408);
     }else if(fuel_type == "BD"){
       fill(150,100,130,120);
       circle(xgeo, ygeo, 10);
       rect(20,380,30,8);
       text("Biodiesel",60,388);
     }else if(fuel_type == "LPG"){
       fill(150,180,20,90);
       circle(xgeo, ygeo, 15);
       rect(20,360,30,8);
       text("LPG (Propane)",60,368);
     }else if(fuel_type == "E85"){
       fill(0,200,50,50);
       circle(xgeo, ygeo, 20);
       rect(20,340,30,8);
       text("E85 (Ethanol)",60,348);
     }else if(fuel_type == "ELEC"){
       fill(0,255,0,20);
       circle(xgeo, ygeo, 30);
       rect(20,320,30,8);
       text("Electric",60,328);
     }
   }
  
  
  
  noLoop();
}