var input = "";
var equation = "";
var opperator = "";
var number1 = "";
var number2 = "";
var timeouts = 0;
var timerInterval = null;
var timeRemaining = 0;
var gameOver = false;
var gameStarted = false;

function RandomCustom(min, max) {
    var RandomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return RandomNumber;
}

function StartTimer(duration) {
    clearInterval(timerInterval);
    timeRemaining = duration;
    var timerBar = document.getElementById("timer-bar");
    timerBar.style.width = "100%";
    timerBar.style.backgroundColor = "#2fc76a";

    timerInterval = setInterval(function () {
        timeRemaining -= 50;
        var percentage = (timeRemaining / duration) * 100;
        timerBar.style.width = percentage + "%";

        if (percentage < 30) {
            timerBar.style.backgroundColor = "#ff4444";
        } else if (percentage < 60) {
            timerBar.style.backgroundColor = "#ffaa00";
        }

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            HandleTimeout();
        }
    }, 50);
}

function HandleTimeout() {
    if (gameOver) return;

    timeouts++;
    document.getElementById("timeouts-display").textContent = "Timeouts: " + timeouts + "/3";

    var displayElement = document.getElementById("display");
    displayElement.textContent = "TIMEOUT!";
    displayElement.style.color = "#ff4444";

    var calcDisplay = document.querySelector(".calculator-display");
    calcDisplay.classList.add("shake");
    setTimeout(function () {
        calcDisplay.classList.remove("shake");
    }, 500);

    input = "";

    if (timeouts >= 3) {
        GameOver();
    } else {
        setTimeout(function () {
            displayElement.style.color = "";
            GetEquation();
        }, 2000);
    }
}

function GameOver() {
    gameOver = true;
    clearInterval(timerInterval);

    var displayElement = document.getElementById("display");
    displayElement.textContent = "GAME OVER";
    displayElement.style.color = "#ff4444";
    document.getElementById("top-display").textContent = "Click refresh to restart";

    var timerBar = document.getElementById("timer-bar");
    timerBar.style.width = "0%";
}

function RestartGame() {
    gameOver = false;
    gameStarted = false;
    timeouts = 0;
    input = "";
    clearInterval(timerInterval);

    document.getElementById("start-screen").style.display = "flex";
    document.getElementById("button-container").style.display = "none";
    document.getElementById("timeouts-display").textContent = "Timeouts: 0/3";

    var displayElement = document.getElementById("display");
    displayElement.textContent = "Press START";
    displayElement.style.color = "";
    document.getElementById("top-display").textContent = "Ready?";

    var timerBar = document.getElementById("timer-bar");
    timerBar.style.width = "0%";
}

function StartGame() {
    gameStarted = true;
    gameOver = false;
    timeouts = 0;
    input = "";

    document.getElementById("start-screen").style.display = "none";
    document.getElementById("button-container").style.display = "grid";
    document.getElementById("timeouts-display").textContent = "Timeouts: 0/3";

    var displayElement = document.getElementById("display");
    displayElement.style.color = "";

    GetEquation();
}

function GetEquation() {
    if (gameOver || !gameStarted) return;

    var number1;
    var number2;
    var opperator = Math.round(Math.random() * 4, 1) + 1
    var timeLimit;

    document.getElementById("top-display").textContent = "";

    /* getting the random values */
    if (opperator == 1) { /* addition */
        number1 = RandomCustom(1, 200); number1 = number1.toString();
        number2 = RandomCustom(1, 200); number2 = number2.toString();
        opperator = "+";
        timeLimit = 10000;
    } else if (opperator == 2) { /* subtraction */
        number1 = RandomCustom(1, 200); number1 = number1.toString();
        number2 = RandomCustom(1, 200); number2 = number2.toString();
        opperator = "-";
        timeLimit = 10000;
    } else if (opperator == 3) { /* multiplication */
        number1 = RandomCustom(1, 100); number1 = number1.toString();
        number2 = RandomCustom(1, 100); number2 = number2.toString();
        opperator = "*";
        timeLimit = 15000;
    } else if (opperator == 4) { /* division */
        number2 = RandomCustom(1, 10); number2 = number2.toString();
        number1 = RandomCustom(1, 50) * number2; number1 = number1.toString();
        opperator = "/";
        timeLimit = 12000;
    } else if (opperator == 5) { /* exponentiation */
        number1 = RandomCustom(1, 10); number1 = number1.toString();
        number2 = RandomCustom(1, 3); number2 = number2.toString();
        opperator = "**";
        timeLimit = 15000;
    }

    equation = number1 + opperator + number2;

    console.log(equation);

    var displayElement = document.getElementById("display");
    displayElement.style.opacity = "0";

    setTimeout(function () {
        displayElement.textContent = equation;
        displayElement.style.opacity = "1";
    }, 150);

    StartTimer(timeLimit);
}

function AddNumber(Number) {
    if (!gameStarted || gameOver) return;

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
    if (!gameStarted || gameOver) return;
    input = "";
    var displayElement = document.getElementById("display");
    displayElement.textContent = equation;
    displayElement.style.color = "";
    document.getElementById("top-display").textContent = "";
}

function NumberCheck() {
    if (gameOver || !gameStarted) return;

    clearInterval(timerInterval);
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
