let currentNum = "";
let previousNum = "";
let operator = "";

let currentOperand = document.querySelector(".current-operand");
let previousOperand = document.querySelector(".previous-operand");

window.addEventListener("keydown", handleKeyPress);

const equal = document.querySelector(".equal");
equal.addEventListener("click", () => {
  if (currentNum != "" && previousNum != "") {
    compute();
  }
});

const decimal = document.querySelector(".decimal");
decimal.addEventListener("click", () => {
  addDecimal();
});

const clear = document.querySelector(".clear");
clear.addEventListener("click", clearCalculator);

const del = document.querySelector(".delete");
del.addEventListener("click", handleDelete);

const numberButtons = document.querySelectorAll(".btn-num");

const operators = document.querySelectorAll(".btn-operator");

numberButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleNumber(e.target.textContent);
  });
});

function handleNumber(number) {
  if (previousNum !== "" && currentNum !== "" && operator === "") {
    previousNum = "";
    currentOperand.textContent = currentNum;
  }
  if (currentNum.length <= 17) {
    currentNum += number;
    currentOperand.textContent = currentNum;
  }
}

operators.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleOperator(e.target.textContent);
  });
});

function handleOperator(op) {
  if (previousNum === "") {
    previousNum = currentNum;
    operatorCheck(op);
  } else if (currentNum === "") {
    operatorCheck(op);
  } else {
    compute();
    operator = op;
    currentOperand.textContent = "0";
    previousOperand.textContent = previousNum + " " + operator;
  }
}

function operatorCheck(text) {
  operator = text;
  previousOperand.textContent = previousNum + " " + operator;
  currentOperand.textContent = "0";
  currentNum = "";
}

function compute() {
  previousNum = Number(previousNum);
  currentNum = Number(currentNum);

  if (operator === "+") {
    previousNum += currentNum;
  } else if (operator === "-") {
    previousNum -= currentNum;
  } else if (operator === "×") {
    previousNum *= currentNum;
  } else if (operator === "÷") {
    if (currentNum <= 0) {
      previousNum = "Error";
      displayResults();
      return;
    }
    previousNum /= currentNum;
  }
  previousNum = roundNumber(previousNum);
  previousNum = previousNum.toString();
  displayResults();
}

function roundNumber(num) {
  return Math.round(num * 100000) / 100000;
}

function displayResults() {
  if (previousNum.length <= 17) {
    currentOperand.textContent = previousNum;
  } else {
    currentOperand.textContent = previousNum.slice(0, 16) + "...";
  }
  previousOperand.textContent = "";
  operator = "";
  currentNum = "";
}

function clearCalculator() {
  currentNum = "";
  previousNum = "";
  operator = "";
  currentOperand.textContent = "0";
  previousOperand.textContent = "";
}

function addDecimal() {
  if (!currentNum.includes(".")) {
    currentNum += ".";
    currentOperand.textContent = currentNum;
  }
}

function handleKeyPress(e) {
  e.preventDefault();
  if (e.key >= 0 && e.key <= 9) {
    handleNumber(e.key);
  }
  if (
    e.key === "Enter" ||
    (e.key === "=" && currentNum != "" && previousNum != "")
  ) {
    compute();
  }
  if (e.key === "+" || e.key === "-") {
    handleOperator(e.key);
  }
  if (e.key === "*") {
    handleOperator("×");
  }
  if (e.key === "/") {
    handleOperator("÷");
  }
  if (e.key === ".") {
    addDecimal();
  }
  if (e.key === "Backspace") {
    handleDelete();
  }
}

function handleDelete() {
  if (currentNum !== "") {
    currentNum = currentNum.slice(0, -1);
    currentOperand.textContent = currentNum;
    if (currentNum === "") {
      currentOperand.textContent = "0";
    }
  }
  if (currentNum === "" && previousNum !== "" && operator === "") {
    previousNum = previousNum.slice(0, -1);
    currentOperand.textContent = previousNum;
  }
}