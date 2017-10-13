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

/* TODO:

- offer mono option
- "Monitor input" switch
*/

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
  draw(chunks);
  // hf.play();
  hf.style = "display: none";
  console.log(hf);
  hf.click();
}
var btn;
function toggleRecording( e ) {
  btn = e;
    if (e.classList.contains("recording")) {
        // stop recording
        audioRecorder.stop();
        e.textContent = "Record";
        e.classList.remove("recording");
        audioRecorder.getBuffers( gotBuffers );
    } else {
        // start recording
        if (!audioRecorder)
            return;
        e.textContent = "Done";
        e.classList.add("recording");
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

//    audioInput = convertToMono( input );

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


var createNodes = function (numNodes, radius, chunks) {
     var nodes = [], 
         width = (radius * 2) + 100,
         height = (radius * 2) + 100,
         angle,
         x,
         y,
         i;
     for (i=0; i<numNodes; i++) {
      angle = (i / (numNodes/2)) * Math.PI; // Calculate the angle at which the element will be placed.
                                            // For a semicircle, we would use (i / numNodes) * Math.PI.
      x = (radius * Math.cos(angle)) + (width/2); // Calculate the x position of the element.
      y = (radius * Math.sin(angle)) + (width/2); // Calculate the y position of the element.
      nodes.push({'id': i, 'x': x, 'y': y, 'audio':chunks[i]});
     }
     console.log(nodes);
     console.log(nodes[0].audio)
     return nodes;
}


var createSvg = function (radius, callback) {
 d3.selectAll('svg').remove();
 var svg = d3.select('#datavis').append('svg:svg')
            .attr('width', (radius * 2)+100)
            .attr('height', (radius * 2)+100);
 callback(svg);
 // var elements2 = svg.selectAll('.thing2')
 //                .data(d3.range(radius)).enter()
 //      .append('g').attr("transform", function(d,i){
 //        // X, Y offset for each day.
 //        if( i % 20 == 0 ){ 
 //          row++; 
 //        }
 //        return "translate(" + (( i % 20 + 1 ) * xOffset - .5 * xOffset) + ", "+(row * yOffset - .5 * yOffset)+")";
 //      })
// elements.append("rect").attr("x",0).attr("y",0).attr("width",20).attr("height",20).attr("fill","white")
}

var oneAud;
var createElements = function (svg, nodes, elementRadius) {
  var rScale = d3.scaleLinear()
      .range([10, 20])
      .domain([0, 20])
  var opaScale = d3.scaleLinear()
    .domain([0,nodes.length])
    .range([.2, 1])
var clicked = true;    
 element = svg.selectAll('circle')
                .data(nodes)
              .enter().append('svg:circle')
                .attr("fill", "aquamarine")
                .attr("opacity", function(d){
                  return opaScale(d.id)
                })
                .attr('cx', function (d, i) {
                  return d.x;
                })
                .attr('cy', function (d, i) {
                  return d.y;
                })
                .attr("r", function(d,i){
                  return elementRadius;
                   // oneAud = d.audio;
                   // var thisAudio = d.audio;
                   // return rScale(oneAud.duration);
                })
                .attr("stroke","white")
                .attr("stroke-width",2)
                .on("click", function(d, i){
                    if(clicked){
                      console.log(clicked)
                      var playThis = d.audio;
                      playThis.currentTime = 0;
                      playThis.play();
                    d3.select(this).transition().attr("fill","white")
                    }
                    if(!clicked){
                      console.log(clicked)
                      var playThis = d.audio;
                      playThis.pause();  
                    d3.select(this).transition().attr("fill","aquamarine")
                      // clicked = !clicked;                    
                    }
                      clicked = !clicked;
                })
}

var draw = function (chunks) {
 var numNodes = chunks.length || 0;
 var radius = canvasWidth/2;
 var elementRadius = 20;
 var nodes = createNodes(numNodes, radius, chunks);
 createSvg(radius, function (svg) {
   createElements(svg, nodes, elementRadius);
 });
}



window.addEventListener('load', initAudio );
