
var feature, circles;
var rShoeScale, rSweatScale, rWatchScale;
var radMin = 1;
var radMax = 30;
var mapRadius = 5;
var transRate = 1000;
var totalMax = [];
var totalMin = [];
var biggestConsumerGoods;
var fewestConsumerGoods;
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
var circleShoes,circleSweats,circleWatches;

var width = $(".today").width();//($(".today").width())/2;
var height = 740;//window.innerHeight;
var w = width;
var h = height;

var duration = 0;

var plotOrtho = true;
var plotMerca = false;
var projection = d3.geo.azimuthal()
    .scale(330)
    .origin([-71.03,42.37])
    .mode("orthographic")
    .translate([width/2, 370]);

var projection2 = d3.geo.mercator()
    .scale(870)
    .translate([width/2, 410]);

var circle = d3.geo.greatCircle()
    .origin(projection.origin());

// TODO fix d3.geo.azimuthal to be consistent with scale
var scale = {
  orthographic: 380,
  mercator: 870,
  stereographic: 380,
  gnomonic: 380,
  equidistant: 380 / Math.PI * 2,
  equalarea: 380 / Math.SQRT2
};

var radMap = 10;
var path = d3.geo.path()
    .projection(projection)
      .pointRadius( function(d,i) {
        return d.radius;
      });
var path2 = d3.geo.path()
    .projection(projection2)
      .pointRadius( function(d,i) {
        return d.radius;
      });

var keySVG = d3.select("#forKey").append("svg:svg")
    .attr("width", 200)
    .attr("height", 200);

var svg = d3.select(".today").append("svg:svg")
    .attr("width", width)
    .attr("height", height);

    if(plotOrtho){
      console.log("yes")
      svg
          .on("mousedown", mousedown);
    }else{
      svg
          .on("mousedown", null);
      console.log("no")
    }

      // Setup zoom behavior:
            var zoom = d3.behavior.zoom(true)
                .scale( projection.scale() )
                .scaleExtent([330, 800])
                .on("zoom", globeZoom);
            var zoom2 = d3.behavior.zoom(true)
                .scale( projection2.scale() )
                .scaleExtent([830,1200])
                .on("zoom", globeZoom);
    if(plotOrtho){
            console.log("yes zoom")
       svg.call(zoom)
              .on('dblclick.zoom', null);
    }else{
       // svg.call(zoom2)
       //        .on('dblclick.zoom', null);
    }
  //Create a base circle: (could use this to color oceans)
    var backgroundCircle = svg.append("svg:circle")
        .attr('cx', width/2)
        .attr('cy', height/2)
        .attr('r', 0)
        .attr('class', 'geo-globe')
        .attr("fill", '#ffffff')
        .attr("opacity",0)
  // Having defined the projection, update the backgroundCircle radius:
  backgroundCircle.transition().duration(3000).attr("opacity",1).attr('r', projection.scale() );

    
d3.json("world-countries.json", function(collection) {
  feature = svg.selectAll("path")
      .data(collection.features)
    .enter().append("svg:path")
    .attr("class","land")
      .attr("d", clip);
});












d3.json("https://spreadsheets.google.com/feeds/list/1keb8euNdd3hWLnO7DMcPdtBIHQp431aL1wvo-MA78T0/of27ky1/public/values?alt=json",function(error,data){
  console.log(data);
  
  dataIs = data.feed.entry;

  if(dataIs.length>0){

    for (i=0; i<dataIs.length-1; i++){
      watchesTotal.push(parseInt(dataIs[i].gsx$watches.$t));
      sweatersTotal.push(parseInt(dataIs[i].gsx$sweaters.$t));
      shoesTotal.push(parseInt(dataIs[i].gsx$shoes.$t));
      cityNames.push(dataIs[i].gsx$_cn6ca.$t);

// cityLatLon.push({})
      cityXY.push({city:dataIs[i].gsx$_cn6ca.$t, x:dataIs[i].gsx$latitude.$t,y:dataIs[i].gsx$longitude.$t, sweaters:sweatersTotal[i],shoes:shoesTotal[i],watches:watchesTotal[i]}); 
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
    .range([lMargin+35,w-lMargin/2+16])

  xNameScale = d3.scale.ordinal()
    .domain(cityNames)
    .rangeRoundBands([lMargin+5,w-lMargin/2])

  yScale = d3.scale.linear()
    .domain([fewestConsumerGoods-200,biggestConsumerGoods+200])
    // .range([h-lMargin-5, lMargin*2]);
    .range([(h-lMargin*1.6),lMargin/2])
// (-lMargin/1.6)
  xAxis = d3.svg.axis()
            .scale(xNameScale)
            .orient("bottom")
            .ticks(cityNames.length); 


  yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left")
            .ticks(10);

      svg.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(0," + (h - lMargin*2) + ")")
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
          .attr("transform", "translate(" + lMargin + "," + 0 + ")")
          .call(yAxis)  
      d3.selectAll(".axis").style("opacity",0);
      d3.selectAll("path.domain").style("opacity",0);

    rShoeScale = d3.scale.linear()
      .domain([shoesMin,shoesMax])
      .range([radMin, radMax]);      
              
    rSweatScale = d3.scale.linear()
      .domain([sweatersMin, sweatersMax])
      .range([radMin, radMax]);      

    rWatchScale = d3.scale.linear()                     
      .domain([watchesMin,watchesMax])
      .range([radMin, radMax]);   
})

var commodities = [{com:"Shoes",col:"red"},{com:"Sweaters",col:"blue"},{com:"Watches",col:"yellow"}];
var key, keyCirc;
key = keySVG.selectAll("text")
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
keyCirc = keySVG.selectAll("keyCircles")
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
      sweaters();
      d3.select(this).transition().attr("fill","none")
    }
    if(d.com=="Watches"){
      watches();
      d3.select(this).transition().attr("fill","none")
    }
  })
