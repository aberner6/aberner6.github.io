var squareSize = 45;
var theGrid = [0,1.1,1.2,2.1,2.2,2.3,2.4,3.1,3.2,3.3];
var gridMatrix = [];
var allTheDivs = [];
var firstRun = true;
var hasLost = false;
var isMobile = false;
var w;
var h;

/* Game logic */
var amountOfTiles = 3;
var theGameSequence = [];
var userSequence = [];
var selectedDivs = [];
var userClicks = 0;
var correctTiles = 0;

var gridWidth;
function createBackground(){
	w = window.innerWidth;
	h = window.innerHeight;

	if(!isMobile){
		console.log("I'm big");
		gridWidth = Math.round(w/squareSize)-9;
		var gridHeight = Math.round(h/squareSize-1);
		var squareAmount = gridWidth*gridHeight;

		var inserstGrid = document.createElement("div");
		inserstGrid.setAttribute("class", "container");
		inserstGrid.setAttribute("id", "grid");
		inserstGrid.setAttribute("style", "width:"+gridWidth*45 +"px");
		document.getElementById('background').appendChild(inserstGrid);
		document.getElementById('leftCollum').setAttribute("style", "width:"+(w-(gridWidth*45)-10)+"px; height:"+gridHeight*45+"px;");
		document.getElementById('history').setAttribute("style", "max-height:"+((gridHeight/2)*45)+"px;");
	}

	if (isMobile) {
		console.log("I'm small");
		gridWidth = Math.round(w/squareSize);
		var gridHeight = gridWidth;
		var squareAmount = gridWidth*gridHeight;

		var inserstGrid = document.createElement("div");
		inserstGrid.setAttribute("class", "container");
		inserstGrid.setAttribute("id", "grid");
		inserstGrid.setAttribute("style", "width:"+gridWidth*45 +"px");
		document.getElementById('background').appendChild(inserstGrid);
	}

	for (var i = 0; i < gridHeight; i++) {
		gridMatrix[i] = []
	}

	for (var i = 0; i < gridHeight; i++) {
		for (var e = 0; e < gridWidth; e++) {
			var randomGrid = Math.floor(Math.random()*5);
			var oldE = e-1;

			if(typeof gridMatrix[i][e] == 'undefined' || gridMatrix[i][e] == "x") {	

				if (randomGrid == 0 && gridMatrix[i][e] != 3.1 && gridMatrix[i][e] != 3.2 && gridMatrix[i][e] != 3.3) {
					gridMatrix[i][e] = 0;
				}

				if (randomGrid == 1) {
					if (gridMatrix[i].length <= gridWidth-2 && gridMatrix[i][e+1] != 2.3 && gridMatrix[i][e] != 3.1 && gridMatrix[i][e+1] != 3.2 && gridMatrix[i][e+1] != 3.3 && gridMatrix[i][e+1] != 4.2) {
						gridMatrix[i][e] = 1.1;
						gridMatrix[i][e+1] = 1.2;
					}
				}

				if (randomGrid == 2) {
					if (gridMatrix[i].length <= gridWidth-2 && i+1 < gridMatrix.length && gridMatrix[i][e+1] != 2.3 && gridMatrix[i][e] != 3.1 && gridMatrix[i][e+1] != 3.2 && gridMatrix[i][e+1] != 3.3 && gridMatrix[i][e+1] != 4.2) {
						gridMatrix[i][e] = 2.1;
						gridMatrix[i][e+1] = 2.2;
						gridMatrix[i+1][e] = 2.3;
						gridMatrix[i+1][e+1] = 2.4;
					}
				}

				if (randomGrid == 3) {
					if (gridMatrix[i].length <= gridWidth-2 && i+1 < gridMatrix.length && gridMatrix[i][e+1] != 2.3 && gridMatrix[i][e] != 3.1 && gridMatrix[i][e+1] != 3.2 && gridMatrix[i][e+1] != 3.3 && gridMatrix[i][e+1] != 4.2) {
						gridMatrix[i][e] = 3.1;
						gridMatrix[i][e+1] = 3.2;
						gridMatrix[i+1][e] = 3.3;
						gridMatrix[i+1][e+1] = "x";
					}
				}

				if (randomGrid == 4) {
					if (gridMatrix[i].length <= gridWidth-3 && gridMatrix[i][e+1] != 2.3 && gridMatrix[i][e] != 3.1 && gridMatrix[i][e+1] != 3.2 && gridMatrix[i][e+1] != 3.3 && gridMatrix[i][e+1] != 4.2 && gridMatrix[i][e+2] != 2.3 && gridMatrix[i][e] != 3.1 && gridMatrix[i][e+2] != 3.2 && gridMatrix[i][e+2] != 3.3 && gridMatrix[i][e+2] != 4.2) {
						gridMatrix[i][e] = 1.1;
						gridMatrix[i][e+1] = 4.2;
						gridMatrix[i][e+2] = 1.2;
					}
				}

				if(typeof gridMatrix[i][e] == 'undefined' || gridMatrix[i][e] == "x") {
					gridMatrix[i][e] = 0;
				}
			}
		}
	}
	fillTheGrid(gridHeight,gridWidth);	
};

