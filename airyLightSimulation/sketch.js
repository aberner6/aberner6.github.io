
// A HTML range slider
var sliderPositionLens;
var sliderPositionLight;
var heightOnWall = 300;

var wallHeight = 680;
var margin = 100;

var radius = 10;
var grow = +1;
var d = 1;

function setup() {
  createCanvas(720, wallHeight+margin);
  // hue, saturation, and brightness
  // colorMode(HSB, 255);
  // slider has a range between 0 and 255 with a starting value of 127
  // sliderPositionLens = createKnob(0,360,0,wallHeight,wallHeight/1.2, wallHeight); 
   sliderPositionLens = createSlider(wallHeight/1.2, wallHeight, wallHeight);

  // sliderPositionLight = createSlider(0, wallHeight, wallHeight);

}

function draw() {
  background(255);
  strokeWeight(1);

  // Set the hue according to the slider
  stroke(0, sliderPositionLens.value(), 255);
  fill(0, sliderPositionLens.value(), 255, 127);
  ellipse(200, sliderPositionLens.value()-40, 20, 20);

radius = map(sliderPositionLens.value(),wallHeight/1.2,wallHeight,10,wallHeight/2.5);

// radius = map(sliderPositionLens.value(),0,wallHeight,-100,wallHeight/2.5);
// radius = sliderPositionLens.value()/5;
// console.log(radius+"radius");
// console.log(sliderPositionLens.value()+"slider"); //300
  for(var i = 0; i < 100;){
    stroke(0);
   strokeWeight(.1);
    i = i+50;
    ellipse(200-75+i,85,radius,radius);
    ellipse(200,10+i,radius,radius);
  }

  strokeWeight(2);
  stroke(170); 
  line(0, wallHeight, 210, wallHeight); 
  // line(0, sliderPositionLight.value(), 210, sliderPositionLight.value()); 
  fill(178);
  stroke(255);
  rect(200-10, wallHeight-18, 20, 20);
}