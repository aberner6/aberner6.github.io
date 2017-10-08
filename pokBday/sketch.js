
var words = [];
var types = [];
var data = [];
var svgMain;

  var w = 1200;
  var h = 900;
  svgMain = d3.select("body").append("svg")
    .attr("width",w).attr("height",h)
    .attr("class","mainSVG"); 
first();
function first() {
  console.log("in here1")
  load();
}
function load() {
  d3.csv("peter.csv", function(d){
    data.push(d);
    for (i=0; i<d.length; i++){
      words.push(data[0][i].Line)
      types.push(data[0][i].ID);
    }
    onedraw();
  })
}
var oneWord;
var voice;
function onedraw(){
  console.log("in here2")
  $("body").on("click", function(){
    console.log("in here2")
    d3.selectAll('.svgText').remove()

    var r = Math.round(Math.random(0, data.length));
    console.log(r);
    
    oneWord = words[r];  // select random word
    voice = types[r];
    
    svgMain.append("text")
      .attr("class","svgText")
      .attr("x",10)
      .attr("y",50)
      .text(oneWord);
    speakOne(oneWord);
    
    console.log(oneWord);
    console.log(voice);
  })
}

function speakOne(oneWord, voice){
  console.log("here")
  var voiceStyle;
  // if(voice=="Male"){
  //   voiceStyle = "UK English Male";
  // }else{
  //   voiceStyle = "Danish Female";
  // }
    voiceStyle = "Norwegian Female";

  $('.svgText').mouseenter(function() { // Attach this function to all mouseenter events for 'a' tags 
    responsiveVoice.cancel(); // Cancel anything else that may currently be speaking
    responsiveVoice.speak(oneWord, voiceStyle); // Speak the text contents of all nodes within the current 'a' tag
  });
}