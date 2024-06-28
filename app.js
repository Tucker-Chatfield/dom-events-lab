/*-------------------------------- Constants --------------------------------*/
const calculator = document.querySelector('#calculator');
const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.button.number');
const operatorButtons = document.querySelectorAll('.button.operator');
const equalsButton = document.querySelector('.button.equals');

/*-------------------------------- Variables --------------------------------*/
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

/*------------------------ Cached Element References ------------------------*/

/*----------------------------- Event Listeners -----------------------------*/
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    inputNumber(button.textContent);
  });
});

operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    inputOperator(button.textContent);
  });
});

equalsButton.addEventListener('click', () => {
    calculate();
  });

/*-------------------------------- Functions --------------------------------*/
function inputNumber(number) {
  if (waitingForSecondOperand) {
    display.textContent = number;
    waitingForSecondOperand = false;
  } else {
    display.textContent = display.textContent === '0' ? number : display.textContent + number;
  }
}

function inputOperator(op) {
  if (op === 'C') {
    clear();
    return;
  }

  const inputValue = parseFloat(display.textContent);

  if (firstOperand === null) {
    firstOperand = inputValue;
  } else if (operator) {
    const result = calculate();
    display.textContent = String(result);
    firstOperand = result;
  }

  waitingForSecondOperand = true;
  operator = op;
}

function calculate() {
  if (operator === null || waitingForSecondOperand) {
    return firstOperand;
  } 

  const secondOperand = parseFloat(display.textContent);
  let result = 0;

  switch (operator) {
    case '+':
      result = firstOperand + secondOperand;
      break;
    case '-':
      result = firstOperand - secondOperand;
    case '*':
      result = firstOperand * secondOperand;
      break;
    case '/':
      if (secondOperand === 0) {
        alert('Cannot divide by zero');
        clear();
        return;
      }
    result = firstOperand / secondOperand;
    break;
  }
  firstOperand = result;
  operator = null;
  waitingForSecondOperand = true;
  display.textContent = String(result);
  return result;
}

function clear() {
  display.textContent = '0';
  firstOperand = null;
  operator = null;
  waitingForSecondOperand = false;
}