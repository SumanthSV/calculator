document.addEventListener("DOMContentLoaded", function () {
    let displayContent = document.getElementById("content");
    let resultDisplay = document.getElementById("result");
    let currentInput = "";
    let currentResult = null;
    let operator = null;

    document.querySelector(".buttons").addEventListener("click", function (event) {
        if (event.target.classList.contains("btn")) {
            handleButtonClick(event.target.textContent);
            updateDisplay();
        }
    });

    function handleButtonClick(value) {
        if (isNumeric(value)) {
            currentInput += value;
        } else if (isOperator(value)) {
            handleOperator(value);
        } else if (value === "C") {
            clearCalculator();
        } else if (value === "=") {
            calculateResult();
        }
    }

    function isNumeric(value) {
        return /^\d+$/.test(value);
    }

    function isOperator(value) {
        return ["+", "-", "*", "/"].includes(value);
    }

    function handleOperator(value) {
        if (currentInput !== "") {
            if (currentResult !== null) {
                calculateResult();
            }
            operator = value;
            currentResult = parseFloat(currentInput);
            currentInput = "";
        } else if (currentResult !== null) {
            operator = value;
        }
    }

    function clearCalculator() {
        currentInput = "";
        currentResult = null;
        operator = null;
    }

    function calculateResult() {
        if (currentInput !== "") {
            switch (operator) {
                case "+":
                    currentResult += parseFloat(currentInput);
                    break;
                case "-":
                    currentResult -= parseFloat(currentInput);
                    break;
                case "*":
                    currentResult *= parseFloat(currentInput);
                    break;
                case "/":
                    currentResult /= parseFloat(currentInput);
                    break;
            }
            currentInput = "";
            operator = null;
            updateDisplay();
        }
    }

    function updateDisplay() {
        displayContent.textContent = currentInput !== "" ? currentInput : "0";
        resultDisplay.textContent = currentResult !== null ? currentResult : "";
    }
});
