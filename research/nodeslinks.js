var svg;
var eachEntry;
var xScale;
var xAxis;
var years = [];
var alongWidth;
var uniqueYears;
var uniqueAuthors;
var uniqueKeywords;
var uniqueMostKeyed;
var uniqueTotalsKeyed;

var kLabels = false;
var allLabels = true;

var journalTypes = [];
var authors = [];
var keywords = [];
var uniqueTypes;
var goSecond = false;
var totals = [];
var totalAuthors = [];
var totalKeywords = [];
var huh = [];
var total1 = 0;
var total2 = 0;
var total3 = 0;
var total4 = 0;
var total5 = 0;
var total6 = 0;
var totalss = {};
var opacityMap;
var firstLoadVar;
var firstLoad = -1;
var secLoad = -1;
var secondLoadVar;
var secondLoad = -1;
var padding = 35;
var padX = 100;

var minYear;
var maxYear;
var maxAuthor;
var maxCited;
var thisTotal;
var totalsCircles;
var textsAre;
var heightScale;
var singleScale;
var thisData = [];
var theseAuthors = [];
var theseKeywords = [];
var focusKeywords = [];
var totalK = [];
var uniqueKDone=false;


var theX = [];
var maxEntries;
var citeNums = [];
var radius = 3;
    //Width and height
var w = window.outerWidth;
var h = window.innerHeight-50;
var newCircle;

var color; //=  d3.scale.category20c();

var colorSpectrum;
var initialZoom = 1,
    maxZoom = 10;
var filterNum;

var exitK;
var returnK;
var minK;
var otherTransform;
var doOther;

var animateZoom = false;
var showReset = false;
var overallView = false;
var loadIt;
var itsDone=false;

svg = d3.select("#container")
    .append("svg")
    .attr("width", w)
    .attr("height", h)

var vis = svg //for the visualization
.append('svg:g')
.attr("transform",
  "translate("+ 0 + "," + 0 + ")");  


$("#key").click(function() {
    $(".keyCirc, .newlabel, .paperCirc, .journoCirc, .descriplabel").toggle();
})   
var startingX = 20;
var startingY = 349;//523;

var startingXLabel = 34;
var startingYLabel = 351;//525;

var t = [1];
var keyCircle = vis.selectAll("keyCirc")
    .data(t)
    .enter()
    .append("circle").attr("class","keyCirc")
    .attr("cx", 20)
    .attr("cy", startingY)
    .attr("fill", "white")
    .attr("stroke", "gray")
    .attr("r",8)
// var t = [1];
var keyLabel = vis.selectAll("keylabel")
    .data(t)
    .enter()
    .append("text").attr("class","newlabel")
    .attr("x", 34)
    .attr("y", startingYLabel)
    .text("White Dot: Major Keyword")     //"source":keywords[i],"target":uniqueMostKeyed[j]
var paperKeyCircle = vis.selectAll("paperCirc")
    .data(t)
    .enter()
    .append("circle").attr("class","paperCirc")
    .attr("cx", 20)
    .attr("cy", startingY-20)
    .attr("fill", 'rgb(251,180,174)')
    .attr("r",radius)
var paperLabel = vis.selectAll("keylabel")
    .data(t)
    .enter()
    .append("text").attr("class","newlabel")
    .attr("x", 34)
    .attr("y", startingYLabel-18)
    .text("Colored Dot: Paper") 