function shoes(){
      // Create the element group to mark individual locations:
var locations = svg.append('svg:g')
    .attr('id', 'locations');
 // Plot the positions on the map:
 if(plotOrtho){
  circleShoes = locations.selectAll("path")
      .data(cityXY)
      .enter().append("svg:path")
    .datum(function(d) {
        if(isNaN(d.shoes)){
          return {type: "Point", coordinates: [d.y, d.x], radius:0 };       
        }
        else{
          return {type: "Point", coordinates: [d.y, d.x], radius:rShoeScale(d.shoes) };
        }
    })     
      .attr("class", "point-shoes")
      .attr("d", clip);
    }
    if(plotMerca){
        circleShoes = locations.selectAll("path")
            .data(cityXY)
            .enter().append("svg:path")
          .datum(function(d) {
              if(isNaN(d.shoes)){
                return {type: "Point", coordinates: [d.y, d.x], radius:0 };       
              }
              else{
                return {type: "Point", coordinates: [d.y, d.x], radius:rShoeScale(d.shoes) };
              }
          })     

            .attr("class", "point-shoes")
            .attr("d",path2)      
    }
}

function sweaters(){
      // Create the element group to mark individual locations:
var locations = svg.append('svg:g')
    .attr('id', 'locations');
 // Plot the positions on the map:
if(plotOrtho){
  circleSweats = locations.selectAll("path")
      .data(cityXY) 
      .enter().append("svg:path")
    .datum(function(d) {
       return {type: "Point", coordinates: [d.y, d.x], radius:rSweatScale(d.sweaters)};
    })     
      .attr("class", "point-sweaters")
      .attr("d", clip);
      }
      if(plotMerca){
        circleSweats = locations.selectAll("path")
            .data(cityXY) 
            .enter().append("svg:path")
          .datum(function(d) {
             return {type: "Point", coordinates: [d.y, d.x], radius:rSweatScale(d.sweaters)};
          })     
            .attr("class", "point-sweaters")
            .attr("d", path2);        
      }  
}
function watches(){
      // Create the element group to mark individual locations:
var locations = svg.append('svg:g')
    .attr('id', 'locations');
 // Plot the positions on the map:
if(plotOrtho){
  circleWatches = locations.selectAll("path")
      .data(cityXY)
      .enter().append("svg:path")
    .datum(function(d) {
       return {type: "Point", coordinates: [d.y, d.x], radius: rWatchScale(d.watches)};
    })     
      .attr("class", "point-watches")
      .attr("d", clip);  
    }
    if(plotMerca){
      circleWatches = locations.selectAll("path")
          .data(cityXY)
          .enter().append("svg:path")
        .datum(function(d) {
           return {type: "Point", coordinates: [d.y, d.x], radius: rWatchScale(d.watches)};
        })     
          .attr("class", "point-watches")
          .attr("d", path2);       
    }
}




d3.select(window)
    .on("mousemove", mousemove)
    .on("mouseup", mouseup);

d3.select("select").on("change", function() {
  projection.mode(this.value).scale(scale[this.value]);
  refresh(duration);
});


var m0,
    o0;

function mousedown() {
  if(plotOrtho){
  m0 = [d3.event.pageX, d3.event.pageY];
  o0 = projection.origin();
  } else{}
  d3.event.preventDefault();
}

function mousemove() {
  if(plotOrtho){
    if (m0) {
      var m1 = [d3.event.pageX, d3.event.pageY],
          o1 = [o0[0] + (m0[0] - m1[0]) / 8, o0[1] + (m1[1] - m0[1]) / 8];
      projection.origin(o1);
      circle.origin(o1)
      refresh(duration);
    }
  }else{ }
}

