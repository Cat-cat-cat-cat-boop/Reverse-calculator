var input = "";
var equation= "";
var opperator= "";
var number1 = "";
var number2= "";
function RandomCustom(min,max) {
    var RandomNumber = Math.floor(Math.random()*(max-min+1))+min;
    return RandomNumber;
}
function GetEquation() {
    var number1;
    var number2;
    var opperator = Math.round(Math.random()*4,1)+1
    document.getElementById("top-display").textContent = "";
    /* getting the random values */
    if (opperator==1) { /* addition */
        number1= RandomCustom(1,200); number1= number1.toString();
        number2= RandomCustom(1,200); number2= number2.toString();
        opperator= "+";
    } else if (opperator==2) { /* subtraction */
        number1= RandomCustom(1,200); number1= number1.toString();
        number2= RandomCustom(1,200); number2= number2.toString();
        opperator= "-";
    } else if (opperator==3) { /* multiplication */
        number1= RandomCustom(1,100); number1= number1.toString();
        number2= RandomCustom(1,100); number2= number2.toString();
        opperator= "*";
    } else if (opperator==4) { /* division */
        number2= RandomCustom(1,10); number2= number2.toString();
        number1= RandomCustom(1,50)*number2; number1= number1.toString();
        opperator= "/";
    } else if (opperator==5) { /* exponentiation */
        number1= RandomCustom(1,10); number1= number1.toString();
        number2= RandomCustom(1,3); number2= number2.toString();
        opperator= "^";
    }
    equation = number1+opperator+number2;

    console.log(equation)
document.getElementById("display").textContent = equation;
}
function AddNumber(Number) {
    document.getElementById("top-display").textContent = equation;
    input = input + Number
    document.getElementById("display").textContent = input;
}
GetEquation();
function NumberCheck() {
    console.log(equation)
    if (input==eval(equation)) {
        document.getElementById("display").innerHTML = "<p id='display' class='display-numbers' style='color: lightgreen;'>Correct</p>";
    } else {
        document.getElementById("display").innerHTML = "<p id='display' class='display-numbers' style='color: firebrick;'>Incorrect</p>"
    }
}