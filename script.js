const body = document.querySelector("body");

const toggleButtons = document.querySelectorAll("[toggle-theme-button]");
const toggleButtonsParent = document.querySelector("[toggle-theme-button-parent]");
toggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonID = button.getAttribute("id");

    if (button.checked && buttonID === "light") {
      toggleButtonsParent.style.setProperty("--checked", "50%");
      body.classList.add("light-theme");
      body.classList.remove("dark-violet-theme");
    }
    if (button.checked && buttonID === "dark-violet") {
      toggleButtonsParent.style.setProperty("--checked", "80%");
      body.classList.add("dark-violet-theme");
      body.classList.remove("light-theme");
    }
    if (button.checked && buttonID === "dark") {
      toggleButtonsParent.style.setProperty("--checked", "20%");
      body.classList.remove("light-theme");
      body.classList.remove("dark-violet-theme");
    }
  });
});

class Calculator {
  constructor(currentInput, previousInput) {
    this.currentInput = currentInput;
    this.previousInput = previousInput;
    this.clear();
  }

  clear() {
    this.currentInputValue = "";
    this.previousInputValue = "";
    this.operation = undefined;
  }

  appendNumber(number) {
    if (number === "." && this.currentInputValue.includes(".")) return;
    this.currentInputValue = this.currentInputValue + number;
  }

  chooseOperation(operation) {
    if (this.currentInputValue === "") return;
    if (this.previousInputValue !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousInputValue = this.currentInputValue;
    this.currentInputValue = "";
  }

  delete() {
    this.currentInputValue = this.currentInputValue.slice(0, -1);
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousInputValue);
    const curr = parseFloat(this.currentInputValue);
    switch (this.operation) {
      case "+":
        computation = prev + curr;
        break;
      case "-":
        computation = prev - curr;
        break;
      case "*":
        computation = prev * curr;
        break;
      case "/":
        computation = prev / curr;
        break;
      default:
        return;
    }
    this.currentInputValue = computation;
    this.operation = undefined;
    this.previousInputValue = "";
  }

  getNumberSeperator(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    // const floatNumbers = parseFloat(number);

    let display;

    if (isNaN(integerDigits)) {
      display = "";
    } else {
      display = integerDigits.toLocaleString("en", { maximumFractionDigits: 3 });
    }

    if (decimalDigits != null) {
      return `${display}.${decimalDigits}`;
    } else {
      return display;
    }
  }

  updateDisplay() {
    this.currentInput.innerText = this.getNumberSeperator(this.currentInputValue);
    if (this.operation != null) {
      this.previousInput.innerText = `${this.getNumberSeperator(this.previousInputValue)} ${this.operation}`;
    } else {
      this.previousInput.innerText = "";
    }
  }
}

// this.currentInput.innerText = this.getNumberSeperator(this.currentInputValue);
// if (this.operation != null) {
//   this.previousInput.innerText = `${this.getNumberSeperator(this.previousInputValue)} ${this.operation}`;
// }

// this.currentInput.innerText = this.currentInputValue;
// if (this.operation != null) {
//   this.previousInput.innerText = `${this.previousInputValue} ${this.operation}`;
// }
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const deleteButton = document.querySelector("[data-delete]");
const ResetButton = document.querySelector("[data-reset]");
const equalsButton = document.querySelector("[data-equals]");

const displayNumberPlaceholder = document.querySelector("[placeholder-number]");
const currentInput = document.querySelector("[display-number]");
const previousInput = document.querySelector("[previous-input]");

const calculator = new Calculator(currentInput, previousInput);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const getNumber = button.getAttribute("data-number");
    displayNumberPlaceholder.style.setProperty("--placeholder", "none");
    currentInput.style.setProperty("--actual-number", "block");

    calculator.appendNumber(getNumber);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const getOperation = button.getAttribute("data-operation");
    displayNumberPlaceholder.style.setProperty("--placeholder", "block");
    currentInput.style.setProperty("--actual-number", "none");

    calculator.chooseOperation(getOperation);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

ResetButton.addEventListener("click", () => {
  displayNumberPlaceholder.style.setProperty("--placeholder", "block");
  currentInput.style.setProperty("--actual-number", "none");
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  if (currentInput.innerText.length === 1) {
    displayNumberPlaceholder.style.setProperty("--placeholder", "block");
    currentInput.style.setProperty("--actual-number", "none");
  }
  // console.log(currentInput.innerText.length);
  calculator.delete();
  calculator.updateDisplay();
});

// const numbers = [];

// let SecondNumber = "";
// let firstNumber = "";

// calcButtons.forEach((button) => {
//   button.addEventListener("click", (e) => {
//     const target = e.target;
//     const buttonValue = target.getAttribute("data-value");
//     const OperationValue = target.getAttribute("data-operation-value");
//     const OptionValue = target.getAttribute("data-option-value");
//     // console.log(buttonValue);
//     // console.log(OperationValue);
//     if (buttonValue !== null && OperationValue !== null) {
//       // console.log(buttonValue);
//       displayNumberPlaceholder.style.setProperty("--placeholder", "none");
//       displayNumber.style.setProperty("--actual-number", "block");
//       firstNumber += buttonValue;

//       const getDiplayNumber = displayNumber.textContent;
//       displayNumber.textContent = buttonValue + getDiplayNumber;
//       // displayNumber.textContent = OperationValue + getDiplayNumber;
//     }

//     if (OperationValue !== null) {
//       SecondNumber = firstNumber;
//       firstNumber = "";
//     }

//     console.log(firstNumber);
//   });
// });

// // console.log(arr.join("+"));

// function addtion(firstNumber, SecondNumber) {
//   console.log(parseInt(firstNumber) + parseInt(SecondNumber));
//   return parseInt(firstNumber) + parseInt(firstNumber);
// }
