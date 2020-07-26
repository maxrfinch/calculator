var screen = document.getElementById('screen');
var currentValue;
var tempValue = [];
var currentFunction = "";

/*
  This function simply updates the screen with the number that should be displayed.
  If a number key is pressed, it should show the current number typed. Otherwise it should
  show the calculation.
*/
function update(value){
  screen.innerText = value;
}

/*
  This function stores the current value and resets tempValue.
*/
function store(){
  currentValue = parseInt(tempValue.join(''));
  tempValue = [];
  update('0');
}

/*
keyPress reports what key is pressed and sends the appropriate action to the _______
function. onclick is reported in the HTML and sends itself, which then records the
innerText and determins if the key is a number or NaN.
*/
function keyPress (key) {
  var value = key.innerText;
  if(!isNaN(parseInt(value))){
    //If the key is a number, act accordingly
    update(numberPressed(value));
  } else {
    //If the key is not a number, act accordingly
    functionPressed(value);
  }
}


/*
numberPressed take a string value and adds it to the temp value array. Then it
returns tempValue joined together to display on screen.
*/
function numberPressed(value) {
  tempValue.push(value);
  return tempValue.join('');
}

function functionPressed(value) {
  switch (value) {
    case "AC":
      //All Clear
      console.log('Clear');
      tempValue = [];
      update('0');
      break;
    case "+/-":
      //Convert positive negative
      console.log('Negate');
      if(tempValue.join('') < 0) {
        tempValue.shift();
      } else {
        tempValue.unshift('-');
      }
      update(tempValue.join(''));
      break;
    case "%":
      //Convert Percentage
      console.log('Percent Of');
      //Get current value
      var cv = parseInt(tempValue.join(''));
      //Convert to percentage and > string > array
      tempValue = ((cv / 100)*1).toString().split('');
      update(tempValue.join(''));
      break;
    case "/":
      //Divide
      if(tempValue.join('') != null || tempValue.join('') != "") {
        store();
        currentFunction = "/";
      }
      break;
    case "x":
      //Multiply
      if(tempValue.join('') != null || tempValue.join('') != "") {
        store();
        currentFunction = "x";
      }
      break;
    case "-":
      //Subtract
      if(tempValue.join('') != null || tempValue.join('') != "") {
        store();
        currentFunction = "-";
      }
      break;
    case "+":
      //Add
      if(tempValue.join('') != null || tempValue.join('') != "") {
        store();
        currentFunction = "+";
      }
      break;
    case "=":
      //Equals
      break;
    case ".":
      //Float
      if(!tempValue.includes('.')){
        console.log('convert to decimal');
        tempValue.push('.');
      } else {
        console.log('already decimal')
      }
      break;
    default:
      console.log("error - unknown function");
  }
}
