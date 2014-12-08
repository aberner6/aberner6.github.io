var svg, vis, 
inputCirc, inputLine, trackCirc, senseCirc,
outputLine, outputCirc, finalOutputCirc,
yIn, xIn,
pth;
var windowWidth = window.outerWidth,
    windowHeight= window.innerHeight,
    height = windowHeight,
    width = windowWidth;
// var height = 800;
var d3chart = d3chart || {};
// var r;
var r = 5;
var a = false;
var t = [];
var o = [];
var strokeWeight = 1;
var lineColor = "gray";
var inColor = "gray";
var movingColor = "#438CA5";
var outColor = "gray";
var startUp, shiftAway, endOutput, rollingCircle;
var distBetween = 40;

var myVar=setInterval(function () {myTimer()}, 1000);
var d;
var secs;
var soundsLoaded;
var intro = true;
function myTimer() {
    d = new Date();
    secs = d.getMilliseconds();
    moveAround(secs/10);
    // soundsLoaded();
}

svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);
vis = svg //for the visualization
    .append('svg:g')
    .attr("transform",
      "translate("+ 0 + "," + 50 + ")");  
o = [1, 2];
t = [1, 2, 3, 4, 5, 6];
var lmargin = width/4;
yIn = d3.scale.linear()
    .domain([0, t.length])
    .range([height/8, height-height/8])
xIn = d3.scale.linear()
    .domain([0, t.length])
    .range([lmargin, height-height/8])



