var input = "";
var equation = "";
var opperator = "";
var number1 = "";
var number2 = "";
var gameStarted = false;

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

    GetEquation();
}

function GetEquation() {
    if (!gameStarted) return;

    var number1;
    var number2;
    var opperator = Math.round(Math.random() * 4, 1) + 1

    document.getElementById("top-display").textContent = "";

    /* getting the random values */
    if (opperator == 1) { /* addition */
        number1 = RandomCustom(1, 200); number1 = number1.toString();
        number2 = RandomCustom(1, 200); number2 = number2.toString();
        opperator = "+";
    } else if (opperator == 2) { /* subtraction */
        number1 = RandomCustom(1, 200); number1 = number1.toString();
        number2 = RandomCustom(1, 200); number2 = number2.toString();
        opperator = "-";
    } else if (opperator == 3) { /* multiplication */
        number1 = RandomCustom(1, 100); number1 = number1.toString();
        number2 = RandomCustom(1, 100); number2 = number2.toString();
        opperator = "*";
    } else if (opperator == 4) { /* division */
        number2 = RandomCustom(1, 10); number2 = number2.toString();
        number1 = RandomCustom(1, 50) * number2; number1 = number1.toString();
        opperator = "/";
    } else if (opperator == 5) { /* exponentiation */
        number1 = RandomCustom(1, 10); number1 = number1.toString();
        number2 = RandomCustom(1, 3); number2 = number2.toString();
        opperator = "**";
    }

    equation = number1 + opperator + number2;

    console.log(equation);

    var displayElement = document.getElementById("display");
    displayElement.style.opacity = "0";

    setTimeout(function () {
        displayElement.textContent = equation;
        displayElement.style.opacity = "1";
    }, 150);
}

function AddNumber(Number) {
    if (!gameStarted) return;

    if (input === "") {
    document.getElementById("top-display").textContent = equation;
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
    displayElement.textContent = equation;
    displayElement.style.color = "";
    document.getElementById("top-display").textContent = "";
}

function NumberCheck() {
    if (!gameStarted) return;

    console.log(equation)
    var displayElement = document.getElementById("display");
    if (input == eval(equation)) {
        displayElement.textContent = "Correct";
        displayElement.style.color = "lightgreen";
        input = "";
        setTimeout(function () {
            displayElement.style.color = "";
            GetEquation();
        }, 1000);
    } else if (displayElement.textContent == "Correct") {
        GetEquation();
    } else {
        displayElement.textContent = "Incorrect";
        displayElement.style.color = "firebrick";
        input = "";
        setTimeout(function () {
            displayElement.style.color = "";
            GetEquation();
        }, 1000);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("start-screen").style.display = "flex";
    document.getElementById("button-container").style.display = "none";
});
