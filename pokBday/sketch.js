
var table;
var words = [];
function preload() {
  table = loadTable("peter.csv", "csv", "header");
}
var svgMain;
function setup() {
  // createCanvas(screen.width, screen.height);
  var w = screen.width;
  var h = screen.height;
  svgMain = d3.select("#container").append("svg")
    .attr("width",w).attr("height",h)
    .attr("class","mainSVG"); 

    words.push(table.getColumn("Line"))
    drawOne();
}
var oneWord;
function drawOne(){
  var r = Math.round(random(0, words.length)*100);
  oneWord = words[0][r];  // select random word
  svgMain.append("text")
    .attr("class","svgText")
    .attr("x",10)
    .attr("y",50)
    .text(oneWord);

  // text(oneWord,10,50);  // draw the word
  console.log(words);
  // if(responsiveVoice.voiceSupport()){
  speakOne();
  // }
}

function speakOne(){
$('.svgText').mouseenter(function() { // Attach this function to all mouseenter events for 'a' tags 
  responsiveVoice.cancel(); // Cancel anything else that may currently be speaking
  responsiveVoice.speak($(this).text()); // Speak the text contents of all nodes within the current 'a' tag
});
  // setTimeout(responsiveVoice.speak(oneWord)
  // ,15000);
  // responsiveVoice.speak(oneWord, "UK English Male", {volume: 1});
  // responsiveVoice.speak(oneWord, "UK Male", {rate: 1.5});
}