function resizeBackground(){
	var mobileWidth = 768;
	if (w <= mobileWidth) {
		isMobile = true;
	} else {
		isMobile = false;
	}
	document.getElementById("grid").remove();
	createBackground();
}

var divId;
var specialDiv = [];

function fillTheGrid(gridHeight,gridWidth) {
	divId = 0;
	for (var i = 0; i < gridHeight; i++) {
		for (var e = 0; e < gridWidth; e++) {
			var element = document.createElement("div");
			var firstNum = String(gridMatrix[i][e]).charAt(0);
			var secondNum = String(gridMatrix[i][e]).charAt(2);
			var randomGridTile = Math.floor(Math.random() * 5) + 1;
			element.setAttribute("style", "background-image:url('assets/img/grid/0"+firstNum+"/"+secondNum+"/"+randomGridTile+".svg');opacity:0;");
		    element.setAttribute("id", "Div"+divId);
	    	if (firstNum == 0) {
	    		element.setAttribute("onclick","isSpecialDiv(" + divId +","+randomGridTile+");");
	    		element.setAttribute("class", "canHover");
	    		specialDiv.push([divId,randomGridTile]);
	    	}
		    document.getElementById('grid').appendChild(element);
		    allTheDivs.push("Div"+divId);
		    divId++;
		}
	}
	fadeTheGrid();
	//setupPuzzle();
}

var f;
function fadeTheGrid(){
	f = 0;
	setTimeout(function () {
    	var index = Math.floor(Math.random() * allTheDivs.length);
		document.getElementById(allTheDivs[index]).style.opacity = "1";
		allTheDivs.splice(index, 1);
    	f++;
    	if (f < divId) {
        	fadeTheGrid();
      	}
	}, 0)
}

function isSpecialDiv(div,tile){
	if (!hasLost) {
		console.log("clicked div is " + div + " and is tile " + tile);
		userSequence[userClicks] = tile
		selectedDivs[userClicks] = div;
		userClicks++
		document.getElementById("Div"+div).style.backgroundColor = "grey";

		if (userClicks == amountOfTiles) {
			for (var i = 0; i < theGameSequence.length; i++) {
				if(theGameSequence[0] == userSequence[i] || theGameSequence[1] == userSequence[i] || theGameSequence[2] == userSequence[i]){
					if(theGameSequence[i] == userSequence[i]){
						console.log("position : " + i + " is correct");
						var element = document.createElement("div");
						element.setAttribute("style", "background-image:url('assets/img/grid/00/"+userSequence[i]+".svg');background-color:green;");
						element.setAttribute("class","hist");
						document.getElementById('history').appendChild(element);
						correctTiles++;
					} else {
						console.log("position : " + i + " is in the sequence but wrong");
						var element = document.createElement("div");
						element.setAttribute("style", "background-image:url('assets/img/grid/00/"+userSequence[i]+".svg');background-color:yellow;");
						element.setAttribute("class","hist");
						document.getElementById('history').appendChild(element);
					}
				} else {
					console.log("position : " + i + " is just wrong");
					var element = document.createElement("div");
					element.setAttribute("style", "background-image:url('assets/img/grid/00/"+userSequence[i]+".svg');background-color:red;");
					element.setAttribute("class","hist");
					document.getElementById('history').appendChild(element);
				}
			}
			if (correctTiles == amountOfTiles) {
				if (introed) {
					hasWon();
					$("#background").css("pointer-events","all");
				} else {
					setupPuzzle();
				}
			} else {
				if(introed == false){
					console.log("in intro still")
					terminalTextArray.push("code "+ userSequence[0] +","+ userSequence[1] +","+ userSequence[2] + " access denied","red means wrong pattern and wrong order","yellow means right pattern but wrong order","green means right pattern and right order!","<a href='#' onclick='resetThePuzzle()'>try again</a>");					
					terminalText();
					
				} else{
					console.log("intro is done")
					terminalText("code "+ userSequence[0] +","+ userSequence[1] +","+ userSequence[2] + " access denied <a href='#' onclick='resetThePuzzle()'>try again</a>");					
					$("#background").css("pointer-events","all");
					var elem = document.getElementById('history');
  					elem.scrollTop = elem.scrollHeight;
				}
				hasLost = true;
			}
		}
	} else {
		resetThePuzzle();
	}
}




