// feed url: https://spreadsheets.google.com/feeds/list/1keb8euNdd3hWLnO7DMcPdtBIHQp431aL1wvo-MA78T0/of27ky1/public/values?alt=json
// alternate feed url: https://docs.google.com/spreadsheets/d/1keb8euNdd3hWLnO7DMcPdtBIHQp431aL1wvo-MA78T0/export?gid=910705171&format=csv

var w = 600;
var h = window.innerHeight - 100;

var width = w,
    height = h;

var b = 0;
var rScale, rSweatScale, rWatchScale;
var radMin = 1;
var radMax = 100;
var mapRadius = 5;
var transRate = 1000;
var totalMax = [];
var totalMin = [];
var biggestConsumerGoods;
var fewestConsumerGoods;

var projection1 = d3.geo.orthographic()
    .scale(300)
    .center([0, 5 ])
    .translate([width / 2, height / 2])
    .clipAngle(90);

var projection2 = d3.geo.mercator()
    .scale(100)
    .translate([width / 2, height / 2])
   .center([0, 5 ])
//    .rotate([0,0]);
var drag = false;


// used to scale mouse domain to rotation range
var scale_angle = d3.scale.linear()
    .domain([-width, width])
    .range([-180, 180]);

// tracks previous values
var prev_x = 0;
var prev_a = 0;
var move;

var svg = d3.select(".today")
          .append("svg")
          .attr("width", width)
          .attr("height", height);

var path = d3.geo.path()
    .projection(projection1)
      .pointRadius( function(d,i) {
        return d.radius;
      });
var path2 = d3.geo.path()
    .projection(projection2)
      .pointRadius( function(d,i) {
        return d.radius;
      });

var lambda = d3.scale.linear()
          .domain([0, width])
          .range([-180, 180]);

var phi = d3.scale.linear()
          .domain([0, height])
          .range([90, -90]);

var  circle = d3.geo.circle();

var cityXY = [];
var latLon = [];
var shoesTotal = [];
var watchesTotal = [];
var sweatersTotal = [];
var cityNames = [];
var lMargin = 100;

var xScale, yScale;
var shoesMax, shoesMin, watchesMin, watchesMax, sweatersMin, sweatersMax;
var dataIs;
var xAxis, yAxis;
var launchWorld = false;

// The longitudinal line which goes around the earth and passes through the origin forms a 'great circle'
// var greatCircle = d3.geo.greatCircle()
//   .origin( projection1.origin() );
// // Define the function which will 'clip' canvas elements which appear on the backside of the globe. Otherwise, these elements 'show through'
// var clip = function(d) {
//     return path( greatCircle.clip(d) );
// }; // end FUNCTION clip(d)

var circleShoes,circleSweats,circleWatches;


d3.json("https://spreadsheets.google.com/feeds/list/1keb8euNdd3hWLnO7DMcPdtBIHQp431aL1wvo-MA78T0/of27ky1/public/values?alt=json",function(error,data){
  console.log(data);
  
  dataIs = data.feed.entry;

  if(dataIs.length>0){



    for (i=0; i<dataIs.length-1; i++){
      watchesTotal.push(parseInt(dataIs[i].gsx$watches.$t));
      sweatersTotal.push(parseInt(dataIs[i].gsx$sweaters.$t));
      shoesTotal.push(parseInt(dataIs[i].gsx$shoes.$t));
      cityNames.push(dataIs[i].gsx$_cn6ca.$t);
      // cityLon.push(dataIs[i].gsx$longitude.$t);

      // sweatersTotal = sweatersTotal.sort(function(a, b){return a-b});
      // shoesTotal = shoesTotal.sort(function(a, b){return a-b});
      // watchesTotal = watchesTotal.sort(function(a, b){return a-b});

      cityXY.push({city:dataIs[i].gsx$_cn6ca.$t, x:dataIs[i].gsx$latitude.$t,y:dataIs[i].gsx$longitude.$t, sweats:sweatersTotal[i],shoes:shoesTotal[i],watch:watchesTotal[i]}); 
      shoesMax = d3.max(shoesTotal, function(d) {
        return d;
      });
      shoesMin = d3.min(shoesTotal, function(d) {
        return d;
      }); 

      sweatersMax = d3.max(sweatersTotal, function(d) {
        return d;
      });
      sweatersMin = d3.min(sweatersTotal, function(d) {
        return d;
      });     
        
      watchesMax = d3.max(watchesTotal, function(d) {
        return d;
      });
      watchesMin = d3.min(watchesTotal, function(d) {
        return d;
      });  


    }
  }
  totalMax.push(sweatersMax, shoesMax, watchesMax);
  totalMax = totalMax.sort(function(a, b){return a-b});
  biggestConsumerGoods = d3.max(totalMax, function(d) {
    return d;
  });
  totalMin.push(sweatersMin, shoesMin, watchesMin);
  totalMin = totalMin.sort(function(a, b){return a-b});
  fewestConsumerGoods = d3.min(totalMin, function(d) {
    return d;
  });
  xScale = d3.scale.linear()
    .domain([0,dataIs.length-1])
    .range([lMargin+35,w-lMargin/2+24])

  xNameScale = d3.scale.ordinal()
    .domain(cityNames)
    .rangeRoundBands([lMargin+5,w-lMargin/2])

  yScale = d3.scale.linear()
    .domain([fewestConsumerGoods,biggestConsumerGoods])
    .range([h-lMargin-5, lMargin*2]);

  xAxis = d3.svg.axis()
            .scale(xNameScale)
            .orient("bottom")
            .ticks(cityNames.length); 


  yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left")
            .ticks(5);

      svg.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(0," + (h - lMargin) + ")")
          .call(xAxis)
          .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d) {
                return "rotate(-65)" 
                });

      svg.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(" + lMargin + ",0)")
          .call(yAxis)  
      d3.selectAll(".axis").style("opacity",0)
})
function newTransform(d,i){ 
  d.x = xScale(i);
  d.y = height; //not links[i].cites
  return "translate(" + d.x+ "," + d.y + ")";
} 
// append a group to the svg to hold the map
var map = svg.append("g")
      .attr("class","map");

