/**********

NODELINKS.JS

Author: Annelie Bremmer, Abhiruchi Chhikara

**********/



/*** Variables ***/


//Datavis
//number of keywords 0-1, 0 will give a lot of keywords
var filterNum = 0.5;


// SVG
var svg;
var w = window.outerWidth;
var h = window.innerHeight-50;

// for Key 
var startingX = 20;
var startingY = 349;//523;
var startingXLabel = 34;
var startingYLabel = 351;//525;
var t = [1];
var keyTypes;
//= ["Video","Article","Book","Exhibit","Installation","Paper","List", "Essay"];

// Keywords
var keywords = [];
var keywordSorted;
var totalKeywords = [];
var theseKeywords = [];
var focusKeywords = [];
var uniqueKeywords;
var mostKeyed;
var uniqueMostKeyed;
var uniqueTotalsKeyed;

//Authors
var authors = [];
var authorsSorted;
var totalAuthors = [];
var theseAuthors = [];
var uniqueAuthors;
var uniqueADone;
var uniqueMostAuthors;
var uniqueTotalsAuthors;
var maxAuthor;
var totalA = [];

//Years
var years = [];
var uniqueYears;
var minYear;
var maxYear;

//Medium/ journal type
var journalTypes = [];
var uniqueTypes;


var eachEntry;
var xScale;
var xAxis;

var alongWidth;



var kLabels = false;
var allLabels = true;


var goSecond = false;
var totals = [];

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


var maxCited;
var thisTotal;
var totalsCircles;
var textsAre;
var heightScale;
var singleScale;
var thisData = [];


var uniqueKDone=false;

var theX = [];
var maxEntries;
var citeNums = [];
var radius = 3;
    //Width and height

var newCircle;

var color; //=  d3.scale.category20c();

var colorSpectrum = [
    "#fc5988" 
    ,"#b14a41"
    ,"#6ab054"
    ,"#8675ee"
    ,"#fcb752"
    ,"#89e2fe"]

var initialZoom = 1,
    maxZoom = 10;


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

var fishEyeGo = false;

var whatis = [];

var saveOne=[];
var thisY = [];
var thisX = [];

var links = [];
var nodeCited = [];
var nodes = {};
var drag;
var n;
var maxNodeCited;

var rMap; 
var circle, path, text;
var force;
var scaleRadius = 5;
var howLong = [];
var nodes = {};
var thisPaperName;



svg = d3.select("#container")
    .append("svg")
    .attr("width", w)
    .attr("height", h)

var vis = svg //for the visualization
.append('svg:g')
.attr("transform","translate("+ 0 + "," + 0 + ")");  



/***** KEY *****/

$("#key").click(function() {
    $(".keyCirc, .newlabel, .paperCirc, .journoCirc, .descriplabel").toggle();
})   

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
    .text("Colored Dot   Paper") 

var keyCircle = vis.selectAll("keyCirc")
   .data(t)
    .enter()
    .append("circle").attr("class","keyCirc")
    .attr("cx", 20)
    .attr("cy", startingY)
    .attr("fill", "white")
    .attr("stroke", "gray")
    .attr("r",8)

var keyLabel = vis.selectAll("keylabel")
    .data(t)
    .enter()
    .append("text").attr("class","newlabel")
    .attr("x", 34)
    .attr("y", startingYLabel)
    .text("White Dot   Major Keyword")     

var journoTitle = vis.selectAll("keylabel")
        .data(t)
        .enter()
        .append("text").attr("class","newlabel")
        .attr("x", 17)
        .attr("y", 391)
        .text("Each color represents a medium:")    

 d3.select("#titlename").classed("selected", true);
    d3.select("#subtitlename").classed("selected", true);
    $("#titlename").slideDown("slow")
    $("#subtitlename").slideDown("slow")

    

/*** Import Data, sort and create nodes  ***/

// loadData("deskResearch.csv", filterNum)   // choose threshhold 0.001 to 1 to choose number of keywords to show
//old day

