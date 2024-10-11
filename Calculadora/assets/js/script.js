import Calculator from './Calculator.js';

const domElements = {
    powerBtn: document.querySelector(
        '[data-power]'
    ),

    equalsBtn: document.querySelector(
        '[data-equals]'
    ),

    deleteBtn: document.querySelector(
        '[data-delete]'
    ),

    allNumberBtn: document.querySelectorAll(
        '[data-number]'
    ),

    clearBtn: document.querySelector(
        '[data-all-clear]'
    ),

    resultsHistoryContainer: document.querySelector(
        '[data-results-history-container]'
    ),

    allOperatorBtn: document.querySelectorAll(
        '[data-operator]'
    ),

    resultHistoryContent: document.querySelector(
        '[data-result-history-content]'
    ),

    currentOperation: document.querySelector(
        '[data-current-operation]'
    ),

    previousOperation: document.querySelector(
        '[data-previous-operation]'
    ),
};

let isCalculatorOn = false;

const calculator = new Calculator(
    domElements.previousOperation,
    domElements.currentOperation,
    domElements.resultHistoryContent,
);

/*
  FUNCTIONS
*/
const executeActionToPowerBtn = () =>{
    if (isCalculatorOn){
       const confirmTurnOffCalculator = confirm('Deseja Desligar a Calculadora');

       if(!confirmTurnOffCalculator){
        return;
       }
    }
    
    isCalculatorOn = !isCalculatorOn;
    
    domElements.powerBtn.classList.toggle('class-active');
    domElements.resultsHistoryContainer.classList.toggle('class-hide');
    
    !isCalculatorOn ? location.reload() : '';
}
const executeActionToAllNumberBtn = (number) => {
    number.addEventListener(
        'click', () => {
            if(!isCalculatorOn){
                alert('Calculadora Desligada!!!');
                
                return;
            }

            calculator.appendNumberDisplay(number.innerText);
            calculator.updateDisplay();
        }
    );
}

// Limpa Display
const executeActionToClearBtn = () => {
    // alert();
    if(!isCalculatorOn){
        alert('Calculadora Desligada!!!');
        
        return;
    }

    calculator.clearDisplay();
    calculator.updateDisplay();
    
}

const executeActionToDeleteBtn = () => {
    // alert('del');
    if(!isCalculatorOn){
        alert('Calculadora Desligada!!!');
        
        return;
    }
    calculator.deleteDigitDiplay();
    calculator.updateDisplay()

}

const executeActionToAllOperatorBtn = (operator) => {
    // console.log(operator);
    operator.addEventListener(
        'click', () => {
            // console.log(operator.innerText);
            if(!isCalculatorOn){
                alert('Calculadora Desligada!!!');
                
                return;
            }

            calculator.choiseOperator(operator.innerText);
            calculator.updateDisplay();
        }
    )

}

const executeActionToequalsBtn = () => {
   // alert('Você clicou no Botão = Enter');
   if(!isCalculatorOn){
    alert('Calculadora Desligada!!!');
    
    return;
   }
   calculator.calculate();
   calculator.updateDisplay();
   calculator.clearDisplay();

}

const executeActionToInitialLoad = () => {
    domElements.resultsHistoryContainer.classList.add('class-hide');

}
/*
  EVENTS
*/
domElements.powerBtn.addEventListener(
    'click', executeActionToPowerBtn
)

domElements.allNumberBtn.forEach(
    (number) => executeActionToAllNumberBtn(number)
   
);

domElements.clearBtn.addEventListener(
    'click', executeActionToClearBtn

);

domElements.deleteBtn.addEventListener(
    'click', executeActionToDeleteBtn

);

domElements.allOperatorBtn.forEach(
    (operator) => executeActionToAllOperatorBtn(operator)

);

domElements.equalsBtn.addEventListener(
    'click', executeActionToequalsBtn

);

window.addEventListener(
    'DOMContentLoaded', executeActionToInitialLoad

);