var commodities = [{com:"Shoes",col:"red"},{com:"Sweaters",col:"blue"},{com:"Watches",col:"yellow"}];
// var commodColors = ["red","blue","yellow"]
var key, keyCirc;
key = svg.selectAll("text")
  .data(commodities)
  .enter().append("text")
  .attr("class","keyText")
  .attr("x",37)
  .attr("y",function(d,i){
    return 26+i*30;
  })
  .text(function(d){
    return d.com;
  })
keyCirc = svg.selectAll("keyCircles")
  .data(commodities)
  .enter().append("circle")
  .attr("class","keyCircles")
  .attr("cx", 22)
  .attr("cy", function(d,i){
    return 22+i*30;
  })
  .attr("r", 5)
  .attr("fill",function(d,i){
    return d.col;
  })
  .attr("stroke",function(d,i){
    return d.col;
  })
  .attr("opacity",.5)
  .on("click",function(d,i){
    if(d.com=="Shoes"){
      shoes();
      d3.select(this).transition().attr("fill","none")
    }
    if(d.com=="Sweaters"){
      sweat();
      d3.select(this).transition().attr("fill","none")
    }
    if(d.com=="Watches"){
      watches();
      d3.select(this).transition().attr("fill","none")
    }
    console.log("WHATSUP")
  })
          // .call(zoom)
          // .on("dblclick.zoom", null);
// load and display the World
d3.json("//assets.decoded.com/data/world-topo-coarse.json", function(error, world) {

// d3.json("world-topo-110m.json", function(error, world) {
  // append landforms from world-110m.json
  map.append("path")
    .datum(topojson.feature(world, world.objects.land))
    .attr("class", "land")
    .attr("fill","gray")
    .attr("d", path)
    // .attr('d', clip); // for an azimuthal projection, we need to remove the elements on the backside of the globe.

});

var runOnce = false;
function shoes(){
  if(!runOnce){
 // Plot the positions on the map:
  circleShoes = svg.selectAll("path.point")
      .data(cityXY)
      .enter().append("path")
    .datum(function(d) {
       return {type: "Point", coordinates: [d.y, d.x], radius: mapRadius};
    })     
      .attr("class", "point-shoes")
          .attr("d", path);
  }
}
function plotShoes(){
cityGroups = map.selectAll("shoes")
    .data(cityXY)
    .enter()
    .append("circle")
    .attr("class", "shoes")
    .attr("cx",0)
    .attr("cy",0)
    .attr("r",1)
    .attr("fill", "red")
    .attr("opacity",.5)
    .attr("transform", function(d,i) {
          var x = xScale(i);
          var y = yScale(d.shoes);
          // console.log("in here")
          return "translate(" + x + "," + y + ")";
    })
    .transition()
    .duration(2000)
    .attr("r",5)
}             
            
var runSweats = false;
function sweat(incoming){       
  if(!runSweats){
  circleSweats = svg.selectAll("path.point")
      .data(cityXY)
      .enter().append("path")
      .datum(function(d) { 
       return {type: "Point", coordinates: [d.y, d.x], radius: mapRadius};
      })     
      .attr("class", "point-sweaters")
      .attr("d", path);
    }
}
function plotSweats(){
    sweaterGroups = map.selectAll("sweaters")
    .data(cityXY)
    .enter()
    .append("circle")
    .attr("class", "sweaters")
    .attr("cx",0)
    .attr("cy",0)
    .attr("r",1)
    .attr("fill", "blue")
    .attr("opacity",.5)
    .attr("transform", function(d,i) {
          var x = xScale(i);
          var y = yScale(d.sweats);
        return "translate(" + x + "," + y + ")";
    })
    .transition()
    .duration(2000)
    .attr("r", 5)
} 
            