//filter num as slider so you can change threshold on demand
//also have to have date added
//on change, draw again
loadData("deskResearch.csv", .3)
function loadData(csvName, filterNum){
    citeNums.length = 0;
    keywords.length = 0;
    authors.length = 0;
    theseKeywords.length = 0;
    theseAuthors.length = 0;
    journalTypes.length = 0;
    totals.length = 0;
    totalAuthors.length = 0;
    totalKeywords.length = 0;
    focusKeywords.length = 0;
    totalK.length = 0;

    //load and organize data
    d3.csv(csvName, function(data) {
        thisData=(data);
        for (i = 0;i<data.length; i++){ 
            if(isNaN(data[i].Year)==false){
                years[i] = data[i].Year;
            }
            if(isNaN(parseInt(thisData[i].Value))){
                 citeNums[i]=(0);
            }
            else {
                 citeNums[i]=(parseInt(thisData[i].Value))
            }    

            if (data[i].Keywords!="undefined"){
                keywords[i] = data[i].Keywords.split(", ");
            }
            if(data[i].Originator!="undefined"){
                authors[i] = data[i].Originator.split(", ");
            }
            for (j=0; j<authors[i].length; j++){
                theseAuthors.push(authors[i][j]);            
            }
            for (j=0; j<keywords[i].length; j++){
                theseKeywords.push(keywords[i][j]);   
            }
            if(data[i].Medium!="undefined"&&data[i].Medium.length!=0){
                journalTypes[i] = data[i].Medium.toLowerCase();
            }
    } 
    var keywordSorted = false;
    for (i=0; i<theseKeywords.length; i++){ 
        if(theseKeywords[i].length==0){
          theseKeywords.splice(i,1)
        }
        keywordSorted = true;
    }
    function onlyUnique(value, index, self) { 
        return self.indexOf(value) === index;
    } 
    uniqueTypes = journalTypes.filter( onlyUnique ); //finds unique names
    uniqueTypes = uniqueTypes.sort();
    uniqueKeywords = theseKeywords.filter( onlyUnique ); //finds unique authors

    function valueConsolidation(givenYear, i) { 
        var total = 0;
        for (i = 0;i<data.length; i++){ 
            if(data[i].Year!="undefined" && data[i].Year== givenYear){
                total++;
            }else{
            }}
         return total;
     } 
    function authorConsolidation(givenAuthor,i) { 
        var total = 0;
        for (i = 0;i<theseAuthors.length; i++){ 
            if(theseAuthors[i] == givenAuthor){
                total++;
            }else{
            }
        }
         return total;
     } 
    function keyConsolidation(givenKey,i) { 
        var total = 0;
        for (i = 0;i<theseKeywords.length; i++){ 
            if(theseKeywords[i] == givenKey){
                total++;
            }else{
            }
        }
         return total;
    } 

    if(keywordSorted==true){
        for (i = 0; i<theseKeywords.length; i++){
          if(theseKeywords[i].length>0){
            totalKeywords[i]= keyConsolidation(theseKeywords[i])
            var mostKeyed = d3.max(totalKeywords);        
                if(totalKeywords[i]>mostKeyed*filterNum){
                    focusKeywords.push(theseKeywords[i]);
                }
            }
        } //creates a new aray with the sums of all the different Names
    }
    uniqueMostKeyed = focusKeywords.filter( onlyUnique ); //finds unique authors

    for (i = 0; i<uniqueMostKeyed.length; i++){
        totalK[i]= keyConsolidation(uniqueMostKeyed[i])
        uniqueKDone=true;   
    }

    maxEntries = d3.max(totals, function(d) { return d; });
    maxCited = d3.max(citeNums, function(d) { return d; });   

    heightScale = d3.scale.linear()
        .domain([0, maxEntries])
        .range([padding, h/1.1+padding]);

    opacityMap = d3.scale.linear()
        .domain([0,maxNodeCited])
        .range([.2, 1])  

    colorSpectrum = [
    "#fc5988" 
    ,"#b14a41"
    ,"#6ab054"
    ,"#8675ee"
    ,"#fcb752"
    ,"#89e2fe"]

    color = d3.scale.ordinal()
        .domain([0, uniqueTypes.length])
        .range(colorSpectrum);

    console.log(uniqueTypes.length)
    var journoTitle = vis.selectAll("keylabel")
        .data(t)
        .enter()
        .append("text").attr("class","newlabel")
        .attr("x", 17)
        .attr("y", 391)
        .text("Each color represents a medium:")    

    var keyTypes = ["Video","Article","Book","Exhibit","Installation"]
    keyTypes = keyTypes.sort();
    if(uniqueTypes.length>4){
        var journoCircle = vis.selectAll("journoCirc")
            .data(keyTypes)
            .enter()
            .append("circle").attr("class","journoCirc")
            .attr("cy", function(d,i){
                return i*18+407;
            })
            .attr("cx", 20)
            .attr("fill", function(d){
                return color(d)
            })
            .attr("r",radius)

        var journoLabel = vis.selectAll("keylabel")
            .data(keyTypes)
            .enter()
            .append("text").attr("class","newlabel")
            .attr("y", function(d,i){
                return i*18+411;
            })
            .attr("x", 34)
            .text(function(d){ return toTitleCase(d); });   

        callOthers();    
    } 

    function toTitleCase(str){
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }
})
}
   

var fishEyeGo = false;
var b=0;
var whatis = [];

