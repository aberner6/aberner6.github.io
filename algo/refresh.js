var svg, vis, 
inputCirc, inputLine, trackCirc, senseCirc,
outputLine, outputCirc, finalOutputCirc,
yIn, xIn,
path,
circle, line, rollingCirc, cloudCirc, endOutCirc;
var moveAround;
var theIndex = [];
var thisCloudCirc;
var wasClicked = false;
var connectionsChanged = false;
var callRun;
var newD = [];
var oldD = [];
var startThings = true;
var windowWidth = window.innerWidth,
    windowHeight= window.innerHeight,
    height = windowHeight,
    width = windowWidth;
var lmargin = windowWidth/4;
var yMid = windowHeight/2;
var rotation = 10;
var swingtime = 1600;
var nextAnimation = false;
var color1 = "#438CA5";
var color2 = "#C4602E";
var yMap = d3.scale.linear()
            .domain([0, 1])
            .range([-height, height*2])
var randMap = d3.scale.linear()
    .domain([0, 1])
    .range([0, .49]);
// $('.wodry').wodry();



var scoreBoardClicked = false;





$(window).resize(function() {
// windowWidth = window.outerWidth,
//     windowHeight= window.innerHeight,
//     lmargin = windowWidth/4,
//     yMid = windowHeight/2;
    // transPos();
});
var addIt =0;
var trigger = false;
var tSense;

var threshold = .5;
var input = [];
var inputGame = [];

var trigOther = false;
var endOutX = lmargin*3;
var introDuration = 6000;
var random = false;
var inputDone = false;
var r = 10;
var a = false;
var t = [];
var o = [];
var  strokeWeight= 2;
var startUp, shiftAway, endOutput, rollingCircle;
var opacity = .5;
var littleL = 4;
var d;
var secs;
var soundsLoaded;
var intro = true;
var tData = [];
var myTimer;
var introTalk = false;
var colorSpectrum = [];
var myPulse;
var sense = false;
var neurons = false;

o = [1, 2];
var numInput = 100;
var randLength = 400;














var whatClicked;

var hTopMargin = height/4;//10;
var hMargin = 1.4;
var leftMargin = width/6;
var pathLength = 100;
var rRad = 20;
var tRad = 20;


var opaMap = d3.scale.linear()
    .domain([0, pathLength])
    .range([1, 0]);



var oMap = d3.scale.linear()
    .domain([0, threshold*50])
    .range([0, 1]);

var weightOpaMap = d3.scale.linear()
    .domain([0, .5])
    .range([0, 1]);

var svg1 = d3.select("#game")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    // .attr("fill",)
document.getElementById('game').onmousedown = function(){
  return false;
};
document.getElementById('container').onmousedown = function(){
  return false;
};
var randData;
loadRand("rand.csv");
function loadRand(csvName){
d3.csv(csvName, function(thisData) {
    randData=thisData;
    })
}

    var neurop1 = $("#neurop1").width();

    var conn1 = $("#connections1").width();
    var conn2 = $("#connections2").width();
loadIt("senses.csv");
function loadIt(csvName){
d3.csv(csvName, function(thisData) {
    tData=thisData;
    if(tData.length>0){
        for (var i = 0; i < tData.length; i++) {
           tData[i].weight = randMap(Math.random());
        } 
        gaming();
    }
    var tWidth = $("#title").width();
    $("#title").animate({
        left: width/2-tWidth/2,  
        top:height/4,
    },100).show();
// ($".title1")
})
}
// d3.select("#enterContainer").attr("opacity",.2)

d3.select("#game svg").attr("opacity",.2)
$("#enter").on("click", function(e){
// $("#game").
d3.select("#game svg").attr("opacity",1)
$("#enterContainer").show();
$("#clickExpl").show();

    $("#enter").slideUp();
        $("#title").hide();


  $("#neurop1").slideDown().animate({
        top: height/hMargin,//+rRad*4.5,
        left: width-leftMargin,//width/2+neurop1*3.5,  
    },2000) 
    $("#neurop2").slideDown().animate({
        top: height/hMargin,//+rRad*4.5,
        left: leftMargin,//width/2-neurop1*3.8,
    },2000) 

// })

 $("#connections1").delay(500).slideDown().animate({
        left: width/2-conn1*1.8-leftMargin,  
        top:height/2+50,
    },1000) 
    $("#connections2").delay(500).slideDown().animate({
        left: width/2+leftMargin+conn2/1.4,  
        top:height/2+50,
    },1000) 
})
    $("#neurop1, #neurop2").animate({
        left: width/2-neurop1/2,  
    },2000) 


   $("#connections1, #connections2").delay(1000).animate({
        left: width/2-conn1/2,  
        top:height/2+50,
    },1000) 