var runWatch = false;   
function watches(){ 
  if(!runWatch){  
  circleWatches = svg.selectAll("path.point")
      .data(cityXY)
      .enter().append("path")
    .datum(function(d) { 
      // console.log(rWatchScale(d.watch))
       return {type: "Point", coordinates: [d.y, d.x], radius: mapRadius};
    })     
      .attr("class", "point-watches")
      .attr("d", path);
  }
}
function plotWatch(){
    watchGroups = map.selectAll("watches")
    .data(cityXY)
    .enter()
    .append("circle")
    .attr("class", "watches")
    .attr("cx",0)
    .attr("cy",0)
    .attr("r",1)
    .attr("fill", "yellow")
    .attr("opacity",.5)
    .attr("transform", function(d,i) {
          var x = xScale(i);
          var y = yScale(d.watch);
          return "translate(" + x + "," + y + ")";
      })
    .transition()
    .duration(2000)
    .attr("r", 5)
} 

var a = d3.scale.linear()
    .domain([0, width])
    .range([-180, 180]);

var c = d3.scale.linear()
    .domain([0, height])
    .range([90, -90]);

var circsReady = 0;
$( document ).ready(function() {

 $("#mercator").on("click", function(){
    plotMercator();
 })
 $("#orthographic").on("click", function(){
    plotOrthographic();
 })
 $("#scatterPlot").on("click", function(){
    plotScatterplot();
 })

    rScale = d3.scale.linear()
      .domain([shoesMin,shoesMax])
      .range([radMin, radMax]);      
              
    rSweatScale = d3.scale.linear()
      .domain([sweatersMin, sweatersMax])
      .range([radMin, radMax]);      

    rWatchScale = d3.scale.linear()                     
      .domain([watchesMin,watchesMax])
      .range([radMin, radMax]);   

function plotMercator(){
  hideScatter();
            map.selectAll(".land").transition().attr("d",path2)
            map.selectAll("path").transition().attr("d", path2);
            circleShoes.transition().attr('d', path2); 
            circleSweats.transition().attr('d', path2); 
            circleWatches.transition().attr('d', path2);
  showLand(); 
}
function plotOrthographic(){
  hideScatter();
            map.selectAll(".land").transition().attr("d",path)
            map.selectAll("path").transition().attr("d", path);
            circleShoes.transition().attr('d', path); 
            circleSweats.transition().attr('d', path); 
            circleWatches.transition().attr('d', path); 
  showLand();
}
function plotScatterplot(){
hideMap();
            plotWatch();
            plotSweats();
            plotShoes();
            d3.selectAll(".axis").style("opacity",1);
}
function hideScatter(){
            d3.selectAll(".axis").style("opacity",0);
            d3.selectAll(".watches, .sweaters, .shoes").attr("opacity",0);
}
function hideMap(){
            map.selectAll(".land").attr("opacity",0)
            map.selectAll("path").attr("opacity",0)
            circleShoes.style("opacity",0)
            circleSweats.style("opacity",0) 
            circleWatches.style("opacity",0) 
}
function showLand(){
            map.selectAll(".land").attr("opacity",1)
            map.selectAll("path").attr("opacity",1)
            circleShoes.style("opacity",.5)
            circleSweats.style("opacity",.5) 
            circleWatches.style("opacity",.5)
}

    // Specify a few event handlers to allow globe rotation:
      d3.select(window)
          .on("mousemove", mousemove)
          .on("mouseup", mouseup);

      svg.on('mousedown', mousedown);

      // Setup zoom behavior:
            var zoom = d3.behavior.zoom(true)
                .scale( projection1.scale() )
                .scaleExtent([100, 800])
                .on("zoom", globeZoom);

            svg.call(zoom)
              .on('dblclick.zoom', null);

// MOUSE EVENTS //

var mousePos;

        function mousedown() {

              // Determine mouse pixel coordinates:
          mousePos = [d3.event.pageX, d3.event.pageY];

          // Prevent the default behavior for mouse down events:
          d3.event.preventDefault();

      }; // end FUNCTION mousedown()

      function mousemove() {

          // Has the mouse button been released?
          if (mousePos) {

              var p = d3.mouse(svg[0][0]);
        projection1.rotate([lambda(p[0]), phi(p[1])]);

      map.selectAll(".land").attr("d",path);
      map.selectAll("path").attr("d", path);
              // features.attr('d', path);
            // circles.attr('d', path); 
          };

      }; // end FUNCTION mousemouse()

      function mouseup() {

                // Do we have mouse coordinates? 
          if (mousePos) {

          // Yes, so update the map based on the final mouse coordinates and clear the mouse position:      
              mousemove();
              mousePos = null;

          }; 

      }; // end FUNCTION mouseup()

            // Helper functions //

      function globeZoom() {
          if (d3.event) {
            var _scale = d3.event.scale;

              projection1.scale(_scale);

      map.selectAll(".land").attr("d",path)
      map.selectAll("path").attr("d", path);
              // features.attr('d', path);
            circleShoes.attr('d', path); 
            circleSweats.attr('d', path); 
            circleWatches.attr('d', path); 

          }; // end IF
        };
})
