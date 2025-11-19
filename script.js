var input = "";
var equation = "";
var gameStarted = false;
var correctAnswers = 0;

// Cache DOM elements
var displayElement;
var topDisplayElement;
var startScreen;
var buttonContainer;

function RandomCustom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function RestartGame() {
    gameStarted = false;
    input = "";
    correctAnswers = 0;

    startScreen.style.display = "flex";
    buttonContainer.style.display = "none";

    displayElement.textContent = "Press START";
    displayElement.style.color = "";
    topDisplayElement.textContent = "Ready?";
}

function StartGame() {
    gameStarted = true;
    input = "";
    correctAnswers = 0;

    startScreen.style.display = "none";
    buttonContainer.style.display = "grid";
    displayElement.style.color = "";

    GetEquation();
}

function GetEquation() {
    if (!gameStarted) return;

    topDisplayElement.textContent = "";

    var difficultyMultiplier = 1 + Math.floor(correctAnswers / 5) * 0.5;
    var opType = Math.floor(Math.random() * 5) + 1;
    var num1, num2, op;

    switch (opType) {
        case 1: // addition
        case 2: // subtraction
            num1 = RandomCustom(1, Math.floor(200 * difficultyMultiplier));
            num2 = RandomCustom(1, Math.floor(200 * difficultyMultiplier));
            op = opType === 1 ? "+" : "-";
            break;
        case 3: // multiplication
            num1 = RandomCustom(1, Math.floor(100 * difficultyMultiplier));
            num2 = RandomCustom(1, Math.floor(100 * difficultyMultiplier));
            op = "*";
            break;
        case 4: // division (with decimals)
            num1 = RandomCustom(1, Math.floor(100 * difficultyMultiplier));
            num2 = RandomCustom(2, Math.floor(20 * difficultyMultiplier));
            op = "/";
            break;
        case 5: // exponentiation
            num1 = RandomCustom(1, Math.min(15, Math.floor(10 * difficultyMultiplier)));
            num2 = RandomCustom(1, Math.min(4, Math.floor(3 * difficultyMultiplier)));
            op = "**";
            break;
    }

    equation = num1 + op + num2;

    displayElement.style.opacity = "0";
    setTimeout(function () {
        displayElement.textContent = equation;
        displayElement.style.opacity = "1";
    }, 150);
}

function AddNumber(Number) {
    if (!gameStarted) return;

    if (input === "") {
        topDisplayElement.textContent = equation;
    }

    input += Number;
    displayElement.textContent = input;
    displayElement.style.opacity = "0.7";

    setTimeout(function () {
        displayElement.style.opacity = "1";
    }, 50);
}

function ClearInput() {
    if (!gameStarted) return;
    input = "";
    displayElement.textContent = equation;
    displayElement.style.color = "";
    topDisplayElement.textContent = "";
}

function NumberCheck() {
    if (!gameStarted || !input) return;

    var answer = eval(equation);
    var userAnswer = parseFloat(input);

    // Round to 2 decimal places for comparison
    var isCorrect = Math.abs(userAnswer - answer) < 0.01 ||
        userAnswer.toFixed(2) == answer.toFixed(2);

    if (isCorrect) correctAnswers++;

    displayElement.textContent = isCorrect ? "Correct" : "Incorrect";
    displayElement.style.color = isCorrect ? "lightgreen" : "firebrick";
    input = "";

    setTimeout(function () {
        displayElement.style.color = "";
        GetEquation();
    }, 1000);
}

document.addEventListener("DOMContentLoaded", function () {
    // Cache DOM elements
    displayElement = document.getElementById("display");
    topDisplayElement = document.getElementById("top-display");
    startScreen = document.getElementById("start-screen");
    buttonContainer = document.getElementById("button-container");

    startScreen.style.display = "flex";
    buttonContainer.style.display = "none";
});

document.addEventListener("keydown", function (event) {
    if (!gameStarted) return;

    var key = event.key;

    if ((key >= '0' && key <= '9') || key === '.' || '+-*/'.includes(key)) {
        AddNumber(key);
    } else if (key === 'Enter') {
        NumberCheck();
    } else if (key === 'Backspace' || key === 'Delete' || key === 'Escape') {
        ClearInput();
    }
});
