let display = document.getElementById("display");
let buttons = document.querySelectorAll(".btn");
let clearBtn = document.getElementById("clear");
let equalsBtn = document.getElementById("equals");

let currentInput = "";
let currentOperator = null;
let previousValue = null;
let resultDisplayed = false;

buttons.forEach(button => {
  button.addEventListener("click", () => {
    let value = button.getAttribute("data-value");
    handleInput(value);
  });
});


equalsBtn.addEventListener("click", () => {
  if (currentInput === "" || currentOperator === null) return;
  calculate();
  currentOperator = null;
  resultDisplayed = true;
});


clearBtn.addEventListener("click", () => {
  resetCalculator();
});


document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (!isNaN(key) || key === ".") {
    handleInput(key);
  } else if (["+", "-", "*", "/"].includes(key)) {
    handleInput(key);
  } else if (key === "Enter" || key === "=") {
    if (currentInput === "" || currentOperator === null) return;
    calculate();
    currentOperator = null;
    resultDisplayed = true;
  } else if (key === "Escape" || key === "c" || key === "C") {
    resetCalculator();
  }
});

function handleInput(value) {
  if (!value) return;

  if (resultDisplayed && !["+", "-", "*", "/", "."].includes(value)) {
    currentInput = "";
    resultDisplayed = false;
  }

  if ((value >= "0" && value <= "9") || value === ".") {
    if (value === "." && currentInput.includes(".")) return;

    currentInput += value;
    display.textContent = currentInput;
  } else if (["+", "-", "*", "/"].includes(value)) {
    if (currentInput === "" && previousValue === null) return;

    if (previousValue !== null && currentInput !== "") {
      calculate();
    } else if (currentInput !== "") {
      previousValue = parseFloat(currentInput);
    }

    currentOperator = value;
    currentInput = "";
    display.textContent = previousValue + " " + currentOperator;
  }
}

function calculate() {
  let currentValue = parseFloat(currentInput);

  if (isNaN(previousValue) || isNaN(currentValue)) return;

  let result;

  switch (currentOperator) {
    case "+":
      result = previousValue + currentValue;
      break;
    case "-":
      result = previousValue - currentValue;
      break;
    case "*":
      result = previousValue * currentValue;
      break;
    case "/":
      if (currentValue === 0) {
        display.textContent = "Error";
        resetCalculator(true);
        return;
      }
      result = previousValue / currentValue;
      break;
    default:
      return;
  }

  display.textContent = result;
  previousValue = result;
  currentInput = "";
}

function resetCalculator(keepDisplay = false) {
  currentInput = "";
  previousValue = null;
  currentOperator = null;
  resultDisplayed = false;

  if (!keepDisplay) {
    display.textContent = "0";
  }
}
