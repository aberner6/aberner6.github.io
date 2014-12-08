var system;
var stop = false;
// d3chart = d3chart || {};
// var r;
var r;
var d3chart = d3chart || {};
d3chart.r = 5;
if (typeof d3chart !== 'undefined') {

function setup() {
  createCanvas(200, 600);
  system = new ParticleSystem(createVector(0, height/2));
}

function draw() {
  if(stop==false){
  background(0);
  system.addParticle();

  system.run();
  }else{
  // system.addParticle();
  system.run();    
  }
}

// A simple Particle class
var Particle = function(position) {
  this.acceleration = createVector(0.05,0);
  this.velocity = createVector(random(-1, 1), random(-10, 10));
  this.position = position.get();
  this.lifespan = 255;//100;//255.0;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

var value = 0;
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    value = 255;
  } else if (keyCode === RIGHT_ARROW) {
    value = 0;
  }
}
// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  if(value == 0){
   this.lifespan -= 10;   
  } 
  if(value==255){
    this.lifespan -= 2;
  }
};

// Method to display
Particle.prototype.display = function() {
  // stroke(200, this.lifespan);
  noStroke();
  // strokeWeight(2);
  fill(20,this.lifespan,200, this.lifespan);
  if(this.lifespan>0){
  ellipse(this.position.x, this.position.y, d3chart.r, d3chart.r);//this.lifespan, this.lifespan);
  }
  if(this.position.x>=width/3){
    // translate(width/3, this.position.y);
    // shearY(PI/4.0);
    fill(20,100,200, 20);
    // var y = this.position.y;
    // rect(width/3, y, 8, y/10);
    rect(width/3, this.position.y, 8, this.position.y/10);
    stop = true;

  // rotate(PI/3.0);
  // rect(width/3, this.position.y, 8, this.position.y/10);
  }
  // if(this.position.x>=width/3){
  //   // console.log("yes");
  //   stop = true;
  //  // fill(this.lifespan,20,20);
  //  // ellipse(width/3, this.position.y, 10,10);   
  // }

};

// Is the particle still useful?
Particle.prototype.isDead = function(){
  if (this.lifespan < 0) {
    return true;
  } else {
    return false;
  }
};

var ParticleSystem = function(position) {
  this.origin = position.get();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() {
  for (var i = this.particles.length-1; i >= 0; i--) {
    var p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};
}