rollingCircle = function(x, y, d, w){
    // console.log(d)
var duration = 3000;
if(w==0){
console.log(w)
  senseCirc
    .transition()
    // .delay(0)
    .duration(duration)
    .attr("opacity",  1)
    .attr("cx", lmargin)

  trackCirc
    .transition()
    .delay(duration)
    .duration(duration)
    .attr("cx", x)
    .attr("cy", y)
    .each("end", function(){
        senseCirc
        .transition()
        .attr("opacity",0)
        // .attr("cx",0);
    })
}
if(w==0.5){
console.log(w)
  senseCirc
    .transition()
    .duration(100)
    .attr("cx", 0)
    .each("end", function(){
        senseCirc
        .transition()
        .duration(duration/4)
        .attr("opacity",1)
        .attr("cx", lmargin)
        .each("end", function(){
            inputLine
                .transition()
                .duration(duration)
                .attr("stroke-width", function(d,i){
                    if(i%2==1){
                        return 2;
                    }
                    if(i%2==0){
                        return .5;
                    }
                    // return Math.random()*5;
                })
                .each("end", function(){
                    senseCirc
                    .transition()
                    .duration(duration)
                    .attr("cx", lmargin*2)
                    .attr("cy", height/2)
                    .each("end", function(){
                        senseCirc
                        .transition()
                        .attr("opacity",0)
                    })
                })
        })
    })
}
if(w==0.6){
console.log(w)
// senseCirc
// .transition()
// .attr("cx",0)
  senseCirc
    .transition()
    .duration(100)
    .attr("r",r)
    .attr("cx", 0)
    .attr("cy", function(i){
        return yIn(i);
    })
    .each("end", function(){
        senseCirc
        .transition()
        .duration(duration/4)
        .attr("fill", function(d,i){
            if(i%2==1){
                return "#438CA5";
            }
            if(i%2==0){
                return "#C84961";
            }
        })
        .attr("opacity",1)
        .attr("cx", lmargin)
        .each("end", function(){
            // inputLine
            //     .transition()
            //     .duration(duration)
            //     .attr("stroke-width", function(d,i){
            //         if(i%2==1){
            //             return 2;
            //         }
            //         if(i%2==0){
            //             return .5;
            //         }
            //     })
            //     .each("end", function(){
                    senseCirc
                    .transition()
                    .duration(duration)
                    .attr("cx", lmargin*2)
                    .attr("cy", height/2)
                    .attr("r", r*3)
                    .each("end", function(){
                        senseCirc
                        .transition()
                        .attr("opacity",0)
                    })
                // })
        })
    })
}
if(w==0.7){
console.log(w)
  senseCirc
    .transition()
    .duration(100)
    .attr("r",r)
    .attr("cx", 0)
    .attr("cy", function(i){
        return yIn(i);
    })
    .each("end", function(){
        senseCirc
        .transition()
        .duration(duration/4)
        .attr("fill", function(d,i){
            if(i%2==1){
                return "#C84961";
            }
            if(i%2==0){
                return "#438CA5";
            }
        })
        .attr("opacity",1)
        .attr("cx", lmargin)
        .each("end", function(){
            // inputLine
            //     .transition()
            //     .duration(duration)
            //     .attr("stroke-width", function(d,i){
            //         if(i%2==1){
            //             return 2;
            //         }
            //         if(i%2==0){
            //             return .5;
            //         }
            //     })
            //     .each("end", function(){
                    senseCirc
                    .transition()
                    .duration(duration/2)
                    .attr("r", 0)
                    .transition()
                    .duration(duration)
                    .attr("cx", lmargin*2)
                    .attr("cy", height/2)
                // })
        })
    })
}
if(w==1){
console.log(w);
senseCirc
    .transition()
    .duration(10)
    .attr("opacity",0)
    .transition()
    .delay(2000)
    .attr("cx", 0)
    .attr("cy", function(d,i){
        // if(i<t.length/2){
        //     return yIn(i)-y;            
        // }
        // else{
        //     return yIn(i)+y;            
        // }
        return yIn(i);
    });   
trackCirc
    .transition()
    .duration(10)
    .attr("opacity",0)
    .transition()
    .delay(100)
    .attr("cx", x)
    .attr("cy", function(d,i){
        // if(i<t.length/2){
        //     return yIn(i)-y;            
        // }
        // else{
        //     return yIn(i)+y;            
        // }
        return yIn(i);

    })
}
if(w==2){
console.log(w);
trackCirc
    .transition()
    .delay(duration*2)
    .duration(duration/2)
    .attr("opacity",1)    
    .attr("cx", x)
    .attr("cy", function(d,i){
        if(i<t.length/2){
            return height/2-distBetween;            
        }
        else{
            return height/2+distBetween;            
        }
    })
senseCirc
    .transition()
    .delay(duration)
    .duration(duration)
    .attr("opacity",1)
    .attr("cx",lmargin)  
}
if(w==3){
console.log(w);
trackCirc
    .transition()
    .delay(d)
    .duration(3000)
    .attr("cx", x)
    .attr("cy", y);
}
if(w==4){
console.log(w);
trackCirc
    .transition()
    .attr("opacity",0)
    .each("end", function(){
        trackCirc
        .transition()
        .attr("cx", 0)
        .attr("cy", function(d,i){
            // if(i<t.length/2){
            //     return yIn(i)-y;            
            // }
            // else{
            //     return yIn(i)+y;            
            // }
            return yIn(i);

        })        
        .each("end", function(){
            trackCirc
            .transition()
            .duration(duration) 
            .attr("opacity",1)  
            .attr("cx", lmargin)
            .each("end", function(){
                trackCirc
                .transition()
                .duration(duration)
                .attr("cx", lmargin*2)
                .attr("cy", function(d,i){
                    if(i<t.length/2){
                        return height/2-distBetween;            
                    }
                    else{
                        return height/2+distBetween;            
                    }
                })
                .attr("r", r*2)
                .each("end", function(){
                    trackCirc
                    .transition()
                    .duration(duration/2)
                    .attr("r",r) 
                    .each("end", function(){
                        trackCirc
                        .transition()
                        .duration(duration)
                        .attr("cx", x)
                        .attr("cy", height/2)
                        .attr("r", r*2)
                        .each("end", function(){
                            trackCirc
                            .transition()
                            .duration(duration/2)
                            .attr("r",0)
                        })
                    })

                })           
            })
        })
    })
}
}

