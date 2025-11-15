var input = "";
var equation= "";
function RandomCustom(min,max) {
    var RandomNumber = Math.floor(Math.random()*(max-min+1))+min;
    return RandomNumber;
}
function GetEquation() {
    var number1;
    var number2;
    var opperator = Math.round(Math.random()*4,1)+1
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
        opperator= "÷";
    } else if (opperator==5) { /* exponentiation */
        number1= RandomCustom(1,10); number1= number1.toString();
        number2= RandomCustom(0,3); number2= number2.toString();
        opperator= "^";
    }
    var equation = number1+opperator+number2;
document.getElementById("display").textContent = equation;
}
function AddNumber(Number) {
    input = input + Number
}
GetEquation();
function NumberCheck() {
    if (input==eval(equation)) {
        document.getElementById("display").innerHTML = "<p id='display' class='display-numbers' style='color: lightgreen;'>Correct</p>";
    } else {
        document.getElementById("display").innerHTML = "<p id='display' class='display-numbers' style='color: firebrick;'>Incorrect</p>"
    }
}