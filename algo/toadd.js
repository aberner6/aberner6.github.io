
loadIt("senses.csv")

function loadIt(csvName){

d3.csv(csvName, function(thisData) {
tData=(thisData);
})
}

for (var i = 0; i < tData.length; i++) {
   tData[i].weight = Math.random();
         // showLines();
} 

myPulse=setInterval(function () {pulseTimer()}, 1000);
function pulseTimer() {
    pulseInputs();
}

$('.').tipsy({
    gravity: 'w', 
    html: true, 
    title: function() {
         return "Trigger a sense input";
    }
});


$('#moreInfoBtn').tipsy({
    gravity: 'e', 
    html: true, 
    title: function() {
         return "Created by the Spatial Information Design Lab & Stefano Fusi Lab"
         +'<br>'+'Researcher: Lyudmila Kushmir'+'<br>'+"Designer/Developer: Annelie Berner"+ '<br>';
    }
});



function pulseInputs(){
	d3.selectAll(".")
	.transition()
	.duration(500)
	.attr("stroke-width", strokeWeight*3)
	.each("end", function(d,i){
	    d3.selectAll(".")
	    .transition()
	    .duration(500)
	    .attr("stroke-width", strokeWeight);
	})
}

d3.selectAll(".")
.on("click", function(d,i){
    clearInterval(myPulse);
    d3.select(this);
    if (d.sense=="smell"){
		addIt = 0;
        calculate("smell");
    }
    if(d.sense=="touch"){
		addIt = 0;
        console.log(d.sense)
        calculate("touch");
    }
})

function calculate(triggerSense){
console.log(triggerSense);
    for (i=0; i<tData.length; i++){
        if(tData[i].sense==triggerSense){
            addIt += tData[i].weight;
        	theIndex=i;
                console.log(theIndex);
                console.log(addIt);
        }
    }
    triggerRoll(addIt, triggerSense, theIndex);
}

// if(addIt>=threshold){//THIS SHOULD  BE HAPPENING @END
//     return //BLAH
// }else{
// 	return //BLAH      
// }
// console.log(tData[theIndexI].weight+"index weight");


function showCaptions(addIs, senseIs, errorIs,thisIndex){
console.log(addIs+"addis"+ senseIs+"senseis"+ errorIs+"erroris"+thisIndex+"thisindex")
myPulse=setInterval(function () {pulseTimer()}, 3000);	
}

var error = 0;
function triggerRoll(addIt, triggerSense, theIndexIs){
     console.log(addIt+"sum "+triggerSense+" sense");
     tSense = triggerSense;
	console.log(tData[0].weight+"old weight?");

    error = threshold-addIt;
    console.log(error+"error");

	showCaptions(addIt, triggerSense, error,theIndexIs);
    console.log(theIndexIs+"indexis");

	// //new weighting
	if(error>0 && random == true){
	for (i= 0; i<input.length; i++){
	    tData[i].weight += .8*error*input[i]; 
	}
	// showLines();
	}
	else{
	}
	if(error<0){
	    trigger = true;
	    console.log("trigger"+trigger)
	}
console.log(tData[0].weight+"new weight");
}
// $("#equation p").replaceWith("<p>input of "+1+"* link weight of "+(Math.floor(tData[thisIndex].weight * 100) / 100)+"<b>>=</b> threshold of "+threshold+"</p>");
// $("#equation").show(1000);
// $("#equation").delay(2000).hide();

// else{
// $("#equation p").replaceWith("<p>input of "+1+"* link weight of "+(Math.floor(tData[thisIndex].weight * 100) / 100)+"<b><</b> threshold of "+threshold+"</p>");
// console.log(tData[theIndexI].weight+"index weight");
// $("#equation").show(1000).show();
// $("#equation").delay(2000).hide();
// }