function hasWon(){
	console.log("you win!");
	for (var q = 0; q < theGameSequence.length; q++) {
		document.getElementById("Div"+selectedDivs[q]).style.backgroundColor = "white";
	}
	document.getElementById("historyContainer").setAttribute("style","display:none");

	document.getElementById("loginPrompt").remove();
	var element = document.createElement("div");
	element.setAttribute("class", "prompt");
	element.setAttribute("id", "loginPrompt");
	document.getElementById('text').appendChild(element);
	// if(localStorage.getItem('hasWon')=='yes'){
		// terminalTextArray = [];
		// terminalTextArray.push("access granted!","invitation[part1]","help us debug the bug of all bugs: ethics in connected devices","","Wednesday, March 21st","16-19H","AMSTERDAM","DRINKS AND SNACKS","","join us for a workshop as we seek to understand","ethical reflection and decision-making","when creating IOT devices","we hope to learn from you","and create ideas with you","about how to [keep | bring | remember] ethics","during the design+dev process","the <a href='#' onclick='http://www.ciid.dk'>Copenhagen Institute of Interaction Design</a> will run the workshop","as part of research project <a href='#' onclick='http://virteuproject.eu'>VIRT-EU</a>","we will use your inputs to start building tools","to try to support ethical reflection and decision-making","when designing connected things","","JOIN US!");					
		// console.log(terminalTextArray)
		// terminalText();
	// }else{
		document.getElementById("grid").remove();
	// }

	var gridHeight = Math.round(h/squareSize-1);
	document.getElementById('leftCollum').setAttribute("style", "width:"+(w-10)+"px; height:"+gridHeight*45+"px;");
	
	// 420px
	if(isMobile){
		document.getElementById('text').setAttribute("style", "max-height:460px;");
	}else{}

	terminalTextArray.push("access granted!","invitation[part1]","help us debug the bug of all bugs: ethics in connected devices","","Wednesday, March 21st","16-19H","AMSTERDAM","DRINKS AND SNACKS","","join us for a workshop as we seek to understand","ethical reflection and decision-making","when creating IOT devices","we hope to learn from you","and create ideas with you","about how to [keep | bring | remember] ethics","during the design+dev process","the <a href='#' onclick='http://www.ciid.dk'>Copenhagen Institute of Interaction Design</a> will run the workshop","as part of research project <a href='#' onclick='http://virteuproject.eu'>VIRT-EU</a>","we will use your inputs to start building tools","to try to support ethical reflection and decision-making","when designing connected things","",
		"JOIN US!","","<div><span class='virt-eu'>virt-eu$: </span><label>name</label><input type='text' name='field1' placeholder='full name'/></div>",
		"<div><span class='virt-eu'>virt-eu$: </span><label>where do you work?</label><input type='text' name='field2' placeholder='workplace'/></div>",
		"<div><span class='virt-eu'>virt-eu$: </span><label>job titles</label><input type='text' name='field3' placeholder='dev. + business'/></div>",
		"<div><span class='virt-eu'>virt-eu$: </span><label>email</label><input type='email' name='field4' placeholder='bella@appleseed.com'/></div>",
		"<div><span class='virt-eu'>virt-eu$: </span><label>mobile</label><input type='tel' name='field5' placeholder='phone number'/></div>",
		"<div><span class='virt-eu'>virt-eu$: </span><button type='submit' id='submit-form'>Submit</button></div></form>"
	);					
	terminalText();
	 $("#myinput").keydown(function (e) { if(e.which == 13) e.preventDefault(); });
	document.getElementById('email').setAttribute("style", "display:block;");

	// localStorage.setItem('hasWon', 'yes');
}