function mouseup() {
  if (m0) {
    mousemove();
    m0 = null;
  }
}
function globeZoom() {
  if (d3.event) {
    if(plotOrtho){
      var _scale = d3.event.scale;

      projection.scale(_scale);
      refresh(0)
      backgroundCircle.transition().duration(1).attr('r', _scale);

    } // end IF
    else{
     // var _scale2 = d3.event.scale;

     //  projection2.scale(_scale2);
     //  refresh(0)
     //  backgroundCircle.transition().duration(1).attr("opacity",0);
    }
  }
};
function refresh(duration) {
  if(plotOrtho){
        feature.transition()
          .duration(duration)
          .attr('d', clip);
        if(circleShoes){
        circleShoes.transition()
          .duration(duration)
          .attr('d', clip);
        }
        if(circleSweats){
        circleSweats.transition()
          .duration(duration)
          .attr('d', clip);
        }
        if(circleWatches){
        circleWatches.transition()
          .duration(duration)
          .attr('d', clip);     
          }     
      }
  else {
        feature.attr('d', path2);
        if(circleShoes){
          circleShoes.attr('d', path2);
        }
        if(circleSweats){
        circleSweats.attr('d', path2);
      }
        if(circleWatches){
        circleWatches.attr('d', path2);
      }
  }; // end IF/ELSE
}

function clip(d) {
  return path(circle.clip(d));
}

 $("#mercator").on("click", function(){
   plotMerca = true;
  plotOrtho = false;   
    plotMercator();

 })
 $("#orthographic").on("click", function(){
  plotMerca = false;
  plotOrtho = true;
    plotOrthographic();
 })
 $("#scatterPlot").on("click", function(){
    plotScatterplot();
 })





 function plotMercator(){
  hideScatter();
              svg.selectAll(".geo-globe").transition().attr("opacity",0)
            // map.selectAll(".land").transition().attr("d",path2)
            svg.selectAll("path").transition().attr("d", path2);
         if(circleShoes){
            circleShoes.transition().attr('d', path2); 
          }
          if(circleSweats){
            circleSweats.transition().attr('d', path2); 
          }
          if(circleWatches){
            circleWatches.transition().attr('d', path2);
          }
  showLand(); 
}
function plotOrthographic(){
  hideScatter();
            svg.selectAll(".geo-globe").transition().attr("opacity",1)
            // map.selectAll(".land").transition().attr("d",path)
            svg.selectAll("path").transition().attr("d", path);
          if(circleShoes){
            circleShoes.transition().attr('d', path); 
          }
          if(circleSweats){
            circleSweats.transition().attr('d', path); 
          }
          if(circleWatches){
            circleWatches.transition().attr('d', path); 
          }
  showLand();
}
function plotScatterplot(){
hideMap();
            plotWatch();
            plotSweats();
            plotShoes();
            d3.selectAll("path.domain").transition().style("opacity",1);            
            d3.selectAll(".axis").style("opacity",1);
      svg.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(0," + (h - lMargin*2) + ")")
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
          .attr("transform", "translate(" + lMargin + "," + 0 + ")")
          .call(yAxis)  
}
function hideScatter(){
            d3.selectAll("path.domain").remove();          
            d3.selectAll(".axis").remove();
            d3.selectAll(".watches, .sweaters, .shoes").attr("opacity",0);
}
function hideMap(){
            // map.selectAll(".land").attr("opacity",0)
            svg.selectAll("path").attr("opacity",0)
            svg.selectAll(".geo-globe").transition().attr("opacity",0)

        if (circleShoes){
            circleShoes.style("opacity",0)
          }
        if (circleSweats){
            circleSweats.style("opacity",0) 
          }
        if(circleWatches){
            circleWatches.style("opacity",0) 
          }
}








function showLand(){
            // map.selectAll(".land").attr("opacity",1)
            svg.selectAll("path").attr("opacity",1)
            svg.selectAll(".geo-globe").attr("opacity",1)

        if (circleShoes){
            circleShoes.style("opacity",.5)
          }
        if (circleSweats){
            circleSweats.style("opacity",.5) 
          }
        if(circleWatches){
            circleWatches.style("opacity",.5)
          }
}
function plotShoes(){
cityGroups = svg.selectAll("shoes")
    .data(cityXY)
    .enter()
    .append("circle")
    .attr("class","shoes")
    .attr("cx",0)
    .attr("cy",0)
    .attr("r",1)
    .attr("fill", "red")
    .attr("opacity",function(d,i){
          if(isNaN(cityXY[i].shoes)){
            return 0;
          } else{
            return .5;
          }
    })
    .attr("transform", function(d,i) {
          // var x = xScale(i);
          var x = xNameScale(d.city)+26;

          if(isNaN(cityXY[i].shoes)){
            var y = yScale(0);
          }else{
          var y = yScale(d.shoes);
        }
          // console.log("in here")
          return "translate(" + x + "," + y + ")";
    })
    .transition()
    .duration(2000)
    .attr("r",5)
} 
function plotSweats(){
    sweaterGroups = svg.selectAll("sweaters")
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
          var x = xNameScale(d.city)+26;
          var y = yScale(d.sweaters);
        return "translate(" + x + "," + y + ")";
    })
    .transition()
    .duration(2000)
    .attr("r", 5)
}             
function plotWatch(){
    watchGroups = svg.selectAll("watches")
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
          var x = xNameScale(d.city)+26;
          var y = yScale(d.watches);
          return "translate(" + x + "," + y + ")";
      })
    .transition()
    .duration(2000)
    .attr("r", 5)
} 