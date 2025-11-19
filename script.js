var input = "";
var equation = "";
var opperator = "";
var number1 = "";
var number2 = "";
var gameStarted = false;
var level = 5;
var complexEquation = "";

function RandomCustom(min, max) {
    var RandomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return RandomNumber;
}

function RestartGame() {
    gameStarted = false;
    input = "";

    document.getElementById("start-screen").style.display = "flex";
    document.getElementById("button-container").style.display = "none";

    var displayElement = document.getElementById("display");
    displayElement.textContent = "Press START";
    displayElement.style.color = "";
    document.getElementById("top-display").textContent = "Ready?";
}

function StartGame() {
    gameStarted = true;
    input = "";

    document.getElementById("start-screen").style.display = "none";
    document.getElementById("button-container").style.display = "grid";

    var displayElement = document.getElementById("display");
    displayElement.style.color = "";

    MakeComplexEquation(level);
}

function GetEquation(min,max,opperator) {
    if (!gameStarted) return;

    var number1;
    var number2;

    document.getElementById("top-display").textContent = "";

    /* getting the random values */
    if (opperator == 1) { /* addition */
        number1 = RandomCustom(min, max); number1 = number1.toString();
        number2 = RandomCustom(min, max); number2 = number2.toString();
        opperator = "+";
    } else if (opperator == 2) { /* subtraction */
        number1 = RandomCustom(min, max); number1 = number1.toString();
        number2 = RandomCustom(min, max); number2 = number2.toString();
        opperator = "-";
    } else if (opperator == 3) { /* multiplication */
        number1 = RandomCustom(min, max); number1 = number1.toString();
        number2 = RandomCustom(min, max); number2 = number2.toString();
        opperator = "*";
    } else if (opperator == 4) { /* division */
        number2 = RandomCustom(min, max); number2 = number2.toString();
        number1 = RandomCustom(min, max) * number2; number1 = number1.toString();
        opperator = "/";
    } else if (opperator == 5) { /* exponentiation */
        number1 = RandomCustom(min, max); number1 = number1.toString();
        number2 = RandomCustom(min, max); number2 = number2.toString();
        opperator = "**";
    }

    equation = number1 + opperator + number2;
}

function MakeComplexEquation(level) {
    var opperator;
    var opperators = ["+","-","*","/","**"]
    if (level == 1) {
        opperator = Math.round(Math.random(), 1) + 1
        GetEquation(1,20)
        complexEquation = equation
    }
    if (level == 2) {
        opperator = Math.round(Math.random()*3, 1) + 1
        if (opperator==1 || opperator==2) {GetEquation(1,100)}
        else {GetEquation(1,10)}
        complexEquation = equation
    }
    if (level == 3) {
        opperator = Math.round(Math.random()*3, 1) + 1
        if (opperator == 1 || opperator == 2) {GetEquation(-200,200)}
        else {GetEquation(-20,20)}
        complexEquation = equation
    }
    if (level == 4) {
        opperator = Math.round(Math.random()*4, 1) +1
        if (opperator==1 || opperator==2) {GetEquation(-500,500)}
        else if (opperator==3) {GetEquation(-100,100)}
        else if (opperator==4) {GetEquation(-50,50)}
        else {GetEquation(0,5)}
        complexEquation = equation
    }
    if (level == 5) {
        opperator = Math.round(Math.random()*4, 1) +1 /* Getting the first part */
        if (opperator==1 || opperator==2) {GetEquation(-500,500)}
        else if (opperator==3) {GetEquation(-100,100)}
        else if (opperator==4) {GetEquation(-50,50)}
        else {GetEquation(0,5)}

        equation = equation + opperators[Math.round(Math.random()*4, 1)] + "("
        complexEquation = equation /* Adding the () */

        opperator = Math.round(Math.random()*4, 1) +1 /* The part inside the () */
        if (opperator==1 || opperator==2) {GetEquation(-500,500)}
        else if (opperator==3) {GetEquation(-100,100)}
        else if (opperator==4) {GetEquation(-50,50)}
        else {GetEquation(0,5)}

        equation = equation + opperators[Math.round(Math.random()*4, 1)] + ")"
        complexEquation = complexEquation + equation /* Closing the () */

        if (Math.round(Math.random())==1) { /* Adding optional ending portion */
            opperator = Math.round(Math.random()*4, 1) +1
            if (opperator==1 || opperator==2) {GetEquation(-500,500)}
            else if (opperator==3) {GetEquation(-100,100)}
            else if (opperator==4) {GetEquation(-50,50)}
            else {GetEquation(0,5)}
            complexEquation = complexEquation + equation
        }
    }
    console.log(complexEquation);

    var displayElement = document.getElementById("display");
    displayElement.style.opacity = "0";

    setTimeout(function () {
        displayElement.textContent = complexEquation;
        displayElement.style.opacity = "1";
    }, 150);
}

function AddNumber(Number) {
    if (!gameStarted) return;

    if (input === "") {
    document.getElementById("top-display").textContent = complexEquation;
    }

    input = input + Number;
    var displayElement = document.getElementById("display");
    displayElement.textContent = input;

    displayElement.style.opacity = "0.7";
    setTimeout(function () {
        displayElement.style.opacity = "1";
    }, 50);
}

function ClearInput() {
    if (!gameStarted) return;
    input = "";
    var displayElement = document.getElementById("display");
    displayElement.textContent = complexEquation;
    displayElement.style.color = "";
    document.getElementById("top-display").textContent = "";
}

function NumberCheck() {
    if (!gameStarted) return;

    console.log(complexEquation)
    var displayElement = document.getElementById("display");
    if (input == eval(complexEquation)) {
        displayElement.textContent = "Correct";
        displayElement.style.color = "lightgreen";
        input = "";
        setTimeout(function () {
            displayElement.style.color = "";
            MakeComplexEquation(level);
        }, 1000);
    } else if (displayElement.textContent == "Correct") {
        MakeComplexEquation(level);
    } else {
        displayElement.textContent = "Incorrect";
        displayElement.style.color = "firebrick";
        input = "";
        setTimeout(function () {
            displayElement.style.color = "";
            MakeComplexEquation(level);
        }, 1000);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("start-screen").style.display = "flex";
    document.getElementById("button-container").style.display = "none";
});
