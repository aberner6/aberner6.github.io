
var dataIs = [];
var innerCircs, outerCircs;
var maxTime, minTime;
function renderData()
{
	minTime = d3.min(data,function(d){
		return d.created_at;
	})
	maxTime = Date.now();
// for(i=0; i<data.length; i++){console.log(d3.min(data[i].created_at))}
	// console.log(minTime);
	var transScale = d3.scale.linear()
		.domain([minTime, maxTime])
		.range([500,3000])
	var trans2Scale = d3.scale.linear()
		.domain([minTime, maxTime])
		.range([500,2000])

	innerCircs = svg.selectAll("innerCircs").data(data);
	outerCircs = svg.selectAll("outerCircs").data(data);

	var now = Date.now();
	var limit = eventWindow;

	outerCircs.enter().append("circle").attr("class","outerCircs")
        .attr("stroke", function(d){
        	// console.log(d.type);
        	// console.log(d.color);
			return d.color;
		})
        .attr("fill","none")
		.attr("r",0)
		.attr("stroke-opacity",0)
		.attr("stroke-width",3)

	innerCircs.enter().append("circle").attr("class","innerCircs")
        .attr("fill", function(d){
			return d.color;
		})
		// .attr("fill","none")
        .attr("stroke", function(d){
			return d.color;
		})
		.attr("stroke-width",1)
		.attr("r",3)
		.attr("opacity",0)
		// .on("mouseover", function(d){
		// 	d3.select(this)
		// 	.transition()
		// 	.attr("r",10)
		// })
		// .on("mouseout", function(d){
		// 	d3.select(this)
		// 	.transition()
		// 	.attr("r",3)
		// })
        .attr("cx", function(d) { return projection(d.projection)[0]; })
        .attr("cy", function(d) { return projection(d.projection)[1]; })
		.transition()
		.duration(function(d){
			return 1000;
			// return transScale(d.created_at)
		})
		.attr("opacity",1)

		// .attr("fill","white")
		// .attr("stroke","white")
 $('.innerCircs').tipsy({ 
        gravity: 's', 
        html: true, 
        title: function() {
          var d = this.__data__;
          // console.log(d)
          return d.strategy;
        }
      });
    outerCircs
        .attr("cx", function(d) { return projection(d.projection)[0]; })
        .attr("cy", function(d) { return projection(d.projection)[1]; })
        // .attr("cx", function(d) { return d.projection[0]; })
        // .attr("cy", function(d) { return d.projection[1]; })
        .transition()
        // .dur
		.attr("stroke-opacity",1)
  .transition()
      .ease("linear")
      .duration(1000)
      .style("stroke-opacity", 1e-6)
      .style("stroke-width", 1)

  //     .ease("linear")
		// .duration(function(d){
		// 	// return 2000;
		// 	return trans2Scale(d.created_at)
		// })
  //     .style("stroke-opacity", 1e-6)
		// .attr("stroke-width",.1)
      .attr("r", 20)
      .remove();

 $('.outerCircs').tipsy({ 
        gravity: 's', 
        html: true, 
        title: function() {
          var d = this.__data__;
          // console.log(d)
          return d.strategy;
        }
      });
		// .transition()
		// .duration(2100)
		// .each("end", function(d,i){
		// 	// d3.select(this)
		// 	// .transition()
		// 	// .duration(2000)
		// 	// .attr("stroke","black")
		// 	// .each("end", function(d,i){
		// 		d3.select(this)	
		// 		.remove();			
		// 	// })
		// })


//these will represent the quantity of AUTH0 so far, for example...
	// strategies[point.strategy].count++;
// console.log(strategies[point.strategy])
	// innerCircs = svg.selectAll("innerCircs").data(data);
	// innerCircs.enter().append("circle").attr("class","innerCircs")
 //        .attr("fill", function(d){
	// 		return d.color;
	// 	})
	// 	// .attr("fill","none")
 //        .attr("stroke", function(d){
	// 		return d.color;
	// 	})
	// 	.attr("stroke-width",1)
	// 	.attr("r",3)
	// 	.attr("opacity",0)


}