//new way
var dataG = [];
$(document).ready(function() {

  // start get - URI (REPLACE KEY WITH YOUR OWN, callback function)
  
  // see http://coderwall.com/p/duapqq for tutorial on using Google Spreadsheet as JSON
    $.getJSON("https://spreadsheets.google.com/feeds/list/16GV2RRNe1GKXskyXrIlV4A4lHGQXY9x0_n_iHPnudf0/oh09z64/public/values?alt=json", function(datoo) {
    // 16GV2RRNe1GKXskyXrIlV4A4lHGQXY9x0_n_iHPnudf0
        var entry = datoo.feed.entry;
        console.log(entry);
        for (i=0; i<entry.length; i++){
            dataG.push({
                "author": entry[i]['gsx$author']['$t'],
                "keywords": entry[i]['gsx$keywords']['$t'],
                "summary": entry[i]['gsx$summary']['$t'],
                "link":entry[i]['gsx$link']['$t'],
                "medium":entry[i]['gsx$medium']['$t'],
                "year":entry[i]['gsx$year']['$t'],
                "title":entry[i]['gsx$title']['$t'],
            })
        }
        // console.log(dataG);
        // loadData(dataG, filterNum);
    }); // end get 
    $.getJSON("https://spreadsheets.google.com/feeds/list/16GV2RRNe1GKXskyXrIlV4A4lHGQXY9x0_n_iHPnudf0/o1c0n6j/public/values?alt=json", function(datoo) {
        var entry = datoo.feed.entry;
        console.log(entry);
        for (i=0; i<entry.length; i++){
            dataG.push({
                "author": entry[i]['gsx$author']['$t'],
                "keywords": entry[i]['gsx$keywords']['$t'],
                "summary": entry[i]['gsx$summary']['$t'],
                "link":entry[i]['gsx$link']['$t'],
                "medium":entry[i]['gsx$medium']['$t'],
                "title":entry[i]['gsx$title']['$t'],
            })
        }
        // console.log(dataG);
        loadData(dataG, filterNum);

    }); // end get 


    // loadData(dataG, filterNum);
}); // end document.ready


/*** Setting up Zoom Ability  ***/
svg.call(d3.behavior.zoom() 
   .scale(1.0)
   .scaleExtent([initialZoom, maxZoom]) 
   .on("zoom", function(){
        var t = d3.event.translate;
        var s = d3.event.scale;     
        zoomInOut(t, s);
    })
);

//don't let people zoom in all of these ways - will mess up clicks etcs
svg.on("mousedown.zoom", null)
    .on("touchstart.zoom", null)
    .on("touchmove.zoom", null)
    .on("dblclick.zoom", null)
    .on("touchend.zoom", null);   

d3.select("#reset").on("click", resetZoom);



/***********
  FUNCTIONS 
************/


/***loadData()***/