startUp = function(){
// var blooCirc = vis.selectAll("blC")
//     .data(t)
//     .enter()
//     .append("circle").attr("class","blC")
//     .attr("cx", lmargin)
//     .attr("cy", function(i){
//         return yIn(i);
//     })
//     .attr("fill",  movingColor)
//     .attr("stroke", movingColor)
//     .attr("opacity",1)
//     .attr("r",r); 




















trackCirc = vis.selectAll("trackC")
    .data(t)
    .enter()
    .append("circle").attr("class","trackC")
    .attr("cx", lmargin)
    .attr("cy", function(i){
        return yIn(i);
    })
    .attr("fill",  movingColor)
    .attr("stroke", "none")
    .attr("opacity",1)
    .attr("r",r);  
senseCirc = vis.selectAll("senseC")
    .data(t)
    .enter()
    .append("circle").attr("class","senseC")
    .attr("cx", 0)
    .attr("cy", function(i){
        return yIn(i);
    })
    .attr("opacity",0)
    .attr("fill",  movingColor)
    .attr("stroke", "none")
    .attr("r",r); 

inputLine = vis.selectAll("inLine")
    .data(t)
    .enter()
    .append("line").attr("class","inLine")
    .attr("x1", lmargin)
    .attr("y1", function(i){
        return yIn(i);
    })
    .attr("x2", lmargin)
    .attr("y2", function(i){
        return yIn(i);
    })
    .attr("stroke", lineColor)
    .attr("stroke-width", 1)

    inputLine
    .transition()
    .delay(500)
    .duration(3000)
    .attr("x2", lmargin*2)
    .attr("y2", function(i){
        return height/2;
    })
    .each("end", function(){
        rollingCircle(lmargin*2, height/2, 10, 0);
        // trackCirc
        // .transition()
        // .delay(500)
        // .duration(3000)
        // .attr("cx", lmargin*2)
        // .attr("cy", function(i){
        //     return height/2;
        // });
    });
inputCirc = vis.selectAll("inCirc")
    .data(t)
    .enter()
    .append("circle").attr("class","inCirc")
    .attr("cx", lmargin)
    .attr("cy", function(i){
        return yIn(i);
    })
    .attr("fill", "none")
    .attr("stroke", "none")
    .attr("r",5);

outputLine = vis.selectAll("outLine")
    .data(o)
    .enter()
    .append("line").attr("class","outLine")
    .attr("x1", lmargin*2)//lmargin*2+5/2+strokeWeight)
    .attr("y1", function(d,i){
        if(i<o.length/2){
            return height/2-distBetween+5/2;            
        }
        else{
            return height/2+distBetween-5/2;            
        }
    })
    .attr("x2", lmargin*2)//lmargin*2+5/2+strokeWeight)
    .attr("y2", function(d,i){
        if(i<o.length/2){
            return height/2-distBetween;            
        }
        else{
            return height/2+distBetween;            
        }
    })
    .attr("stroke", "none");

outputCirc = vis.selectAll("outCirc")
    .data(o)
    .enter()
    .append("circle").attr("class","outCirc")
    .attr("cx", lmargin*2)
    .attr("cy", function(d,i){
        if(i<o.length/2){
            return height/2-distBetween;            
        }
        else{
            return height/2+distBetween;            
        }
    })
    .attr("r",r)
    .attr("fill","none")
    .attr("stroke", "none");

finalOutputCirc = vis.selectAll("finCirc")
    .data(o)
    .enter()
    .append("circle").attr("class","finCirc")
    .attr("cx", lmargin*2)
    .attr("cy", function(d,i){
        if(i<o.length/2){
            return height/2-distBetween;            
        }
        else{
            return height/2+distBetween;            
        }
    })
    .attr("r",r)
    .attr("fill","none")
    .attr("stroke", "none");

shiftAway = function(){
    inputCirc
    .transition()
    .attr("cy", function(d,i){
        if(i<t.length/2){
            return yIn(i);//-distBetween;
        }
        else{
            return yIn(i);//+distBetween;
        }
    });
    d3.selectAll(".inLine")
    .transition()
    .attr("y1", function(d,i){
        if(i<t.length/2){
            return yIn(i);//-distBetween;            
        }
        else{
            return yIn(i);//+distBetween;            
        }
    })
    .attr("y2", function(d,i){
        if(i<t.length/2){
            return height/2-distBetween;            
        }
        else{
            return height/2+distBetween;            
        }
    });
    rollingCircle(lmargin, distBetween, 20, 1)
    rollingCircle(lmargin*2, height/2-distBetween,4000, 2)

    // trackCirc
    // .transition()
    // .attr("cx", lmargin)
    // .attr("cy", function(d,i){
    //     if(i<t.length/2){
    //         return yIn(i)-distBetween;            
    //     }
    //     else{
    //         return yIn(i)+distBetween;            
    //     }
    // })

    // trackCirc
    // .transition()
    // .delay(500)
    // .duration(3000)
    // .attr("cx", lmargin*2)
    // .attr("cy", function(d,i){
    //     if(i<t.length/2){
    //         return height/2-distBetween;            
    //     }
    //     else{
    //         return height/2+distBetween;            
    //     }
    // })  
}
endOutput = function(){
    outputCirc
    .transition()
    .delay(500)
    .attr("stroke","none")
    .each("end", function(){
        outputLine
        .transition()
        .attr("x2", lmargin*2+100)//-r/2-strokeWeight)
        .attr("y2", height/2)
        .attr("stroke", outColor);

        finalOutputCirc
        .transition()
        .attr("cx", lmargin*2+100)
        .attr("cy", height/2)
        .attr("stroke","none")
        .attr("fill", "none");

    rollingCircle(lmargin*2+100, height/2,10, 3)

    });       
}
}



    // $(".navbar-brand-container").on("mouseover", function(){
    //     console.log("yes")
    //     $("p:first").replaceWith("<p>About</p>");
    //     $(".navbar-brand-container").animate({
    //         left:"50px",
    //     });
    // })

    // $(".navbar-brand-container").on("mouseout", function(){
    //     console.log("yes")
    //     $("p:first").replaceWith("<p>A SENSE OF PLACE</p>");
    //     $(".navbar-brand-container").animate({
    //         left:"-50px",
    //     });
    // })