// myPulse=setInterval(function () {pulseTimer()}, 1000);
// function pulseTimer() {
//     pulseInputs();
// }

// $('.runner').tipsy({
//     gravity: 'w', 
//     html: true, 
//     title: function() {
//          return "Trigger a sense input";
//     }
// });


$('#moreInfoBtn').tipsy({
    gravity: 'e', 
    html: true, 
    title: function() {
         return "Created by the Spatial Information Design Lab & Stefano Fusi Lab"
         +'<br>'+'Researcher: Lyudmila Kushmir'+'<br>'+"Designer/Developer: Annelie Berner"+ '<br>';
    }
});



// function pulseInputs(){
//     d3.selectAll(".runner")
//     .transition()
//     .duration(500)
//     .attr("stroke-width", strokeWeight*3)
//     .each("end", function(d,i){
//         d3.selectAll(".runner")
//         .transition()
//         .duration(500)
//         .attr("stroke-width", strokeWeight);
//     })
// }
function gaming(){
function calcGame(triggerSense, xPos, clicks,type){
console.log(triggerSense+"inside calculate");
console.log(clicks+"clicks")
    for (i=0; i<tData.length; i++){
        if(tData[i].sense==triggerSense){
            addIt += tData[i].weight;
            theIndex=i;
                console.log(theIndex);
                console.log(addIt);
        }
    }
    triggerRollGame(addIt, triggerSense, theIndex, xPos, clicks,type);
}

// if(addIt>=threshold){//THIS SHOULD  BE HAPPENING @END
//     return //BLAH
// }else{
//  return //BLAH      
// }
// console.log(tData[theIndexI].weight+"index weight");


function showCaptions(addIs, senseIs, errorIs,thisIndex){
// console.log(addIs+"addis"+ senseIs+"senseis"+ errorIs+"erroris"+thisIndex+"thisindex")
// myPulse=setInterval(function () {pulseTimer()}, 3000);  
}

var error = 0;
// makeText();
makeText(tData,tData,0,0,0,"u"); 

// makeText(tData,0); 
var oldData = [];
var learning = d3.scale.linear()
    .domain([0,10])
    .range([0,1])
function triggerRollGame(addIt, triggerSense, theIndexIs, xPos,clicks,type){

     // console.log(addIt+"sum "+triggerSense+" sense");
     tSense = triggerSense;
    console.log(tData[theIndexIs].weight+"old weight?");

    error = threshold-addIt;
    console.log(error+"error");

    // showCaptions(addIt, triggerSense, error,theIndexIs);
    // console.log(theIndexIs+"indexis");
learningConstant = learning(clicks);
console.log(learningConstant+"learning")

    // //new weighting
    if(error>0){ //&& random == true){
        for (i= 0; i<inputGame.length; i++){
            oldData[i] = tData[i].weight;
            console.log(oldData[i]+"old data?")
            tData[i].weight += learningConstant*error*inputGame[i];
            console.log(learningConstant*error*inputGame[i]+"equation")
            console.log(tData[i].weight+"new data?")

makeText(oldData,tData,theIndexIs,learningConstant, error, type); 
changeCircs(tData,theIndexIs, xPos);
bumpUp(tData[theIndexIs].weight, triggerSense);

        }
    // showLines();
    }

    else{
bumpUp(tData[theIndexIs].weight);
makeText(oldData,tData,theIndexIs,learningConstant, error, type); 
changeCircs(tData,theIndexIs, xPos);
    }    
console.log(tData[theIndexIs].weight+"new weight?");
}
































// var gradient = svg1.append("svg:defs")
//     .append("svg:linearGradient")
//     .attr("id", "gradient")
//     .attr("x1", "0%")
//     .attr("y1", "0%")
//     .attr("x2", "100%")
//     .attr("y2", "100%")
//     .attr("spreadMethod", "pad");


//  gradient.append("svg:stop")
//     .attr("offset", "0%")
//     .attr("stop-color", "yellow")
//     .attr("stop-opacity", .1);

// gradient.append("svg:stop")
//     .attr("offset", "100%")
//     .attr("stop-color", "white")
//     .attr("stop-opacity", 1);
var winCircle  = svg1.selectAll("win")
    .data(d3.range(1))
    .enter().append("circle")
    .attr("class","win")
    .attr("cx", width/2)
    .attr("cy", hTopMargin-rRad*5)
    .attr("r", rRad)
        // .attr('fill', 'url(#gradient)')
    .attr("fill", "none")
    .attr("stroke-dasharray", "4,4")
    .attr("stroke", "white")
    .attr("stroke-width", strokeWeight)
    .attr("opacity",1);

    // .on("mouseover", function(d,i){
    //     d3.select(this)
    //     .transition()
    //     .attr("opacity",.5)                                        
    // })
    // .on("mouseout", function(d,i){
    //     d3.select(this)
    //     .transition()
    //     .attr("opacity",1)                                        
    // })  
// <div id = "outputInteraction"
// make output circle get bigger
$(".trailInteraction").on("click", function(){
    d3.selectAll(".trailLeft, .trailRight")
    .transition()
    .duration(1000)
    .attr("stroke", "white")
    // .attr("stroke-width", strokeWeight*2)
    .each("end", function(){
        d3.selectAll(".trailLeft, .trailRight")
        .transition()
        .duration(1000)
        .attr("stroke", "none")        
    })
})
$(".outputInteraction").on("click", function(){
    d3.selectAll(".win")
    .transition()
    .duration(500)
        .attr("stroke","yellow")
        .attr("stroke-width",strokeWeight*5)
   .transition()
   .duration(1000)
        .attr("stroke","white")
        .attr("stroke-width",strokeWeight)
})


var pathRight = svg1.selectAll("pathRight")
    .data(d3.range(2))
    .enter().append("line")
    .attr("class", function(d,i){
        return "pathRight";
    })
    .attr("x1", function(d,i){
        if(i%2==0){
            return width-leftMargin-rRad;      
        }
            return width-leftMargin+rRad; 
    })
    .attr("x2", function(d,i){
        // if(i%2==0){
        //     return width/2;//-rRad/4;
        // }
        // return width/2+rRad/2;
        return width/2;
    })
    .attr("y1", height/hMargin+rRad)    
    .attr("y2", function(d,i){
        if(i%2==1){
            return hTopMargin-rRad*2;
        }
        return hTopMargin;
    })
    .attr("fill", "gray")
    .attr("opacity",1)
    .attr("stroke","white")
var pathLeft = svg1.selectAll("pathLeft")
    .data(d3.range(2))
    .enter().append("line")
    .attr("class", function(d,i){
        return "pathLeft";
    })
    .attr("x1", function(d,i){
        if(i%2==0){
            return leftMargin-rRad; 
         }     
            return leftMargin+rRad; 
    })
    .attr("x2", function(d,i){
        // if(i%2==0){
        //     return width/2-rRad/2;
        // }
        // return width/2+rRad/4;
         return width/2;
    })
    .attr("y1", height/hMargin+rRad) 
    .attr("y2", function(d,i){
        if(i%2==0){
            return hTopMargin-rRad*2;
        }
        return hTopMargin;
    })   
    // .attr("y2", hTopMargin)
    .attr("fill", "gray")
    .attr("opacity",1)
    .attr("stroke","white")


// var trailLeft = svg1.selectAll("trailLeft")
//     .data(d3.range([pathLength]))
//     // .data(randData)
//     .enter().append("circle")
//     .attr("class", function(d,i){
//         return "trailLeft";
//     })
//     .attr("cx", function(d,i){
//         return xLMap(i);
//     })
//     .attr("cy", function(d,i){
//         return hMap(i);
//     })
//     .attr("r", tRad)
//     .attr("fill", "none")
//     .attr("opacity",function(d,i){
//         var howFar = tData[0].weight*pathLength;
//         if(i<=howFar+threshold*pathLength){
//             return oMap(howFar);
//         }
//         else{
//             return 0;
//         }        
//     })
//     .attr("stroke","white")

// var trailRight = svg1.selectAll("trailRight")
//     .data(d3.range([pathLength]))
//     .enter().append("circle")
//     .attr("class", function(d,i){
//         return "trailRight";
//     })
//     .attr("cx", function(d,i){
//          return xRMap(i);      
//     })
//     .attr("cy", function(d,i){
//         return hMap(i);
//     })
//     .attr("r", tRad)
//     .attr("fill", "none")
//     .attr("opacity",function(d,i){
//         var howFar = tData[1].weight*pathLength;
//         if(i<=howFar+threshold*pathLength){
//             return oMap(howFar);
//         }
//         else{
//             return 0;
//         }        
//     })
//     .attr("stroke","white")

var thisCircle;
thisCircle  = svg1.selectAll("runner")
    .data(tData)
    .enter().append("circle")
    .attr("class", function(d,i){
        return "runner";
    })
    .attr("r", rRad)
    .attr("fill", "white")
    .attr("opacity",1)
    .attr("stroke","white")
    .attr("cx", function(d,i){
        if(i%2==0){
            return leftMargin;
        }
        return width-leftMargin;
    })
    .attr("cy", height/hMargin+rRad)

// makeNewCirc();
function makeNewCirc(){
    console.log("making new")
    // return
thisCircle  = svg1.selectAll("runner")
    .data(tData)
    // .data(d3.range(2))
    .enter().append("circle")
    .attr("class", function(d,i){
        return "runner";
    })
    .attr("cx", function(d,i){
        if(i%2==0){
            return leftMargin;
        }
        return width-leftMargin;
    })
    .attr("cy", height/hMargin+rRad)
    .attr("r", rRad)
    .attr("fill", "white")
    .attr("opacity",1)
    .attr("stroke","white");
// $('.runner').tipsy({
//     gravity: 'nw', 
//     html: true,
//     trigger: 'manual', 
//     title: function() {
//          return "Return to Part I: Game";
//     }
// });
// $('.runner').tipsy("show");


clickFunction();
// makeText();
}


// <div id = "inputInteraction">
// make the input circle get bigger
$(".inputInteraction").on("click", function(){
    d3.selectAll(".runner")
    .transition()
    .duration(1000)
    .attr("r", rRad*2)
    .transition()
    .duration(1000)
    .attr("r", rRad)
})
$('.scoreboard').click(function(){
    d3.selectAll(".wodry")
    .transition()
.duration(100)
    .attr("font-size",18)
    .transition()
    .delay(1000)
    .duration(1000)
    .attr("font-size",14)
})
// <div id="goInteraction">
// manual trigger of the circle to be clicked
var go = 0;
$(".goInteraction").on("click", function(){
    go+=1;
    // inputGame[0] = 1;
    // inputGame[1] = 1;
var thisClicked = d3.select(".runner");
callRun(thisClicked);

})

  // $('.runner').tipsy({trigger: 'manual'});

function makeText(oldData, newData, indexText, learningConstant, error, type){
// oldD[i]
var errorI =Math.floor(error*100)/100;
// console.log(oldData+"OLDDDATA")
var learns = Math.floor(learningConstant * 100) / 100;
// for (i=0; i<newData.length; i++){
//     newD = Math.floor(newData[i].weight * 100) / 100;
// }
//     oldD = Math.floor(oldData * 100) / 100;
//     console.log(newD+"NEWD")
//     console.log(oldD+"OLDD")
// }

d3.selectAll(".learnText").remove();

d3.selectAll(".wodry").remove();
console.log(newData+"newdata");
console.log(newData[indexText].weight+" newData[indextext].weight inside make text")
// $('.wodry').wodry({
//     animation: 'rotateX',
//     delay: 1000,
//     animationDuration: 800
// });

var weightText = svg1.selectAll("wodry")
    .data(newData)
    .enter()
    .append("text").attr("class", "wodry")
    .attr("font-size",14)
    .attr("fill","white")
    .attr("x", function(d,i){
        if(i==0){
            return leftMargin; //width/2-182*2;
        }
        if(i==1){
            return width-leftMargin-282; //width/2+182;
        }
    })
    .attr("y", function(d,i){
        return 100;
    })
    .html(function(d,i){
        if (i==indexText){
        if(Math.floor(newData[i].weight * 100) / 100 >= threshold){
            if(wasClicked && newData[indexText].weight>=threshold){
                $("#refresh1p").delay(500).slideDown();
            }
            else{
                $("#refresh1p, #success").hide();
            }
            if(Math.floor(oldData[i] * 100) / 100!=Math.floor(newData[i].weight * 100) / 100){
            if((Math.floor(newData[i].weight * 100) / 100).toString().length<4){
                    return Math.floor(oldData[i] * 100) / 100+" + "+learns+" &#10036 "+errorI+" = "+ Math.floor(newData[i].weight * 100) / 100+" >=  "+" \xa0"+threshold; 
            }
            else{
                    return Math.floor(oldData[i] * 100) / 100+" + "+learns+" &#10036 "+errorI+" = "+ Math.floor(newData[i].weight * 100) / 100+" >=  "+" \xa0"+threshold; 
            }  
            }
            else{
            if((Math.floor(newData[i].weight * 100) / 100).toString().length<4){
                    return Math.floor(oldData[i] * 100) / 100+" + "+learningConstant+" &#10036 "+errorI+    " = "+ Math.floor(newData[i].weight * 100) / 100+" >=  "+" \xa0"+threshold; 
            }
            else{
                    return Math.floor(oldData[i] * 100) / 100+" + "+learningConstant+" &#10036 "+errorI+    " = "+ Math.floor(newData[i].weight * 100) / 100+" >=  "+" \xa0"+threshold; 
            }    
            }        
        }





        else{
            if(oldData[i]!=Math.floor(newData[i].weight * 100) / 100){
            if((Math.floor(oldData[i] * 100) / 100).toString().length<4){
                    return Math.floor(oldData[i] * 100) / 100+0+" + "+learns+" &#10036 "+errorI+" = "+ Math.floor(newData[i].weight * 100) / 100+" <  "+threshold; 
            }
            else{
                    return Math.floor(oldData[i] * 100) / 100+" + "+learns+" &#10036 "+errorI+" = "+ Math.floor(newData[i].weight * 100) / 100+" <  "+threshold; 
            } 
            }
            else{
            if((Math.floor(oldData[i] * 100) / 100).toString().length<4){
                    return Math.floor(oldData[i] * 100) / 100+0+" + "+0+" &#10036 "+errorI+" = "+ Math.floor(newData[i].weight * 100) / 100+" <  "+threshold; 
            }
            else{
                    return Math.floor(oldData[i] * 100) / 100+" + "+0+" &#10036 "+errorI+" = "+ Math.floor(newData[i].weight * 100) / 100+" <  "+threshold; 
            } 
            }
        }
    }
    }) 
    .attr("text-decoration","underline");
$('.wodry').tipsy({
    gravity: 'nw', 
    html: true, 
// trigger: 'manual',
    title:function(){
        return "Connection Weight + Learning Constant * Error = Learned Connection Weight (> or <) Pre-Designated Threshold"
    }
})

// var el = $('#manual-example a[rel=tipsy]').tipsy({trigger: 'manual'});
// $('.scoreBoard').click(function(){
//     console.log("hey");
//     // e.preventDefault();
//     console.log($('.tipsy'));
//     if($('.tipsy').length == 0){
//         el.tipsy('show');
//     }else{
//         el.tipsy('hide');        
//     }
// });

var connText = svg1.selectAll("wodry")
    .data(newData)
    .enter()
    .append("text").attr("class", "wodry")
    .attr("font-size",14)
    .attr("fill","white")
    .attr("x", function(d,i){
        if(i==0){
            return leftMargin; //width/2-182*2;
        }
        if(i==1){
            return width-leftMargin-282; //width/2+182;
        }
    })
    .attr("y", function(d,i){
        return 70;
    })
    .text(function(d,i){
        if(i==indexText){
            return "Connection Strength:";
        }else{
            return " ";
        }
    });
if (indexText == 0){
$("#explainAlgo").animate({
    left: leftMargin,
    top: 100,
})
}
if(indexText ==1){
 $("#explainAlgo").animate({
    left: width-leftMargin-282,
    top: 100,
})   
}

if(scoreBoardClicked==true){
//     $(".wodry").hide(1000)
//     $("#explainAlgo").delay(1000).show(2000);
//     $("#explainAlgo").delay(4000).hide();
//         $(".wodry").delay(8000).show(1000);
// 
// $('.scoreBoard').click(function(){
    console.log("hey");
    // e.preventDefault();
    d3.selectAll(".wodry").transition()
.duration(2000)
    .attr("font-size",24)
    .delay(4000)
    .transition()
    .duration(2000)
    .attr("font-size",14)
// });
}

    // .attr("text-decoration","underline")
// $(".wodry").textrotator({
//   animation: "dissolve", // You can pick the way it animates when rotating through words. Options are dissolve (default), fade, flip, flipUp, flipCube, flipCubeUp and spin.
//   separator: ",", // If you don't want commas to be the separator, you can define a new separator (|, &, * etc.) by yourself using this field.
//   speed: 1000 // How many milliseconds until the next word show.
// });
      // $(".wodry").textrotator({
      //   animation: "flipUp",
      //   speed: 2000
      // });

////////////////MAKE THIS POPPIER
// var learnText = svg1.selectAll("learnText")
//     .data(d3.range(2))
//     .enter()
//     .append("text").attr("class", "learnText")
//     .attr("x", function(d,i){
//         if(type=="s"){
//             return leftMargin*2;
//         }
//         if(type=="u"){
//             return width-leftMargin*2;
//         }
//     })
//     .attr("y", function(d,i){
//         return height/hMargin-height/2+rRad*4;
//     })
//     .attr("fill","gray")
//     .text(function(d,i){
//         // return learningConstant+" learning as you click";
//     })




}
$("#refresh1p").animate({
    left: width/2-165,//78,
    // top: hTopMargin-rRad*5.5-20,
})

$("#success").animate({
    left: width/2-2,
})





$("#refresh1p, #success, .win").on("click", function(){  
   l = 0;
   right = 0;

startThings = true;
    d3.selectAll(".bump")
    .transition()
    .duration(2000)
    .attr("fill","white")
    .attr("cy", hTopMargin-rRad)
s = 0;
u = 0;
d3.selectAll(".win")
    .transition()
    .attr("fill", "none");
    for (var i = 0; i < tData.length; i++) {
        tData[i].weight = randMap(Math.random());
    } 
makeText(tData,tData,0,0,0,"u"); 

    // makeText(tData,0);
    d3.selectAll(".trailLeft, .trailRight").remove();

$("#refresh1p, #success").hide();
clickFunction();
})

clickFunction();

var s = 0;
var u = 0;

var whatIs;
function clickFunction(){
// if(wasClicked==false
if(startThings){
    inputGame[0] = 1;
    inputGame[1] = 1;
    calcGame("smell", width/4,0,"s");

    calcGame("touch", width/2+20,0,"u");
    startThings = false;
}

d3.selectAll(".runner").on("click", function(){
   var whatClicked = d3.select(this);
callRun(whatClicked);
})
callRun= function(whatClicked){
    $("#neurop1, #neurop2").hide();



if(connectionsChanged == false){
        $("#connections2 p").replaceWith("<p>the connections will strengthen</p>");
        $("#connections1 p").replaceWith("<p>if you keep clicking</p>");

    conn1 = $("#connections1").width();
    conn2 = $("#connections2").width();

        // $("#connections1").animate({
        //     left: width/2-conn1*1.8-leftMargin,  
        // })
        // $("#connections2").animate({
        // left: width/2+leftMargin+conn2/1.3,  
        // })
        $("#connections1").animate({
            left: width/2-conn1*1.5-leftMargin,  
        })
        $("#connections2").animate({
            left: width/2+leftMargin+conn2/2,  
        })

   $("#connections1, #connections2").delay(1000).animate({
        left: width/2-conn2/2,  
        top: hTopMargin-rRad-8,
    },3000);
   // $("#connections1").delay(7000).remove();
$('#connections1').delay(0).fadeOut(0, function(){
    $("#connections1 p").replaceWith("<p> </p>");
});
$('#connections2').delay(2000).fadeOut(300, function(){
   // $(this).remove(); 
       $("#connections1 p").replaceWith("<p>the connections will strengthen</p>"); 
       connectionsChanged = true;
});
} 
// else{
//         $("#connections1").show().animate({
//             left: width/2-conn2*1.5-leftMargin,  
//             top: hTopMargin-rRad*4,
//         })
//         $("#connections2").show().animate({
//         left: width/2+leftMargin+conn2/2,  
//         top:hTopMargin-rRad*4,
//         })  
// }






wasClicked = true;
    // clearInterval(myPulse);
// whatClicked = d3.select(this);
// whatClicked = w

// whatIs = d3.select(this).attr("cx");

whatIs = whatClicked.attr("cx");

console.log(whatClicked.data()[0].sense)
    if (whatClicked.data()[0].sense=="smell"){
    s+=1;
console.log(whatClicked.data()[0].sense)
        addIt = 0;
        inputGame[0] = 1;
        inputGame[1] = 0;
        calcGame("smell", whatIs,s,"s");
    }
    if(whatClicked.data()[0].sense=="touch"){
        u+=1;
console.log(whatClicked.data()[0].sense)
        addIt = 0;
            inputGame[0] = 0;
        inputGame[1] = 1;
        calcGame("touch", whatIs,u,"u");
    }

    whatClicked
    .transition()
    .duration(500)
    .attr("cx", width/2)
    .attr("cy", hTopMargin-rRad)
    .each("end", function(d,i){
        whatClicked
        .transition()
        .attr("stroke","white")
        .each("end", function(){
            whatClicked.remove();
            wasClicked = false;
        })
    })
    makeNewCirc();
}
}




var what = 0;

var l = 0;
var right = 0;
function changeCircs(newData,indexCircs, xPos){
var multiplier = 1;
var oMap = d3.scale.linear()
    .domain([0, threshold*multiplier])
    .range([0, 1]);

if(xPos<width/2){


l+=1;
var what = newData[0].weight*100;
var hMap = d3.scale.linear()
    .domain([0, what])
    .range([height/hMargin, hTopMargin-rRad]);
var xLMap = d3.scale.linear()
    .domain([0, what])
    .range([leftMargin+rRad/2+4, width/2]);

// var green = d3.rgb(0,10,0);

var color = d3.scale.category10();

var trailLeft = svg1.selectAll("trailLeft")
    .data(d3.range([what]))
    .enter().append("circle")
    .attr("class", function(d,i){
        return "trailLeft";
    })
    .attr("cx", function(d,i){
        return xLMap(i);//newData[1].weight);
    })
    .attr("cy", function(d,i){
        // console.log(l+"l")
        return hMap(i)//newData[1].weight);
    })
    .attr("r", tRad)
    // .attr("fill", "none")
.attr("fill", function(d) {
    return "hsl(" + (l * 10) + ",100%,50%";
  // return "hsl(" + Math.random() * 360 + ",100%,50%)";
    // return "rgb(0, 50, " + 100+(l * 2) + ")";
})
.attr("opacity",.1)
    // .style("stroke", color(Math.floor((Math.random()*20)+1)))
 //     .attr("opacity",function(d,i){
 //         // var howFar = newData[1].weight*multiplier;
 //         if(i<=what){
 //            return oMap(newData[0].weight);
 //         }
 //        else{
 //            return 0;
 //        }        
 // })
}


else{

    console.log(newData[1].weight+"newDataweight")
right +=1;
// if((newData[1].weight)>=threshold){
var what = newData[1].weight*100;
var h2Map = d3.scale.linear()
    .domain([0, what])
    .range([height/hMargin, hTopMargin-rRad]);
var xRMap = d3.scale.linear()
    .domain([0, what])
    // .range([width/2, width]);
    .range([width-leftMargin-rRad/2-4, width/2]);
// var xLMap = d3.scale.linear()
//     .domain([0, what])
//     .range([leftMargin+rRad/2+4, width/2]);

 

var trailRight = svg1.selectAll("trailRight")
    .data(d3.range([what]))
    .enter().append("circle")
    .attr("class", function(d,i){
        return "trailRight";
    })
    .attr("cx", function(d,i){
        return xRMap(i);//newData[1].weight);
    })
    .attr("cy", function(d,i){
        return h2Map(i)//newData[1].weight);
    })
    .attr("r", tRad)
    // .attr("fill", "none")
    // .attr("stroke","white")
.attr("fill", function(d) {
    return "hsl(" + (right * 10) + ",100%,50%";
  // return "hsl(" + Math.random() * 360 + ",100%,50%)";
    // return "rgb(0, 50, " + 100+(l * 2) + ")";
})
.attr("opacity",.1)
 //     .attr("opacity",function(d,i){
 //         // bumpUp(newData[indexCircs].weight);
 //         // var howFar = newData[1].weight*multiplier;
 //         if(i<=what){
 //            return oMap(newData[1].weight);
 //         }
 //        else{
 //            return 0;
 //        }        
 // })
}

}

var bumpCircle  = svg1.selectAll("bump")
    .data(d3.range(1))
    .enter().append("circle")
    .attr("class","bump")
    .attr("cx", width/2)
    .attr("cy", hTopMargin-rRad)
    .attr("r", rRad/4)
    .attr("fill", "white")
    .attr("opacity",1)
    .attr("stroke","none")   
function bumpUp(high, triggerSense){
var mapBump = d3.scale.linear()
    .domain([0,.5])
    .range([hTopMargin-rRad*2, hTopMargin-rRad*4])

$("#connections").hide();
// .attr("cy", hTopMargin-rRad*5)
//     .attr("r", rRad)
winCircle
   .on("mouseover", function(){
       d3.select(this)
        .transition()
        .attr("stroke","yellow")
        .attr("stroke-width",strokeWeight*8)
    })
   .on("mouseout", function(){
        d3.select(this)
        .transition()
        .attr("stroke","white")
        .attr("stroke-width",strokeWeight)
    }) 
$("#success").on("mouseover", function(){
    winCircle
        .transition()
        .attr("stroke","yellow")
        .attr("stroke-width",strokeWeight*8);
})
$("#success").on("mouseout", function(){
    winCircle
        .transition()
        .attr("stroke","white")
        .attr("stroke-width",strokeWeight);
})



    d3.selectAll(".bump")
    .transition()
    // .delay(000)
    .duration(500)
    .attr("cy", hTopMargin-rRad)
    .each("end", function(){
        d3.selectAll(".bump")
        .transition()
        .attr("cy", function(){
            return mapBump(high)
        })
        .each("end", function(){
            if(high>=.5){
$("#success").animate({
    top: mapBump(high)+17,
})
// $("#refresh1p").animate({
//     top: "7.5%",//mapBump(high)-29,
// })
$("#success").show();
    d3.selectAll(".bump")
    .transition()
    .attr("fill","yellow")

                d3.selectAll(".win")
                .transition()
                 .duration(1000)
                .attr("r", rRad/2)
                .attr("stroke-width", rRad*8)
                .attr("stroke", "yellow")
                .attr("cy", hTopMargin-rRad*4.6)
                .each("end", function(){
                    d3.selectAll(".win")
                    .transition()
                    .duration(10)
                    .attr("stroke-width", rRad)
                    .each("end", function(){
                        d3.selectAll(".win")
                            .transition()
                            .duration(10)
                            .attr("r", rRad/2) 
                            .each("end", function(){
                                    d3.selectAll(".win")
                                    .transition()
                                    .duration(2000)
                                    .attr("r", rRad) 
                                    .attr("stroke","white")
                                    .attr("stroke-width", strokeWeight) 
                                    .attr("cy", hTopMargin-rRad*5) 
                            })
                        })
                })

                //should be something like the other thing in science with dashed
                // .each("end", )
                //also change learning constant
            }
            else{
                d3.selectAll(".bump")
                .transition()
                .attr("cy", hTopMargin-rRad)
                .attr("fill","white");
            }
        })        
    })
}
}








$('#enterGame').tipsy({
    gravity: 'nw', 
    html: true, 
    title: function() {
         return "Return to Part I: Game";
    }
});

$('#enterContainer').tipsy({
    gravity: 'nw', 
    html: true, 
    title: function() {
         return "Scientific Explanation";
    }
});
var b=1;

$("#enterGame").on("click", function(){
    $("#container").slideUp("fast");
    $("#game").slideDown("slow");
})
$("#enterContainer").on("click", function(){

    $("#explanation").toggle();
})





//to load the scientific description
// loadData("senses.csv")


// })
// }