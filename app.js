const displayPrevOperant = document.querySelector('.display__previous-operant');
const displayCurrentOperant = document.querySelector('.display__current-operant');
const displayOperator = document.querySelector('.display__operation');
const btnsNumbers = [...document.querySelectorAll('.calculator__btn-number')];
const btnsOperator = [...document.querySelectorAll('.calculator__btn-operator')];
const btnC = document.querySelector('.calculator__btn-C');
const btnCE = document.querySelector('.calculator__btn-CE');
const btnDEL = document.querySelector('.calculator__btn-DEL');
const btnSum = document.querySelector('.calculator__btn-sum');

let currentOperant = '';
let previousOperant = '';
let operator = '';

// Display functions 
const showCurrentOperant = function(){
  displayCurrentOperant.innerText = currentOperant;
}

const showPreviousOperant = function(){
  displayPrevOperant.innerText = previousOperant;
}

const showOperator = function(){
  displayOperator.innerText = operator;
}

const updateDisplay = function() {
  showCurrentOperant();
  showPreviousOperant();
  showOperator();
}


//Check if number is decimnal
const lookForDot = function(operantString) {
  if(operantString.includes('.')){
    return 1;
  } else {
    return 0;
  }
}


// Buttons functions
const getNumbers = function(btn) {
  let newNumber = btn.innerText;

  if(newNumber === '.' && lookForDot(currentOperant) >= 1){
    return;
  }

  if(currentOperant === '' && previousOperant !== '' && operator === ''){
    currentOperant = '';
    previousOperant = '';
    operator = '';
    updateDisplay();
  }

  currentOperant += newNumber;
  showCurrentOperant();
}

const useDEL = function(){
  currentOperant = currentOperant.slice(0, -1);
}

const useCE = function(){
  currentOperant = '';
}

const useC = function(){
  currentOperant = '';
  previousOperant = '';
  operator = '';
}

const getOperant = function(btn){
  if(currentOperant === '' && previousOperant === '' && operator === '') {
    return;
  }
  
  if(currentOperant !== '' && previousOperant === '' && operator === ''){
    previousOperant = currentOperant;
    currentOperant = '';
    operator = btn.innerText
    updateDisplay();
  }

  if(currentOperant === '' && previousOperant !== '' && operator !== ''){
    return;
  }

  if(currentOperant === '' && previousOperant !== '' && operator === ''){
    operator = btn.innerText;
    updateDisplay();
  }

  if(currentOperant !== '' && previousOperant !== '' && operator !== ''){
    let result = calculate(previousOperant, currentOperant, operator);
    previousOperant = result;
    operator = btn.innerText;
    currentOperant = '';
    updateDisplay();
  }
}

const calculate = function (prevOp, currOp, op){
  let result = '';
  let firstOp = Number(prevOp);
  let secondOp = Number(currOp);

  op === '+' ? result = firstOp + secondOp : '';
  op === '-' ? result = firstOp - secondOp : '';
  op === '×' ? result = firstOp * secondOp : '';
  if(op === '÷'){
    if(secondOp === 0){
      return
    }
    result = firstOp / secondOp;
  }
  return result;
}

// Calls
btnsNumbers.forEach((btn) => {
  btn.addEventListener('click', ()=> {
    getNumbers(btn);
  })
})

btnDEL.addEventListener('click', () => {
  useDEL();
  showCurrentOperant();  
 });
 
 btnCE.addEventListener('click', ()=>{
   useCE();
   showCurrentOperant();   
 })
 
 btnC.addEventListener('click', ()=> {
   useC();
   updateDisplay();
 })
 
 btnSum.addEventListener('click', ()=> {
   let result = calculate(previousOperant, currentOperant, operator);
   previousOperant = result;
   operator = '';
   currentOperant = '';
   updateDisplay();
 })
 
 btnsOperator.forEach((btn) => {
   btn.addEventListener('click', () => {
     getOperant(btn);
   })
 })