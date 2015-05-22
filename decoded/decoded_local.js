// feed url: https://spreadsheets.google.com/feeds/list/1keb8euNdd3hWLnO7DMcPdtBIHQp431aL1wvo-MA78T0/of27ky1/public/values?alt=json
// alternate feed url: https://docs.google.com/spreadsheets/d/1keb8euNdd3hWLnO7DMcPdtBIHQp431aL1wvo-MA78T0/export?gid=910705171&format=csv

var w = $(".today").width();
var h = window.innerHeight - 100;

var width = w,
    height = h;

var b = 0;
var rScale, rSweatScale, rWatchScale;

var svg = d3.select(".today")
          .append("svg")
          .attr("width", width)
          .attr("height", height);

var projection = d3.geo.orthographic()
//    .center([0, 5 ])
//    .scale(100)
//    .rotate([0,0]);

var path = d3.geo.path()
    .projection(projection);

var g = svg.append("g");
var cityLat = [];
var cityLon = [];
var shoesTotal = [];
var watchesTotal = [];
var sweatersTotal = [];

var shoesMax, shoesMin, watchesMin, watchesMax, sweatersMin, sweatersMax;

d3.csv("retail_data.csv",function(error,data){
  
  // var dataIs = data.feed.entry;
  console.log(data);

  if(dataIs.length>0){
    for (i=0; i<dataIs.length-1; i++){
      watchesTotal.push(parseInt(dataIs[i].gsx$watches.$t));
      sweatersTotal.push(parseInt(dataIs[i].gsx$sweaters.$t));
      shoesTotal.push(parseInt(dataIs[i].gsx$shoes.$t));

      cityLat.push(dataIs[i].gsx$latitude.$t); 
      cityLon.push(dataIs[i].gsx$longitude.$t);

      sweatersTotal = sweatersTotal.sort(function(a, b){return a-b});
      shoesTotal = shoesTotal.sort(function(a, b){return a-b});
      watchesTotal = watchesTotal.sort(function(a, b){return a-b});
    
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
})
// append a group to the svg to hold the map
var map = svg.append("g")
      .attr("class","map");
// load and display the World
d3.json("world-topo-110m.json", function(error, world) {
  // append landforms from world-110m.json
  map.append("path")
    .datum(topojson.feature(world, world.objects.land))
    .attr("class", "land")
    .attr("d", path);
});

function draw(cityLat) {
    // Make a group for each city
  cityGroups = map.append("g")
    .attr("class", "cities")
    .selectAll("g")
    .data(cityLat)
    .enter()
    .append("circle")
    .attr("transform", function(d,i) {
      var x = projection([cityLon[i], d])[0];
      var y = projection([cityLon[i], d])[1];
      return "translate(" + x + "," + y + ")";
    })
    .attr("cx",0)
    .attr("cy",0)
    .attr("r",1)
    .style("fill", "red")
    .attr("opacity",.5)
    .transition()
    .duration(2000)
    .attr("r", function(d,i){
      console.log(rScale(shoesTotal[i])+"shoes");
      // return rScale(shoesTotal[i]);
    })
 }
            
            
            
function sweat(cityLat){       
  sweaterGroups = map.append("g")
    .attr("class", "sweaters")
    .selectAll("g")
    .data(cityLat)
    .enter()
    .append("circle")
    .attr("transform", function(d,i) {
      var x = projection([cityLon[i], d])[0];
      var y = projection([cityLon[i], d])[1];
      return "translate(" + x + "," + y + ")";
    })
    .attr("cx",0)
    .attr("cy",0)
    .attr("r",1)
    .style("fill", "blue")
    .attr("opacity",.5)
    .transition()
    .duration(2000)
    .attr("r", function(d,i){
            console.log(rSweatScale(sweatersTotal[i])+"sweaters");
      return rSweatScale(sweatersTotal[i]);
    }) 
 }
            
            
            
function watches(cityLat){       
    watchGroups = map.append("g")
      .attr("class", "watches")
      .selectAll("g")
      .data(cityLat)
      .enter()
      .append("circle")
      .attr("transform", function(d,i) {
        var x = projection([cityLon[i], d])[0];
        var y = projection([cityLon[i], d])[1];
        return "translate(" + x + "," + y + ")";
      })
      .attr("cx",0)
      .attr("cy",0)
      .attr("r",1)
      .style("fill", "yellow")
      .attr("opacity",.5)
          .transition()
          .duration(2000)
          .attr("r", function(d,i){
      console.log(rWatchScale(watchesTotal[i])+"watches");
            return rWatchScale(watchesTotal[i]);
          }) 
} 

$( document ).ready(function() {
  $("body").keypress(function(){
      (b+=1);
      if (b==2){   

        rScale = d3.scale.linear()
          .domain([shoesMin,shoesMax])
          .range([5, 20]);      
              
        rSweatScale = d3.scale.linear()
          .domain([sweatersMin, sweatersMax])
          .range([5, 20]);

        rWatchScale = d3.scale.linear()                     
          .domain([watchesMin,watchesMax])
          .range([5, 20]); 
        
        draw(cityLat);
      }
      if (b==3){
        sweat(cityLat);
      }
      if (b==4){
        watches(cityLat);
      }
  })
})
