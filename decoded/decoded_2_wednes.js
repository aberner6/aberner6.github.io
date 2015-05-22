// feed url: https://spreadsheets.google.com/feeds/list/1keb8euNdd3hWLnO7DMcPdtBIHQp431aL1wvo-MA78T0/of27ky1/public/values?alt=json
// alternate feed url: https://docs.google.com/spreadsheets/d/1keb8euNdd3hWLnO7DMcPdtBIHQp431aL1wvo-MA78T0/export?gid=910705171&format=csv

var w = $(".today").width();
var h = window.innerHeight - 100;

var width = w,
    height = h;

var b = 0;
var rScale, rSweatScale, rWatchScale;
var radMin = 1;
var radMax = 20;
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

// using natural earth projection
// https://github.com/mbostock/d3/wiki/Geo-Projections
// http://bl.ocks.org/mbostock/4479477

// used to scale mouse domain to rotation range
var scale_angle = d3.scale.linear()
    .domain([-width, width])
    .range([-180, 180]);

// tracks previous values
var prev_x = 0;
var prev_a = 0;
var move;
     //Setup zoom behavior
        // var zoom = d3.behavior.zoom(true)
        //     .translate(projection1.origin())
        //     .scale(projection1.scale())
        //     .scaleExtent([100, 800])
        //     .on("zoom", move);

var svg = d3.select(".today")
          .append("svg")
          .attr("width", width)
          .attr("height", height);

var path = d3.geo.path()
    .projection(projection1);

var g = svg.append("g");
var cityXY = [];
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
    .range([lMargin+5,w-lMargin/2])

  xNameScale = d3.scale.ordinal()
    .domain(cityNames)
    .rangeRoundBands([lMargin+5,w-lMargin/2])

  yScale = d3.scale.linear()
    .domain([fewestConsumerGoods,biggestConsumerGoods])
    .range([h-lMargin-5, lMargin]);

  xAxis = d3.svg.axis()
            .scale(xNameScale)
            .orient("bottom")
            .ticks(cityNames.length); 


  yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left")
            .ticks(5);
})
// append a group to the svg to hold the map
var map = svg.append("g")
      .attr("class","map");
          // .call(zoom)
          // .on("dblclick.zoom", null);
// load and display the World
d3.json("//assets.decoded.com/data/world-topo-coarse.json", function(error, world) {

// d3.json("world-topo-110m.json", function(error, world) {
  // append landforms from world-110m.json
  map.append("path")
    .datum(topojson.feature(world, world.objects.land))
    .attr("class", "land")
    .attr("fill","white")
    .attr("d", path);
});

var runOnce = false;
function shoes() {
  if(!runOnce){
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
        // console.log(d.city);
        if(d.x!="#ERROR!"&& launchWorld){
          var x = projection1([d.y, d.x])[0];
          var y = projection1([d.y,d.x])[1];
          return "translate(" + x + "," + y + ")";
        } else{
          var x = xNameScale(d.city);
          var y = yScale(d.shoes);
          // console.log("in here")
          return "translate(" + x+40 + "," + y + ")";
      }
    })
    .transition()
    .duration(2000)
    .attr("r", function(d,i){
        if(d.x!="#ERROR!"&& launchWorld){
         return rScale(shoesTotal[i]);
        } else{
        return 5;
       }
    })
    runOnce=true;
  }
  if(runOnce){
    d3.selectAll(".shoes")
    .transition()
    .attr("transform", function(d,i) {
      // console.log(d.city);
      if(d.x!="#ERROR!"&& launchWorld){
        var x = projection1([d.y, d.x])[0];
        var y = projection1([d.y,d.x])[1];
        return "translate(" + x + "," + y + ")";
    } else{
        var x = xNameScale(d.city);
        var y = yScale(shoesTotal[i]);
        return "translate(" + x + "," + y + ")";
    }
    })
    .transition()
    .duration(2000)
    .attr("r", function(d,i){
      if(d.x!="#ERROR!"&& launchWorld){
       return rScale(shoesTotal[i]);
     } else{
      return 5;
     }
    })
  }
 }
            
            
var runSweats = false;
function sweat(incoming){       
  if(!runSweats){
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
      if(d.x!="#ERROR!"&& launchWorld){
        var x = projection1([d.y, d.x])[0];
        var y = projection1([d.y,d.x])[1];
        return "translate(" + x + "," + y + ")";
    } else{
        var x = xScale(i);
        var y = yScale(sweatersTotal[i]);
        return "translate(" + x + "," + y + ")";
    }
    })
    .transition()
    .duration(2000)
    .attr("r", function(d,i){
      if(d.x!="#ERROR!"&& launchWorld){
          return rSweatScale(sweatersTotal[i]);
        }
      else{
      return 5;
     }
    })
    runSweats = true;
  } 
  if(runSweats){
    d3.selectAll(".sweaters")
    .transition()
    .attr("transform", function(d,i) {
      // console.log(d.city);
      if(d.x!="#ERROR!"&& launchWorld){
        var x = projection1([d.y, d.x])[0];
        var y = projection1([d.y,d.x])[1];
        return "translate(" + x + "," + y + ")";
    } else{
        var x = xScale(i);
        var y = yScale(sweatersTotal[i]);
        return "translate(" + x + "," + y + ")";
    }
    })
    .transition()
    .duration(2000)
    .attr("r", function(d,i){
      if(d.x!="#ERROR!"&& launchWorld){
       return rScale(sweatersTotal[i]);
     } else{
      return 5;
     }
    })
  }
 }
            
            