function setTimeZone()
{
	var now = new Date();

	lat_tz.forEach(function(d) {
		var hour = now.getHours() - (-1*now.getTimezoneOffset()/60) + d.tz;
		if (hour >= 24) hour -= 24;
		if (hour < 0) hour += 24;
    	d.hour = hour;
		d.day = (hour > 8 && hour < 20);
    });
	var tzs = svg.selectAll("rect").data(lat_tz);
	tzs.enter().append("rect")
		.attr('x',function(e){
			return e.x;
		})
		.attr('y',0)
		.attr('width',function(e){
			return e.width;
		})
		.attr('height',height)
		// .attr('stroke-width','.1')
    .style("stroke-dasharray", "1,4")
		.attr('stroke','darkgray')
		.attr("opacity",.3)

	tzs.attr("fill-opacity", 1)
	.attr("fill","none")

	var yArc1Scale = d3.scale.linear()
		.domain([0,12])
		.range([20,4])
	var yArc2Scale = d3.scale.linear()
		.domain([12,24])
		.range([4,20])

	// var lineAcross = svg.selectAll("lineAcross")
	// lineAcross.append("line")
	// 	.attr('class','lineAcross')
	// 	.attr('stroke', 'white')
	// 	.attr('fill', 'white')	
	// 	.attr("stroke-width",1)	
	// 	.attr("x1",0)
	// 	.attr("y1",20)
	// 	.attr("x2",width)
	// 	.attr("y2",20)

	var tz_hours = svg.selectAll("text.tzh").data(lat_tz);
	tz_hours.enter().append("text")
		.attr('class','tzh')
		.style("text-anchor", "middle")
		.style("font-size", "10px")
		.attr('fill', function(e){
                	if(e.hour==now.getHours()&&(e.day)){
                		return "white";
                	}
                	else{
                		return "gray";
                	}
        })
		.attr("x", function(e){
			return e.x + e.width / 2;
		})
		.attr("y", function(e){
		  return 18
		      //   	if(e.hour<=12){
		      //   		return yArc1Scale(e.hour)+18;
		    		// }
		      //   	if(e.hour>12){
		      //   		return yArc2Scale(e.hour)+18;
		    		// }			
		})
		.attr('opacity', function(e){
                	if(e.hour==now.getHours()&&(e.day)){
                		return 1;
                	}
                	else{
                		return 0;
                	}
        })
        .transition()
        .ease("linear")
        .duration(3000)
        .attr("opacity",1)


	tz_hours.text(function(e){return e.hour;});
var lineData = [];

//if it is daytime, add a sun
// if(	tz_labels.text(function(e){return e.tz;})
            var suns = svg.selectAll("img").data(lat_tz);
                suns.enter()
            	.append("svg:image")
                .attr("xlink:href", "/sunwhite2-01.png")
				.attr("x", function(e){
					return e.x + (e.width / 2)-14;
				})
		        .attr("y", function(e){
		        	"4"
		   //      	if(e.hour<=12){
					// // lineData.push({x:(e.x + (e.width / 2)-12),y:yArc1Scale(e.hour)});
		   //      		return yArc1Scale(e.hour)
		   //  		}
		   //      	if(e.hour>12){
					// // lineData.push({x:(e.x + (e.width / 2)-12),y:yArc2Scale(e.hour)});
		   //      		return yArc2Scale(e.hour)
		   //  		}
		        })
                .attr("width", "28")
                .attr("height", "28")
                .attr("opacity",function(e){
                	if(e.hour==now.getHours()&&(e.day)){
                		return 1;
                	}
                	else {
                		return 0;
                	}
                })
                .transition()
                .ease("linear")
                .duration(3000)
                .attr("opacity",function(e){
                	if(e.hour==now.getHours()&&(e.day)){
                		return 1;
                	}
                	else if(e.day){
                		return .35;
                	}else if(!e.day){
                		return 0;
                	}
                })

            var moons = svg.selectAll("img").data(lat_tz);
                moons.enter()
            	.append("svg:image")
                .attr("xlink:href", "/moonwhite2-01.png")
                .attr("width", "20")
                .attr("height", "20")
                .attr("opacity",function(e){
                	// console.log(e);
                	if(e.hour==now.getHours()&&(!e.day)){
                		return 1;
                	}
                	else{
                		return 0;
                	}
                })
				.attr("x", function(e){
					return e.x + (e.width / 2)-7;
				})
		        .attr("y", function(e){
		        	return 7.5;
		      //   	if(e.hour<=12){
		      //   		return yArc1Scale(e.hour)+10;
		    		// }
		      //   	if(e.hour>12){
		      //   		return yArc2Scale(e.hour)+10;
		    		// }
		        })
                .transition()
                .ease("linear")
                .duration(3000)
                .attr("opacity",function(e){		        
					if(e.hour==now.getHours()&&(!e.day)){
                		return 1;
                	}
                	else if(e.day){
                		return 0;
                	}else if(!e.day){
                		return .3;
                	}
                })

//This is the accessor function we talked about above
// var lineFunction = d3.svg.line()
// 	.x(function(d) { return d.x; })
// 	.y(function(d) { return d.y; })
// 	.interpolate("cardinal");

// var lineGraph = svg.append("path")
//                 .attr("d", lineFunction(lineData))
// 			    .style("stroke-dasharray", "1,4")
// 				.attr('stroke','lightgray')
// 		        .attr("stroke-width", 2)
//                 .attr("fill", "none");

	svg.selectAll("path").moveToFront();
	svg.selectAll("text").moveToFront();
	svg.selectAll("circle").moveToFront();

}

