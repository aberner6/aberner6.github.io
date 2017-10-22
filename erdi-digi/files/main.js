/* Copyright 2013 Chris Wilson

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

window.AudioContext = window.AudioContext || window.webkitAudioContext;

var audioContext = new AudioContext();
var audioInput = null,
    realAudioInput = null,
    inputPoint = null,
    audioRecorder = null;
var rafID = null;
var analyserContext = null;
var canvasWidth, canvasHeight;
var recIndex = 0;


function saveAudio() {
    audioRecorder.exportWAV( doneEncoding );
    // could get mono instead by saying
    // audioRecorder.exportMonoWAV( doneEncoding );
}

function gotBuffers( buffers ) {
    var canvas = document.getElementById( "wavedisplay" );

    drawBuffer( canvas.width, canvas.height, canvas.getContext('2d'), buffers[0] );

    // the ONLY time gotBuffers is called is right after a new recording is completed - 
    // so here's where we should set up the download.
    audioRecorder.exportWAV( doneEncoding );
}

function doneEncoding( blob ) {
    Recorder.setupDownload( blob, "myRecording" + ((recIndex<10)?"0":"") + recIndex + ".wav" );
    recIndex++;
    makeLink(blob);
}
var chunks = [];
function makeLink(blob){
  // let blob = new Blob(chunks, {type: media.type })
    let url = URL.createObjectURL(blob)
    , li = document.createElement('li')
    , mt = document.createElement('audio')
    , hf = document.createElement('a')
  ;
  mt.controls = true;
  mt.src = url;
  hf.href = url;
  hf.download = `${recIndex}${'.wav'}`;
  hf.innerHTML = `download ${hf.download}`;
  li.appendChild(mt);
  li.appendChild(hf);
  ul.appendChild(li);
  ul.style = "display: none";

  chunks.push(mt);
  andthen();
  // draw(chunks);
  // hf.play();
  hf.style = "display: none";
  console.log(hf);
  hf.click();
}
var btn;
function toggleRecording( e ) {
  console.log(e);
    if (e) {
        // stop recording
        audioRecorder.stop();
        audioRecorder.getBuffers( gotBuffers );
        // andthen();
    } else {
        // start recording
        if (!audioRecorder)
            return;
        audioRecorder.clear();
        audioRecorder.record();
    }
}

function convertToMono( input ) {
    var splitter = audioContext.createChannelSplitter(2);
    var merger = audioContext.createChannelMerger(2);

    input.connect( splitter );
    splitter.connect( merger, 0, 0 );
    splitter.connect( merger, 0, 1 );
    return merger;
}

function cancelAnalyserUpdates() {
    window.cancelAnimationFrame( rafID );
    rafID = null;
}
var svgNone;
function updateAnalysers(time) {
    if (!analyserContext) {
        var canvas = document.getElementById("analyser");
        canvasWidth = canvas.width;
        canvasHeight = canvasWidth;
        console.log(canvasHeight)

        analyserContext = canvas.getContext('2d');
    }

    // analyzer draw code here
    {
        var SPACING = 3;
        var BAR_WIDTH = 1;
        var numBars = Math.round(canvasWidth / SPACING);
        var freqByteData = new Uint8Array(analyserNode.frequencyBinCount);

        analyserNode.getByteFrequencyData(freqByteData); 

        analyserContext.clearRect(0, 0, canvasWidth, canvasHeight);
        analyserContext.fillStyle = '#F6D565';
        analyserContext.lineCap = 'round';
        var multiplier = analyserNode.frequencyBinCount / numBars;
        // Draw rectangle for each frequency bin.
        for (var i = 0; i < numBars; ++i) {
            var magnitude = 0;
            var offset = Math.floor( i * multiplier );
            // gotta sum/average the block, or we miss narrow-bandwidth spikes
            for (var j = 0; j< multiplier; j++)
                magnitude += freqByteData[offset + j];
            magnitude = magnitude / multiplier;
            var magnitude2 = freqByteData[i * multiplier];
            analyserContext.fillStyle = "white";

            // analyserContext.fillStyle = "hsl( " + Math.round((i*360)/numBars) + ", 100%, 50%)";
            analyserContext.fillRect(i * SPACING, canvasHeight, BAR_WIDTH, -magnitude);
        }
    }
    
    rafID = window.requestAnimationFrame( updateAnalysers );
}

function toggleMono() {
    if (audioInput != realAudioInput) {
        audioInput.disconnect();
        realAudioInput.disconnect();
        audioInput = realAudioInput;
    } else {
        realAudioInput.disconnect();
        audioInput = convertToMono( realAudioInput );
    }

    audioInput.connect(inputPoint);
}

function gotStream(stream) {
    inputPoint = audioContext.createGain();

    // Create an AudioNode from the stream.
    realAudioInput = audioContext.createMediaStreamSource(stream);
    audioInput = realAudioInput;
    audioInput.connect(inputPoint);

    analyserNode = audioContext.createAnalyser();
    analyserNode.fftSize = 2048;
    inputPoint.connect( analyserNode );

    audioRecorder = new Recorder( inputPoint );

    zeroGain = audioContext.createGain();
    zeroGain.gain.value = 0.0;
    inputPoint.connect( zeroGain );
    zeroGain.connect( audioContext.destination );
    updateAnalysers();
}

function initAudio() {
        if (!navigator.getUserMedia)
            navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        if (!navigator.cancelAnimationFrame)
            navigator.cancelAnimationFrame = navigator.webkitCancelAnimationFrame || navigator.mozCancelAnimationFrame;
        if (!navigator.requestAnimationFrame)
            navigator.requestAnimationFrame = navigator.webkitRequestAnimationFrame || navigator.mozRequestAnimationFrame;

    navigator.getUserMedia(
        {
            "audio": {
                "mandatory": {
                    "googEchoCancellation": "false",
                    "googAutoGainControl": "false",
                    "googNoiseSuppression": "false",
                    "googHighpassFilter": "false"
                },
                "optional": []
            },
        }, gotStream, function(e) {
            alert('Error getting audio');
            console.log(e);
        });
}





window.addEventListener('load', initAudio );

var elementRadius = 20;
var circie;

var width = 960,
    height = 500;
var svg = d3.select("#datavis").append("svg")
    .attr("width", width)
    .attr("height", height)
    .on("mousemove", mousemove)
    .on("mousedown", mousedown)
    .on("mouseup",mouseup);
  console.log("hi")


  var fill = d3.scale.category20();
  var force = d3.layout.force()
      .size([width, height])
      .nodes([{x: width/2, y: height/2, a: ""}]) // initialize with a single node
      // .attr("fill","none")
      .linkDistance(30)
    // .charge(function(d){
    //     var charge = -300;
    //     if (d.index === 0) charge = 10 * charge;
    //     return charge;
    // })
      .charge(-60)
      .on("tick", tick);

  svg.append("rect")
      .attr("width", width)
      .attr("height", height);

  var nodes = force.nodes(),
      links = force.links(),
      node = svg.selectAll(".node"),
      link = svg.selectAll(".link");

  var cursor = svg.append("circle")
      .attr("r", 30)
      .attr("transform", "translate(-100,-100)")
      .attr("class", "cursor");

  restart();

  function mousemove() {
    cursor.attr("transform", "translate(" + d3.mouse(this) + ")");
  }

var recording;
  function mousedown() {
    console.log("hihi")
    var point = d3.mouse(this);
    circie = svg.append("circle")
        .attr("r", 30)
        .attr("cx", function(d) { return point[0]; })
        .attr("cy", function(d) { return point[1]; })
        .attr("fill","red")
        .attr("class","recording");
    recording = false;
    toggleRecording(recording);
  }



var punta;
  function mouseup(){
    circie.remove();
    recording = true;
    toggleRecording(recording);

    console.log("mouseup")
    punta = d3.mouse(this);
    // andthen(punta);

  }
  function andthen(){

    console.log(chunks.length+"chunks length");
    var numNodes = chunks.length || 0;
    if(chunks.length>1){
      var point = punta,
          node = {x: point[0], y: point[1], a: chunks[numNodes-1]},
          n = nodes.push(node);      
    }else if(chunks.length==1){
      console.log(chunks.length+"1")
      var point = punta,
          node = {x: point[0], y: point[1], a: chunks[0]},
          n = nodes.push(node);    
    }else{
      console.log(chunks.length+"0")
      var point = punta,
          node = {x: point[0], y: point[1], a: "nada"},
          n = nodes.push(node);        
    }


    // add links to any nearby nodes
    nodes.forEach(function(target) {
      var x = target.x - node.x,
          y = target.y - node.y;
      if (Math.sqrt(x * x + y * y) < 30) {
        links.push({source: node, target: target});
      }
    });
    restart();
  }
  function tick() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
        .on("mouseover", function(d){
          console.log(d);
            var playThis = d.a;
            playThis.currentTime = 0;
            playThis.play();
            d3.select(this).transition().attr("fill","white")
        })
        .on("mouseout", function(d){
            var playThis = d.a;
            playThis.pause();  
            d3.select(this).transition().attr("fill","aquamarine")
        })
  }

  function restart() {
    link = link.data(links);

    link.enter().insert("line", ".node")
        .attr("class", "link");

    node = node.data(nodes);
    
    var clicked = true;    

    node.enter().insert("circle", ".cursor")
        .attr("class", "node")
        .attr("fill","black")
        .attr("r", elementRadius) //adding here?
        .call(force.drag);

    force.start();
  }
// }
