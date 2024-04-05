const display = document.querySelector(".display");

const numberKey = document.querySelectorAll(".number");

const extraClear = document.querySelector("#clear");
const extraDel = document.querySelector("#del");
const extraPlusMinus = document.querySelector("#plusminus");
const extraDecimal = document.querySelector("#decimal");

const operatorDivide = document.querySelector("#divide");
const operatorMultiply = document.querySelector("#multiply");
const operatorSubtract = document.querySelector("#subtract");
const operatorAdd = document.querySelector("#add");
const operatorEqual = document.querySelector("#equal");

let currentNum = "";
let tempNum = "";
let operator = "";

document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (!isNaN(key)) {
    inputNumber(parseInt(key, 10));
  } else {
    switch (key) {
      case "+":
        operate("add");
        break;
      case "-":
        operate("subtract");
        break;
      case "*":
        operate("multiply");
        break;
      case "/":
        operate("divide");
        break;
      case "Enter":
        operate(operator);
        break;
      case "Backspace":
        inputDel();
        break;
      case "Delete":
        inputClear();
        break;
      case ".":
        inputDecimal();
        break;
      case "Escape":
        inputClear();
        break;
      case "m":
        inputPlusminus();
        break;
      default:
        break;
    }
  }
});

operatorDivide.addEventListener("click", () => {
  operate("divide");
});

operatorMultiply.addEventListener("click", () => {
  operate("multiply");
});

operatorSubtract.addEventListener("click", () => {
  operate("subtract");
});

operatorAdd.addEventListener("click", () => {
  operate("add");
});

operatorEqual.addEventListener("click", () => {
  operate(operator);
});

numberKey.forEach((number) => {
  number.addEventListener("click", () => {
    const value = parseInt(number.textContent, 10);
    inputNumber(value);
  });
});

extraClear.addEventListener("click", () => {
  inputClear();
});

extraDel.addEventListener("click", () => {
  inputDel();
});

extraPlusMinus.addEventListener("click", () => {
  inputPlusminus();
});

extraDecimal.addEventListener("click", () => {
  inputDecimal();
});

function inputNumber(value) {
  if (currentNum.includes(".0")) {
    currentNum = currentNum.slice(0, -1);
  }
  currentNum += value;
  display.textContent = currentNum;
}

function inputClear() {
  currentNum = "";
  tempNum = "";
  display.textContent = 0;
}

function inputDel() {
  currentNum = currentNum.slice(0, -1);
  display.textContent = currentNum;
}

function inputPlusminus() {
  if (currentNum.startsWith("-")) {
    currentNum = currentNum.slice(1);
  } else {
    currentNum = `-${currentNum}`;
  }
  display.textContent = currentNum;
}

function inputDecimal() {
  if (currentNum === "") {
    currentNum = "0.0";
  }
  if (!currentNum.includes(".")) {
    currentNum = `${currentNum}.0`;
  }
  display.textContent = currentNum;
}

function operate(localOperator) {
  operator = localOperator;
  if (currentNum !== "") {
    let currentNumFloat = parseFloat(currentNum);
    let tempNumFloat = parseFloat(tempNum);

    if (!isNaN(tempNumFloat)) {
      switch (localOperator) {
        case "divide":
          currentNumFloat = tempNumFloat / currentNumFloat;
          break;
        case "multiply":
          currentNumFloat = tempNumFloat * currentNumFloat;
          break;
        case "subtract":
          currentNumFloat = tempNumFloat - currentNumFloat;
          break;
        case "add":
          currentNumFloat = tempNumFloat + currentNumFloat;
          break;
        case "":
          currentNum = 0;
          tempNum = 0;
          operator = "";
          break;
      }
    }

    tempNum = currentNumFloat;
    currentNum = "";
    display.textContent = "0";

    if (!isNaN(currentNumFloat)) {
      let formattedNum =
        currentNumFloat % 1 === 0
          ? currentNumFloat.toString()
          : currentNumFloat.toFixed(2);
      display.textContent = formattedNum;
    }
  }
}