$( document ).ready(function() {
    $("#titlename").toggle();  //show   
    $("body").keypress(function(){
        (b+=1);
        if (b==1){
            if(uniqueKDone==true){
                // console.log("uniqueKDone"+uniqueKDone) 
                // arrangeClusters(); 
            }            
        }
        if (b==2){
            // callOthers();
        }
        if (b==3){      
            // simpleNodes();
            // b=0;
            // $("#titlename").toggle();  //show    
        }
        if(b==4){
            // $(".labels").show();
        }
        if(b==5){
            $("#titlename").hide();  //show    
            // $("#titlename").toggle();  //show    
            makeNewNodes();
        }      
        if(b==6){
            doOther();       
        }  
        if(b==7){
            whatis[0]=whatis[0]-radius*4;
            whatis[1]=whatis[1]-radius*4;        
            minK(whatis)
        }    
    });
})

var saveOne=[];
var thisY = [];
var thisX = [];

var links = [];
var nodeCited = [];
var nodes = {};
var drag;
var n;
var maxNodeCited;
function callOthers(){
    links = [];
    console.log(links.length)
    if(itsDone==false){
        for (i=0; i<thisData.length; i++){ 
            for (j=0; j<uniqueMostKeyed.length; j++){ 
                if (keywords[i].indexOf(uniqueMostKeyed[j])!=-1){
                    links.push({"source":keywords[i],"target":uniqueMostKeyed[j],"sourceTitle":thisData[i].Medium.toLowerCase(), "cites":parseInt(thisData[i].Value), "headline":thisData[i].Title, "authors":thisData[i].Originator, "url":thisData[i].Readings}) 
                }
            }
        }    
        simpleNodes();
    }
    console.log(links.length)
    d3.select("#titlename").classed("selected", true);

    if(allLabels){
        $("#titlename").slideDown("slow")
    }
}

var rMap; 
var circle, path, text;
var force;
var scaleRadius = 5;
var howLong = [];
var nodes = {};
var thisPaperName;
getTextWidth = function(text, font) {
    // re-use canvas object for better performance
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
};

function simpleNodes(){
    console.log(links.length);
       
    // Compute the distinct nodes from the links.
    links.forEach(function(link) {
      link.source = nodes[link.source] || (nodes[link.source] = {name: link.source, cites:link.cites, sTitle:link.sourceTitle, url: link.url, headline:link.headline, authors:link.authors});
      link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
    });

    force = d3.layout.force()
        .nodes(d3.values(nodes))
        .links(links)
        .size([w, h])
        .linkDistance(30)
        .charge(-400)
        .on("tick", tick)
        .start();

    drag = force.drag() 
        .on("dragstart", dragstart);   

    var thisMap;

    var thisWeight = [];
    var maxWeight;
    path = vis.selectAll("path")
        .data(force.links())
        .enter().append("path")
        .attr("class","link") 
        .attr("stroke", function(d,i){
            // console.log(d);
            for (k=0; k<uniqueTypes.length; k++){
               if(d.sourceTitle==uniqueTypes[k]){
                    return color(k);
               }
            }
            if(howLong.length>0){
            if(howLong[i][0].length==1){
                return "white";
            }        
            }
        })

    circle = vis.selectAll("node")
        .data(force.nodes())
        .enter().append("circle")
        .attr("class",function(d){
            howLong.push(d.name);
            thisWeight.push(d.weight);
            maxWeight = d3.max(thisWeight, function(d){ return d; })
            rMap = d3.scale.linear()
                .domain([0,maxWeight])
                .range([radius, radius*9])  

            return "node";
        })  
    circle
        .attr("r", function(d,i){
            return radius/10;
        })
        .attr("fill", function(d,i){

            if(isNaN(parseInt(d.cites))){
                nodeCited.push(0);
            }
            else {
                nodeCited.push(parseInt(d.cites))
            }
            maxNodeCited = d3.max(nodeCited, function(d){ return d; })

            for (k=0; k<uniqueTypes.length; k++){
               if(d.sTitle==uniqueTypes[k]){
                    return color(k);
               }
            }
            if(howLong.length>0){
            if(howLong[i][0].length==1){
                return "white";
            }        
            }
        })
        .attr("stroke", function(d,i){
        if(howLong.length>0){    
            if(howLong[i][0].length==1){
                return "black";
            } 
            if(howLong[i][0].length>1){
                return "none";
            }   
        }
        })
        .attr("stroke-width",.3)
        .attr("opacity", function(d,i){
            thisMap = d3.scale.linear()
                .domain([0,maxNodeCited])
                .range([.9, 1])  
            return thisMap(nodeCited[i]);       
        })

        .on("dblclick", dblclick)
        .on("click", function(d){
            if (d.name[0].length==1){
                //do nothing
                console.log("nada")
            }else{
                var thisLink = d.url;
                var win = window.open(thisLink, '_blank');
            }
        })
        .call(drag);

    circle
        .transition()
        .duration(2000)
        .attr("r", function(d,i){
            if(howLong[i][0].length==1){
                return rMap(d.weight);
            }
            return radius;
        });

    function dblclick(d) {
        d3.select(this).classed("fixed", d.fixed = false);
    }
    function dragstart(d) {
        d3.select(this).classed("fixed", d.fixed = true);
    }

    console.log("simple nodes")
    $("#titlename").fadeOut("slow")

    text= vis.selectAll("labels")
        .data(force.nodes())
        .enter().append("text")
        .attr("class","labels")
        .attr("x", 8)
        .attr("y", ".31em")
        .text(function(d,i) {
            if(howLong.length>1){
                if(howLong[i][0].length==1){
                     return d.name;           
                }        
            } 
        });
    $(".labels").show();  
    // Use elliptical arc path segments to doubly-encode directionality.
    function tick() {
      path.attr("d", linkArc);
      circle
          .attr("transform", transform);
          text.attr("transform", transform);
    }

    function transform(d) {
      d.x = Math.max(radius, Math.min(w - radius, d.x));
      d.y = Math.max(radius, Math.min(h - radius, d.y));   
      return "translate(" + d.x+ "," + d.y + ")";
    }

    $('circle').tipsy({
        gravity: 'w', 
        html: true, 
        delayIn: 500, 
        title: function() {

            var d = this.__data__;  
                console.log(d);
            if (d.name[0].length==1){
             return "Major Keyword: "+d.name;
            }
             return "Paper Keywords:"+'<br>'+d.name+'<br>'+'<br>'+"Title:"+ '<br>'+d.headline;
        }
    });
    $('#clickZoom').fadeIn();

    var c = false;
    $('#citeRate').slideDown();
    d3.select("#citeRate").classed("selected", true);
}