var amountWrong = 0;
function resetThePuzzle(){
	amountWrong++;
	hasLost = false;
	if(amountWrong < 10){
		for (var q = 0; q < theGameSequence.length; q++) {
			document.getElementById("Div"+selectedDivs[q]).style.backgroundColor = "white";
		}
		userClicks = 0;
		correctTiles = 0;
		userSequence = [];
		selectedDivs = [];
	} else {
		terminalText("buffer overflow too many attempts");
		setTimeout(function(){
			hasWon();
		}, 5000);
	}
}

function setupPuzzle(){
	clicks(which1, which2, which3);

	//document.getElementById("remove").remove();
	$(".remove").remove();
	$("p")[14].remove();
	for (x=0; x < amountOfTiles; x++){
		var tileSequence = Math.floor(Math.random() * 5) + 1;
		theGameSequence[x] = tileSequence; 
	}
	console.log("The secret tile sequence is : " + theGameSequence);
	introed = true;
	terminalText("");
}

function begin(){
	w = window.innerWidth;
	h = window.innerHeight;

	// if(localStorage.getItem('hasWon')=='yes'){
	// 	hasWon();
	// }
	if (w <= 500) {
		isMobile = true;
	} else {
		isMobile = false;
	}

	var loginText = document.getElementById('loginText');
	var now = new Date();
	now = now.toString()
	now = now.split('G')[0];
	if (isMobile) {
		loginText.innerHTML += 'Last login: '+now;
	} else {
		loginText.innerHTML += 'Last login: '+now+' on ttys000';
	}
	terminalText();
}

var terminalTextArray = ["welcome to Virtuous Things","you have been chosen to join us for a workshop on ethics and connected devices","invitation[part0] is a little puzzle to access invitation[part1]","ready?","click <a href='#' onclick='yes()'>YES</a> or <a href='#' onclick='no()'>NO</a>"];
var e = 0;

var introed = false;
var which1, which2, which3;
function intro(){
	which1 = Math.floor(Math.random()*specialDiv.length);
	which2 = Math.floor(Math.random()*specialDiv.length);
	which3 = Math.floor(Math.random()*specialDiv.length);

	while(specialDiv[which1][1] == specialDiv[which2][1]) {
		which2 = Math.floor(Math.random()*specialDiv.length);
	}

	while (specialDiv[which1][1] == specialDiv[which3][1]) {
		which3 = Math.floor(Math.random()*specialDiv.length);
	}

	document.getElementById("Div"+specialDiv[which1][0]).style.backgroundColor = "grey";
	document.getElementById("Div"+specialDiv[which2][0]).style.backgroundColor = "grey";
	document.getElementById("Div"+specialDiv[which3][0]).style.backgroundColor = "grey";

	var element1 = document.createElement("div");
	element1.setAttribute("style", "background-image:url('assets/img/grid/00/"+specialDiv[which1][1]+".svg');background-color:red;");
	element1.setAttribute("class", "remove");
	document.getElementById('history').appendChild(element1);
	var element2 = document.createElement("div");
	element2.setAttribute("style", "background-image:url('assets/img/grid/00/"+specialDiv[which2][1]+".svg');background-color:yellow;");
	element2.setAttribute("class", "remove");
	document.getElementById('history').appendChild(element2);
	var element3 = document.createElement("div");
	element3.setAttribute("style", "background-image:url('assets/img/grid/00/"+specialDiv[which3][1]+".svg');background-color:green;");
	element3.setAttribute("class", "remove");
	document.getElementById('history').appendChild(element3);

	console.log("in intro still")
	terminalTextArray.push("i'll go first...","click click click","code "+ specialDiv[which1][1] +","+ specialDiv[which2][1] +","+ specialDiv[which3][1] + " access denied","have a look down in the history ↓","red means wrong pattern and wrong order","yellow means right pattern but wrong order","green means right pattern and right order","<a href='#' onclick='setupPuzzle()'>reset the puzzle and begin</a>");					
	terminalText();
	if (isMobile) {
		document.getElementById('historyContainer').setAttribute("style", "display:inline-block; bottom:"+gridWidth*45+"px;");
	} else {
		document.getElementById('historyContainer').setAttribute("style", "display:inline-block;");
	}
}