var runWatch = false;   
function watches(){ 
  if(!runWatch){  
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
      if(d.x!="#ERROR!"&& launchWorld){
        var x = projection1([d.y, d.x])[0];
        var y = projection1([d.y,d.x])[1];
        return "translate(" + x + "," + y + ")";
      } else{
          var x = xScale(i);
          var y = yScale(watchesTotal[i]);
          return "translate(" + x + "," + y + ")";
        }
      })
    .transition()
    .duration(2000)
    .attr("r", function(d,i){
      if(d.x!="#ERROR!" && launchWorld){
        return rWatchScale(watchesTotal[i]);
      }
      else {
        return 5;
      }
     })
     runWatch = true; 
  }
  if(runWatch){
    d3.selectAll(".watches")
        .transition()
        .attr("transform", function(d,i) {
          // console.log(d.city);
          if(d.x!="#ERROR!"&& launchWorld){
            var x = projection1([d.y, d.x])[0];
            var y = projection1([d.y,d.x])[1];
            return "translate(" + x + "," + y + ")";
        } else{
            var x = xScale(i);
            var y = yScale(watchesTotal[i]);
            return "translate(" + x + "," + y + ")";
        }
        })
        .transition()
        .duration(2000)
        .attr("r", function(d,i){
          if(d.x!="#ERROR!"&& launchWorld){
           return rScale(watchesTotal[i]);
         } else{
          return 5;
         }
        })
    }
} 



var a = d3.scale.linear()
    .domain([0, width])
    .range([-180, 180]);

var c = d3.scale.linear()
    .domain([0, height])
    .range([90, -90]);

var circsReady = 0;
$( document ).ready(function() {

  $("body").keypress(function(){
  b+=1; 
  
  if (b==1){
    rScale = d3.scale.linear()
      .domain([shoesMin,shoesMax])
      .range([radMin, radMax]);      
              
    rSweatScale = d3.scale.linear()
      .domain([sweatersMin, sweatersMax])
      .range([radMin, radMax]);      

    rWatchScale = d3.scale.linear()                     
      .domain([watchesMin,watchesMax])
      .range([radMin, radMax]);   
    launchWorld = !launchWorld;
    console.log(launchWorld+"launchWorld")
    makeWorld();
    if(!launchWorld){
    console.log(b);

      shoes();
      sweat();
      watches();
    }
  } 


    if(b==2){          
      shoes();
    }
    if (b==3){
      sweat();
    }
    if (b==4){
      watches();
    }
    function makeWorld(){
        if(dataIs[0].gsx$latitude.$t!="#ERROR!" && launchWorld){
          d3.selectAll("path")
            .transition()
            .duration(transRate)
            .attr("fill","gray");
        } else{
          d3.selectAll("path")
            .transition()
            .duration(transRate/2)
            .attr("fill","white");    
        }
      if(!launchWorld){
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
        }
        else{
          d3.selectAll(".axis, .xAxis").remove();
        }
    }




      if(b==5){
        path = d3.geo.path()
          .projection(projection2);

        map.selectAll("path").attr("d", path);
        map.selectAll(".land").transition().duration(transRate).attr("d",path)

        d3.selectAll("circle")
          .transition()
          .duration(transRate)
          .attr("transform", function(d,i) {
                    var x = projection2([d.y, d.x])[0];
                    var y = projection2([d.y, d.x])[1];
                    return "translate(" + x + "," + y + ")";
            })
      }
      if(b==6){
        path = d3.geo.path()
          .projection(projection1);
        
        map.selectAll(".land").transition().duration(transRate).attr("d",path)
        map.selectAll("path").attr("d", path);

        d3.selectAll("circle")
          .transition()
          .duration(transRate)
          .attr("transform", function(d,i) {
            // console.log(d);
                    var x = projection1([d.y, d.x])[0];
                    var y = projection1([d.y, d.x])[1];
                    return "translate(" + x + "," + y + ")";
            })
          .each("end", function(){
            b=0;
          })
      }
  })

// svg.on("mousemove", function() {
//   var p = d3.mouse(this);
//   projection1.rotate([a(p[0]), c(p[1])]);
//   // svg.selectAll("path").attr("d", path);
        
//         map.selectAll(".land").transition().attr("d",path)

//         d3.selectAll("circle")
//           .transition()
//           .attr("transform", function(d,i) {
//             // console.log(d);
//                     var x = projection1([d.y, d.x])[0];
//                     var y = projection1([d.y, d.x])[1];
//                     return "translate(" + x + "," + y + ")";
//             })  
// });

 // add ability to update projection
    svg.on("mousedown", function() {
        drag = true;
        prev_x = d3.mouse(this)[0];
    });

    svg.on("mouseup", function() {
        drag = false;
    });

 svg.on("mousemove", function() {
        if (drag) {
            curr_x = d3.mouse(this)[0];
            curr_a = prev_a + scale_angle(curr_x - prev_x);
            prev_x = curr_x;
            prev_a = curr_a;

            projection1.rotate([curr_a, 0]);
            update();
        }
    });

// move = function(){
//     if(d3.event){
//       var scale = d3.event.scale;
//       projection1.scale(scale * 3);

//       update();
// }
// }

function update() {
//   // svg.selectAll("path").attr("d", path);
        
      map.selectAll(".land").transition().attr("d",path)
      map.selectAll("path").attr("d", path);
        //Redraw all items with new projections
            d3.selectAll("circle")
              .transition()
              .attr("transform", function(d,i) {
                        var x = projection1([d.y, d.x])[0];
                        var y = projection1([d.y, d.x])[1];
                        return "translate(" + x + "," + y + ")";
                })
}

})