function loadPoint(point)
{
	if (!strategies[point.strategy]) {
		strategies[point.strategy] = {
			color:colors(lastColorIndex),
			count:0,
			name:point.strategy
		};
		lastColorIndex++;
	}

	strategies[point.strategy].count++;
	point.color = strategies[point.strategy].color
	point.created_at = Date.now();

// if(point.geo.lng)
//can i find a way to say if this longitude has already been placed, 
//increase the radius of the existing circle?

	point.projection = [point.geo.lng, point.geo.lat];
	data.push(point);
	renderData();
	//renderStrategies();
}

function antipode(position) {
  return [position[0] + 180, -position[1]];
}

function solarPosition(time) {
  var centuries = (time - Date.UTC(2000, 0, 1, 12)) / 864e5 / 36525, // since J2000
      longitude = (d3.time.day.utc.floor(time) - time) / 864e5 * 360 - 180;
  console.log([longitude - equationOfTime(centuries) * degrees,
    solarDeclination(centuries) * degrees])
  return [
    longitude - equationOfTime(centuries) * degrees,
    solarDeclination(centuries) * degrees
  ];

}

// Equations based on NOAA’s Solar Calculator; all angles in radians.
// http://www.esrl.noaa.gov/gmd/grad/solcalc/

function equationOfTime(centuries) {
  var e = eccentricityEarthOrbit(centuries),
      m = solarGeometricMeanAnomaly(centuries),
      l = solarGeometricMeanLongitude(centuries),
      y = Math.tan(obliquityCorrection(centuries) / 2);
  y *= y;
  return y * Math.sin(2 * l)
      - 2 * e * Math.sin(m)
      + 4 * e * y * Math.sin(m) * Math.cos(2 * l)
      - 0.5 * y * y * Math.sin(4 * l)
      - 1.25 * e * e * Math.sin(2 * m);
}

function solarDeclination(centuries) {
  return Math.asin(Math.sin(obliquityCorrection(centuries)) * Math.sin(solarApparentLongitude(centuries)));
}

function solarApparentLongitude(centuries) {
  return solarTrueLongitude(centuries) - (0.00569 + 0.00478 * Math.sin((125.04 - 1934.136 * centuries) * radians)) * radians;
}

function solarTrueLongitude(centuries) {
  return solarGeometricMeanLongitude(centuries) + solarEquationOfCenter(centuries);
}

function solarGeometricMeanAnomaly(centuries) {
  return (357.52911 + centuries * (35999.05029 - 0.0001537 * centuries)) * radians;
}

function solarGeometricMeanLongitude(centuries) {
  var l = (280.46646 + centuries * (36000.76983 + centuries * 0.0003032)) % 360;
  return (l < 0 ? l + 360 : l) / 180 * π;
}

function solarEquationOfCenter(centuries) {
  var m = solarGeometricMeanAnomaly(centuries);
  return (Math.sin(m) * (1.914602 - centuries * (0.004817 + 0.000014 * centuries))
      + Math.sin(m + m) * (0.019993 - 0.000101 * centuries)
      + Math.sin(m + m + m) * 0.000289) * radians;
}

function obliquityCorrection(centuries) {
  return meanObliquityOfEcliptic(centuries) + 0.00256 * Math.cos((125.04 - 1934.136 * centuries) * radians) * radians;
}

function meanObliquityOfEcliptic(centuries) {
  return (23 + (26 + (21.448 - centuries * (46.8150 + centuries * (0.00059 - centuries * 0.001813))) / 60) / 60) * radians;
}

function eccentricityEarthOrbit(centuries) {
  return 0.016708634 - centuries * (0.000042037 + 0.0000001267 * centuries);
}