function clicks(which1, which2, which3){
	document.getElementById("Div"+specialDiv[which1][0]).style.backgroundColor = "white";
	document.getElementById("Div"+specialDiv[which2][0]).style.backgroundColor = "white";
	document.getElementById("Div"+specialDiv[which3][0]).style.backgroundColor = "white";
}

function terminalText(txt){
	if (txt != undefined){
		terminalTextArray.push(txt);
	}

	if(terminalTextArray.length > e){
		terminal(terminalTextArray[e]);
		e++;
	}
}

var time = 100;//100;
function terminal(txt) {
	var i = 0;
	var txt;
	var element = document.createElement("p");
	document.getElementById('loginPrompt').appendChild(element);
	
	if (introed) {
		$("#background").css("pointer-events","all");
		if (!txt.includes("div")) {
			element.insertAdjacentHTML( 'beforeend', "<span class='virt-eu'>virt-eu$: </span>" );
		}
	} else {
		element.insertAdjacentHTML( 'beforeend', "<span class='virt-eu'>tutorial$: </span>" );
	}

	var typeWriter = setInterval(function(){
    	if (i < txt.length) {
    		
    		if (txt.includes("href") && !txt.includes("div")) {
			    document.getElementById("loginPrompt").lastChild.insertAdjacentHTML( 'beforeend', txt );
				i++;
				clearInterval(typeWriter);
      			terminalText();
			}
			
			if (txt.includes("div")) {
				$( "#test-form" ).append(txt);
				i++;
				clearInterval(typeWriter);
      			terminalText();

			}

			if (!txt.includes("href") && !txt.includes("div")) {
	    		document.getElementById("loginPrompt").lastChild.innerHTML += txt.charAt(i);
	      		i++;		
      		}
      	} else {
      		clearInterval(typeWriter);
      		terminalText();
      	}
	}, time);
	var elem = document.getElementById('text');
  	elem.scrollTop = elem.scrollHeight;
}

function yes(){
	document.getElementById("loginPrompt").remove();
	var element = document.createElement("div");
	element.setAttribute("class", "prompt");
	element.setAttribute("id", "loginPrompt");
	document.getElementById('text').appendChild(element);
	createBackground();
	terminalTextArray.push("some instructions...","you should see a grid of pattern-blocks","try to guess the sequence of pattern-blocks that opens the invitation","it is always a sequence of 3","got it?","click <a href='#' onclick='intro()'>YES</a> or <a href='#' onclick='yes()'>NO</a>");
	terminalText();
}

function no(){
	document.getElementById("loginPrompt").remove();
	var element = document.createElement("div");
	element.setAttribute("class", "prompt");
	element.setAttribute("id", "loginPrompt");
	document.getElementById('text').appendChild(element);
	terminalTextArray.push("okay, goodbye");
	terminalText();
	setInterval(goodbye, 1000);
	function goodbye() {
		window.location.href = 'https://virteuproject.eu';
	}
}

function replay(){
	amountWrong = 0;
	createBackground();
	$("p").remove()
	$(".hist").remove()
	resetThePuzzle();
	document.getElementById("email").setAttribute("style", "display:none;");
	document.getElementById("historyContainer").setAttribute("style", "display:block;");
	terminalText("welcome back")
}
function savelink() {
  var copyText = document.getElementById("myInput");
  copyText.select();
  document.execCommand("Copy");
  terminalTextArray.push(
    "link copied"
    );
  terminalText();
}