function loadData(dataName, filterNum){
    
    citeNums.length = 0;  // number of times cited
    keywords.length = 0;  // number of unique keywords
    authors.length = 0;   // number of author names
  
    theseKeywords.length = 0; 
    theseAuthors.length = 0;
    
    journalTypes.length = 0;
    
    totalAuthors.length = 0;
    totalKeywords.length = 0;
    
    focusKeywords.length = 0;
    
    
    //load and organize data
    //old way
    // d3.csv(csvName, function(data) {
        thisData=(dataName);
    //old way

    data = dataName;        
        for (i = 0;i<data.length; i++){ 
            
            // if year data exists 
            if(isNaN(data[i].year)==false){
                years[i] = parseInt(data[i].year);
            }
            
            //if value doesnt exist else if it exists add to array 
            // if(isNaN(parseInt(thisData[i].value))){
            //      citeNums[i]=(0);
            // }else {
            //      citeNums[i]=(parseInt(thisData[i].value))
            // }    
            
            /*MATRIX 1 array per entry*/
            
            //if keywords exist add to array 
            if (data[i].keywords!="undefined"){
                keywords[i] = data[i].keywords.split(", ");
            }
            
            // if originator exists add to array 
            if(data[i].author!="undefined"){
                authors[i] = data[i].author.split(", ");
            }
            
            // 1 array with all the keywords 
            for (j=0; j<keywords[i].length; j++){
                theseKeywords.push(keywords[i][j]);   
            }
            
             // 1 array with all the authors
            for (j=0; j<authors[i].length; j++){
                theseAuthors.push(authors[i][j]);            
            }
            
            
            
            // 1 array with corresponding Medium/ Journal Types
            if(data[i].medium!="undefined"&&data[i].medium.length!=0){
                journalTypes[i] = data[i].medium.toLowerCase();
               }
    }; 
   
    
    // remove empty keywords and authors entries
        
    keywordSorted = false;
    authorsSorted = false;
    
    
    for (i=0; i<theseKeywords.length; i++){ 
        if(theseKeywords[i].length==0){
          theseKeywords.splice(i,1)
          i--;
        }
        keywordSorted = true;  
    }
    

    for (i=0; i<theseAuthors.length; i++){ 
        if(theseAuthors[i].length==0){
          theseAuthors.splice(i,1)
           i--;
        }
         authorsSorted = true;
    }
   

    uniqueTypes = journalTypes.filter( onlyUnique ); //finds unique names onlyUnique is a function defined later
    uniqueTypes = uniqueTypes.sort();
    keyTypes = uniqueTypes;
        
    //
    color = d3.scale.ordinal()
        .domain([0, uniqueTypes.length])
        .range(colorSpectrum);
        
        
    uniqueKeywords = theseKeywords.filter( onlyUnique ); //finds unique keywords
    uniqueAuthors = theseAuthors.filter( onlyUnique ); //finds unique keywords
        
        
    //creates a new array with the sums of all the different Keywords and also creates list of focus Keywords
    if(keywordSorted==true){
        for (i = 0; i<theseKeywords.length; i++){
            totalKeywords[i]= keyConsolidation(theseKeywords[i])
            mostKeyed = d3.max(totalKeywords); 
            if(totalKeywords[i]>mostKeyed*filterNum){
                focusKeywords.push(theseKeywords[i]);
            }
        } 
    }
        
    uniqueMostKeyed = focusKeywords.filter( onlyUnique ); //finds unique keywords from focused
    keyTypes = keyTypes.sort(); // alphabetical order
        
    
   /***FOR KEY ***/
    var journoCircle = vis.selectAll("journoCirc")
        .data(keyTypes)
        .enter()
        .append("circle")
        .attr("class","journoCirc")
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

        createNodes();    
    
        
   /** Functions **/
        
    //some magic function to return uniquevalues
    function onlyUnique(value, index, self) { 
        return self.indexOf(value) === index;
    } 
        
    //return number of times a keyword was used 
    function keyConsolidation(givenKey,i) { 
        var total = 0;
        for (i = 0;i<theseKeywords.length; i++){ 
            if(theseKeywords[i] == givenKey){
                total++;
            }
        }
         return total;
    } 
        
    //return number of times an author name was cited
    function authorConsolidation(givenAuthor,i) { 
        var total = 0;
        for (i = 0;i<theseAuthors.length; i++){ 
            if(theseAuthors[i] == givenAuthor){
                total++;
            }
        }
         return total;
     } 
   
    //return number of times an year was cited
    function valueConsolidation(givenYear, i) { 
        var total = 0;
        for (i = 0;i<data.length; i++){ 
            if(data[i].year!="undefined" && data[i].year== givenYear){
                total++;
            }
        }
         return total;
     } 
    
    //return title of the journal entry 
    function toTitleCase(str){
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }
        
        
    // }) //end of d3.csv...
    
} //end of function loadData()



function createNodes(){
    links = [];
    if(itsDone==false){
 
        for (i=0; i<thisData.length; i++){ 
            for (j=0; j<uniqueMostKeyed.length; j++){ 
                if (keywords[i].indexOf(uniqueMostKeyed[j])!=-1){
                    
                    links.push({"source":keywords[i],"target":uniqueMostKeyed[j],"sourceTitle":thisData[i].medium.toLowerCase(), "headline":thisData[i].title, "authors":thisData[i].author, "url":thisData[i].link}) 
                     
                }
            }
        } 
        simpleNodes();
    }
    
}

function simpleNodes(){
    
    var thisMap;
    var thisWeight = [];
    var maxWeight;
    
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

    path = vis.selectAll("path")
        .data(force.links())
        .enter().append("path")
        .attr("class","link") 
        .attr("stroke", function(d,i){
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

    text= vis.selectAll("labels")
        .data(force.nodes())
        .enter().append("text")
        .attr("class","labels")
        .attr("x", 0)
        .attr("y", ".31em")
        .attr("text-anchor", "start")
        .text(function(d,i) {
            if(howLong.length>1){
                if(howLong[i][0].length==1){
                     return d.name;           
                }        
            } 
        });
    
    // $(".labels").show();  
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
            } else{
                 return "Title:"+ '<br>'+d.headline+'<br>'+'<br>'+"Keywords:"+'<br>'+d.name;                
            }
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

function resetZoom(){
    console.log("reset viz")
    vis.attr("transform",
      "translate("+ 0 + "," + 0 + ")"
      + " scale(" + initialZoom + ")");

    showReset = false;
    $('#reset').slideUp("slow");
};