function stopBigNet(){
    force.stop()
    circle
        .transition()
        .duration(2000)
        .attr("transform", newTransform);
    path
        .transition()
        .duration(2000)    
        .attr("d", linkArc);

    function newTransform(d,i){
            d.y = h; //not links[i].cites
            return "translate(" + d.x+ "," + d.y + ")";
    } 
    // otherTransform = function (d,i){
    //         d.y = h/10; //not links[i].cites
    //         d.x = w/2-thisPaperName/2;
    //         return "translate(" + d.x+ "," + d.y + ")";
    // }         
}



function linkArc(d) {
  var dx = d.target.x - d.source.x,
      dy = d.target.y - d.source.y,
      dr = Math.sqrt(dx * dx + dy * dy);
  return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
}
function transform(d) {
  d.x = Math.max(radius, Math.min(w - radius, d.x));
  d.y = Math.max(radius, Math.min(h - radius, d.y));   
  return "translate(" + d.x+ "," + d.y + ")";
}












svg.call(d3.behavior.zoom() //setting up zoom abilities
   .scale(1.0)
   .scaleExtent([initialZoom, maxZoom]) 
   .on("zoom", function(){
        var t = d3.event.translate;
        var s = d3.event.scale;     
        zoomInOut(t, s);
    })
);

var zoomInOut = function(t, s) {
    if (showReset==true){
        $('#reset').slideDown("slow");
    }
    if (showReset==false){
        $('#reset').slideUp("slow");
    }
    if (s>=initialZoom){
        showReset = true;
    }
    if (s<initialZoom){
        showReset = false;
    }
    vis.attr("transform",
      "translate("+d3.event.translate+ ")"
      + " scale(" + d3.event.scale + ")");
};   

d3.select("#reset").on("click", resetZoom);

function resetZoom(){
    console.log("reset viz")
    vis.attr("transform",
      "translate("+ 0 + "," + 0 + ")"
      + " scale(" + initialZoom + ")");

    showReset = false;
    $('#reset').slideUp("slow");
};

 //don't let people zoom in all of these ways - will mess up clicks etcs
svg.on("mousedown.zoom", null)
    .on("touchstart.zoom", null)
    .on("touchmove.zoom", null)
    .on("dblclick.zoom", null)
    .on("touchend.zoom", null);   


