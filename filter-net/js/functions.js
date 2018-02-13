var slider1 = document.getElementById("range1");
var output1 = document.getElementById("value1");
output1.innerHTML = slider1.value;
var slider1OldVal = slider1.value;
var slider1NewVal;

var slider2 = document.getElementById("range2");
var output2 = document.getElementById("value2");
output2.innerHTML = slider2.value;
var slider2OldVal = slider2.value;
var slider2NewVal;

var slider3 = document.getElementById("range3");
var output3 = document.getElementById("value3");
output3.innerHTML = slider3.value;
var slider3OldVal = slider1.value;
var slider3NewVal;

slider1.oninput = function() {
slider1NewVal = slider1.value;
if(slider1NewVal > slider1OldVal){
  if(slider2.value > slider3.value){
    document.getElementById("range2").value = ((100-slider3.value) - slider1.value);
  } else {
    document.getElementById("range3").value = ((100-slider2.value) - slider1.value);
  }
} else if(slider1NewVal < slider1OldVal){
  if(slider2.value < slider3.value){
    document.getElementById("range2").value = ((100-slider3.value) - slider1.value);
  } else {
    document.getElementById("range3").value = ((100-slider2.value) - slider1.value);
  }
}
output1.innerHTML = slider1.value;
output2.innerHTML = slider2.value;
output3.innerHTML = slider3.value;
slider1OldVal = slider1NewVal;
}

slider2.oninput = function() {
slider2NewVal = slider2.value;
if(slider2NewVal > slider2OldVal){
  if(slider1.value > slider3.value){
    document.getElementById("range1").value = ((100-slider3.value) - slider2.value);
  } else {
    document.getElementById("range3").value = ((100-slider1.value) - slider2.value);
  }
} else if(slider2NewVal < slider2OldVal){
  if(slider1.value < slider3.value){
    document.getElementById("range1").value = ((100-slider3.value) - slider2.value);
  } else {
    document.getElementById("range3").value = ((100-slider1.value) - slider2.value);
  }
}
output1.innerHTML = slider1.value;
output2.innerHTML = slider2.value;
output3.innerHTML = slider3.value;
slider2OldVal = slider2NewVal;
}

slider3.oninput = function() {
slider3NewVal = slider3.value;
if(slider3NewVal > slider3OldVal){
  if(slider1.value > slider2.value){
    document.getElementById("range1").value = ((100-slider2.value) - slider3.value);
  } else {
    document.getElementById("range2").value = ((100-slider1.value) - slider3.value);
  }
} else if(slider3NewVal < slider3OldVal){
  if(slider1.value < slider2.value){
    document.getElementById("range1").value = ((100-slider2.value) - slider3.value);
  } else {
    document.getElementById("range2").value = ((100-slider1.value) - slider3.value);
  }
}
output1.innerHTML = slider1.value;
output2.innerHTML = slider2.value;
output3.innerHTML = slider3.value;
slider3OldVal = slider3NewVal;
}