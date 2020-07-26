var screen = document.getElementById('screen');
var currentValue;
var currentFunc = "";
var tempValue = [];

/*
  This function simply updates the screen with the number that should be displayed.
  If a number key is pressed, it should show the current number typed. Otherwise it should
  show the calculation.
*/
function update(value){
  screen.innerText = value;
}

/*
  This function calculates the current value and resets tempValue.
*/
function calculate(func){
  if (tempValue.join() != ""){
    console.log(func)
    if(func != "=") {
      if(currentValue == 0 || currentValue == null){
        currentValue = parseInt(tempValue.join(''));
        currentFunc = func;
        tempValue = [];
        update('0');
      } else {
        currentValue = eval(currentValue.toString() + currentFunc + tempValue.join(''));
        tempValue = [];
        currentFunc = func;
        update(currentValue.toString());
      }
    } else {
      currentValue = eval(currentValue.toString() + currentFunc + tempValue.join(''));
      update(currentValue.toString());
      tempValue = currentValue.toString().split('');
      currentValue = 0;
      currentFunc = "";
      console.log("equals");
    }
  }
}

/*
keyPress reports what key is pressed and sends the appropriate action to the _______
function. onclick is reported in the HTML and sends itself, which then records the
innerText and determins if the key is a number or NaN.
*/
function keyPress (key) {
  if(typeof(key) == "string"){
    var value = key
  } else if (typeof(key) == "object"){
    var value = key.innerText;
  }

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
      currentFunc = "";
      currentValue = 0;
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
        calculate('/');

      }
      break;
    case "x":
      //Multiply
      if(tempValue.join('') != null || tempValue.join('') != "") {
        calculate('*');

      }
      break;
    case "-":
      //Subtract
      if(tempValue.join('') != null || tempValue.join('') != "") {
        calculate('-');

      }
      break;
    case "+":
      //Add
      if(tempValue.join('') != null || tempValue.join('') != "") {
        calculate('+');
      }
      break;
    case "=":
      //Equals
      if(tempValue.join('') != null || tempValue.join('') != "") {
        calculate('=');
      }
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


/*
Dectects key pressed and translates them to either a function or a number. (as a string)
Keys that aren't valid are logged as "invalid". This is then sent to the keyPress function.
*/

window.addEventListener('keydown', function(k){
  var key = k.key;
  if(["0","1","2","3","4","5","6","7","8","9","0"].includes(key.toLowerCase())){
    keyPress(key);
  } else if (["+","=","-","/","%", "backspace","n", ".", "enter", "x", "*"].includes(key.toLowerCase())){
    switch (key.toLowerCase()) {
      case "backspace":
        keyPress("AC");
        break;
      case "enter":
        keyPress("=");
        break;
      case "n":
        keyPress("+/-");
        break;
      case "*":
        keyPress("x");
        break;
      default:
        keyPress(key);
    }
  } else {
    console.log('invalid');
  }
});
