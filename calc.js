/************************************************************************************
* calc.js
* Written by: M Wilson
* Date written: 2019
* Purpose: Used with calculator.html and style.css to functon as a simple calculator
*************************************************************************************/
//declaring variables

var disp = document.getElementById("disp");
var decPressed = 0;
var numBtns = document.getElementsByClassName("num");
var operators = document.getElementsByClassName("oper");
var ansPressed = false; //flag to disallow number buttons to be clicked after the answer is displayed
//Initialise the display area to 0
disp.textContent ='0';
//Function to handle the operators
function operatorClick(event) {
	if (ansPressed)
		ansPressed = false;
  var o = event.target.textContent.trim(); 
  document.getElementById("back1").disabled = false;
  // replace the immediate operator 
if ((disp.textContent.substr(disp.textContent.length - 1,1) === '+') ||
	(disp.textContent.substr(disp.textContent.length - 1,1) === '/') ||
	(disp.textContent.substr(disp.textContent.length - 1,1) === '*') ||
	(disp.textContent.substr(disp.textContent.length - 1,1) === '-') ||
	(disp.textContent.substr(disp.textContent.length - 1,1) === '.')
	)
	{
		disp.textContent = disp.textContent.substr(0, disp.textContent.length - 1);
	}

 switch (o)
{
	case '.':
	    // flag to check for a decimal. Only allow 1 decimal point per number
		decPressed++;
		if (decPressed == 1)
		{
		disp.textContent += o;
		}
		break;
	case '\u00f7':
		 o = '/';
		 disp.textContent += o;
		 decPressed=0;
		 break;
	case 'x':
		o = '*';
		disp.textContent += o;
		decPressed=0;
		break;
	case '+':
	case '-':
		decPressed=0;
	default:
		disp.textContent += o;
		break;
}
}
//function to display the answer 
function ans(){
	var x = disp.textContent.indexOf('.');
	if (x > -1)
		var c = eval(disp.textContent).toFixed(10);
	else 
		var c = eval(disp.textContent);
	disp.textContent = c;
	document.getElementById("back1").disabled = true;
	ansPressed = true;
}
//function to clear the display area and reset decPressed
function clear(){
	disp.textContent='0';
	decPressed = 0;
	document.getElementById("back1").disabled = false;
	ansPressed = false;
}
//Function to display or hide the calculator
function displayCalc() {
  var x = document.getElementById("show");
  if (x.style.display === "none")
	  {
    x.style.display = "block";
	document.getElementById("switch").value = "Hide calculator";
  } else
	  {
    x.style.display = "none";
	document.getElementById("switch").value = "Display calculator";
  }
}
// function for the backspace button
function back() {
	disp.textContent = disp.textContent.substr(0, disp.textContent.length - 1);
	if (disp.textContent.length == 0) {
		disp.textContent = '0';
		decPressed = 0;
	}
}
// function to handle the numbers
function numberClick(event) {
	if (!ansPressed)
	{
  var content = disp.textContent;
  var btnNum = event.target.textContent.trim();
  
  if(content != "0"){
	  //limit the display area to 12 characters
	  if(content.length < 12)
    content += btnNum;
  } else {
    content = btnNum;
  }
 
disp.textContent  = content;
	}
	
}
document.getElementById("back1").addEventListener("click",function(){ back(); });
// Set up listeners for the numbers 
for (var i = 0; i < numBtns.length; i++) {
    numBtns[i].addEventListener('click', numberClick, false);
	//alert(numBtns[i]);
}
// Set up listeners for the operators
for(var o = 0; o < operators.length; o++) {
  operators[o].addEventListener('click', operatorClick , false);
}
//adding an event listener to the clear button
document.getElementById("clear").addEventListener("click",function(){clear(); });
//adding an event listener to answer (=) button
document.getElementById("ans").addEventListener("click",function(){ ans(); });