// d3.select("#info").on("click", function(){
    // $('#introNav2').slideDown("slow");    
// })

$('.about').tipsy({
    gravity: 'nw', 
    html: true, 
    title: function() {
         return "Created by the Spatial Information Design Lab & Stefano Fusi Lab"
         +'<br>'+'Researcher: Lyudmila Kushmir'+'<br>'+"Designer/Developer: Annelie Berner"+ '<br>';
    }
});
var b = 0;
d3.select("#enter").on("click", function(){
    $('#intro').slideDown("slow");
    $('#title').fadeOut("slow");
    // $('#introNav2').slideDown("slow");    
})
d3.select('#introNav2').on("click", function(){
    b++;
    if(b==1){
        intro = false;
    $("p:first").replaceWith("<p>Let's consider a network of 6 neurons</p>");
        // svg.call(transition, p0, p1);
        $("#intro").animate({
            top: "100px",
            left: "200px",
        });
        startUp();  
    }
    if(b==2){
    $("p:first").replaceWith("<p>And throw in a sound input from our sense cloud</p>");
        soundsLoaded();
        rollingCircle(lmargin*2, height/2, 10, 0.5);
    }
    if(b==3){
    $("p:first").replaceWith("<p>Next let's try smell</p>");
      loop.stop("sound" + 1);
        // soundsLoaded();
        rollingCircle(lmargin*2, height/2, 10, 0.6);
    }
    if(b==4){
        rollingCircle(lmargin*2, height/2, 10, 0.7);
        $("#buttons").show()

    }

    $("#smell").on("click", function(){
      loop.stop("sound" + 1);
         rollingCircle(lmargin*2, height/2, 10, 0.6);   
    })
    $("#sound").on("click", function(){
// loop.callback(soundsLoaded);
                soundsLoaded();
        rollingCircle(lmargin*2, height/2, 10, 0.7);
    })

    if(b==5){
    $("p:first").replaceWith("<p>And then</p>");
        // svg.call(transition, p1, p2);
        $("#buttons").hide();
              loop.stop("sound" + 1);

        // $("#sound").hide()
        $("#intro").animate({
            top: "100px",
            left: "400px",
        });
        shiftAway();
        // balls();
    }
    if(b==6){
        $("#intro").animate({
            top: "100px",
            left: "600px",
        });
    $("p:first").replaceWith("<p>After that</p>");
        endOutput();
    }
    if(b==7){
        $("#intro").animate({
            top: "100px",
            left: "100px",
        });
    $("p:first").replaceWith("<p>Lastly</p>");        
    rollingCircle(lmargin*2+100, distBetween,10, 4)        
    }
});


var p0 = [width/2,height/2, windowHeight],
    p1 = [width/2, height/2, windowHeight],
    p2 = [width/2, height/2, windowHeight];  


function transition(svg, start, end) {

var  i = d3.interpolateZoom(start, end);

  vis
    .attr("transform", transform(start))
    .transition()
    .delay(1000)
    .duration(i.duration * 2)
    .attrTween("transform", function() { return function(t) { return transform(i(t)); }; })

}
var center = [width / 2, height / 2];

function transform(p) {
var k = height / p[2]; //*2;
    return "translate(" + (center[0] - p[0] * k) + "," + (center[1] - p[1] * k) + ")scale(" + k + ")";
}


var circ = vis.selectAll("circle")
    .data(d3.range(1000))
    .enter().append("circle")
    .attr("r", function() { return rain(1 + Math.random() * 50); })
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("fill","white")
    .attr("opacity",.8)

    // .attr("transform", function(d) {
    //   return "rotate(" + r + ")"
    //       + "translate(" + (height / 4 + Math.random() * height / 6) + ",0)"
    //       + "rotate(90)";
    // });

// size is linearly proportional to square pixels (not exact, yet)
function rain(size) {
  var r = Math.sqrt(size / Math.PI);
  return 8;
}
var colorSpectrum = ["#438CA5",
"#C4602E",
"#BD57D3",
"#678F39",
"#7372BE",
"#C84961",
"#BC5296"];

var color = d3.scale.ordinal()
    .domain([0, 1000])
    .range(colorSpectrum);

var moveAround = function(secs){
// could use transparent gradient overlay to vary raindrop color
var yMap = d3.scale.linear()
            .domain([0, 1000])
            .range([-100, height])
var yMap2 = d3.scale.linear()
            .domain([0, 1])
            .range([0, height])
var xMap = d3.scale.linear()
            .domain([0, 1])
            .range([0, 100])
var xMap2 = d3.scale.linear()
            .domain([0, 1000])
            .range([0, width])
    circ
    .transition()
    .duration(1000)
    .attr("cy", function(d,i){
        if (intro){
            return yMap2(Math.random());
        }  
        else{
            return yMap(secs)+i*2.5;//2.9;            
        }
    })
    .attr("cx", function(d,i){
        if(intro){
            return xMap2(secs)+i*5;
        }
        else{
            return xMap(Math.random());
        }
    })
    // circ
    // .transition()
    // .delay(2000)
    // .duration(3000)
    .attr("fill", function(d,i){
        return color(i)
        // if (i%2==1){
        //     return "aquamarine"
        // }
        // if (i%2==0){
        //     // console.log("yes")
        //     return "salmon"
        // }
        // console.log(i)
        // if(i>10){
        //     // console.log("yes")
        //     return "url(#gradient3)"
        // }
    })

    // .attr("transform", function(d,i) {
    //   return "rotate(" + d + ")"
    //        + 
    //       "translate(" + (secs) + ","+(0)+")";
    //       + "rotate(90)";
    // });
}
















loop = new SeamlessLoop();

//check if the browser can play MP3's. If not, use ogg.
var audio  = document.createElement("audio"),
canPlayMP3 = (typeof audio.canPlayType === "function" &&
              audio.canPlayType("audio/mpeg") !== "");
// if (canPlayMP3===true) {
//     console.log("true");
//   loop.addUri("BD.mp3", 500, "sound1");
// } 
// else {
//   loop.addUri("BD.ogg", 500, "sound1");
// }
// var callback = false;
// function soundsLoaded(){
//   loop.start("sound1");
//   callBack = true;
//   loop.update("sound" + 1, false);
// };


if (canPlayMP3===true) {
   // loop.addUri("http://localhost:8000/music/BD.mp3", 500, "sound1");
// loop.addUri("https://www.youtube.com/watch?v=g0ziLeohVLc"
  loop.addUri("http://www.freesoundfiles.com/Sounds/Tom%206.wav", 500, "sound1");
} else {
  // loop.addUri("http://stash.rachelnabors.com/music/byakkoya_single.ogg", 1000, "sound1");
}

function soundsLoaded() {
  var n = 1;
  loop.start("sound" + n);
};
//soundsLoaded();
//loop.callback(soundsLoaded);








    // d3.select("#container")
    //     .transition()
    //     .duration(1000)
    //     .style("opacity", .8)
    //     .each("end",function(){
    //     $(".introZoom, #intro4, #introNav2").fadeIn("fast", function(){

    //     })
        // })