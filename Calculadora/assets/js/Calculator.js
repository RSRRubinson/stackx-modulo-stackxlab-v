
export default class Calculator {
    constructor(
        previousOperation,
        currentOperation,
        resultHistoryContent,
     ) {
        this.previousOperationText = previousOperation;
        this.currentOperationText = currentOperation;
        this.resultHistoryContent = resultHistoryContent;
        this.currentOperand = String('');
        this.previousOperand = String('');
        this.operation = undefined;
     }
     // Adiciona Didgito Clicado no display
     appendNumberDisplay(number) {
       // console.log(number);
       // console.log(this.currentOperand);
    if(
        this.currentOperand.includes(String('.')) && number === String('.')
        ){
          return;
         }
    this.currentOperand = `${this.currentOperand}${number.toString()}`;   
    
    console.log(this.currentOperand);
     }
    
     // Atualiza Display Superior e Inferior
     updateDisplay(){
        /*

        */
       // console.log(this.previousOperationText.innerText);
       // atualizar Display Superior = número e operação
       this.previousOperationText.innerText = `${this.previousOperand} ${this.operation || String('')}`;
      
       // Atualizar Display Inferior 
       this.currentOperationText.innerText = this.currentOperand;

     }

     // Método ClearDisplay
     clearDisplay(){
        // alert();
        this.currentOperand = String('');
        this.previousOperand = String('');
        this.operation = undefined;
        
     }
     // Método deleteDisplay
     // Remove um Digito por vez a cada Click
     deleteDigitDiplay(){
        
        if (this.currentOperand == String('')){
            return;
        }
        
        this.currentOperand = String(this.currentOperand).slice(0, -1);

     }

        // Método choiseOperator
        // Recebe o tipo ded Operação
     choiseOperator(operator){
        // console.log(operator);
        if (this.previousOperand !== String('')){
            this.calculate();
        } 

        this.operation        = operator;
        this.previousOperand  = this.currentOperand;
        this.currentOperand   = String('');
     }   

        // Método calculate
        //  Calcula Resultado da Operação   
     calculate(){
        let result = undefined;

        const resultHistory = {
            data: [],
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
        };

        // console.log(typeof Number(this.previousOperand));

        const previousOperandNumber =  Number(this.previousOperand);
        const currentOperandNumber  =  Number(this.currentOperand);

        const operationSymbols = {
            adition:        String('+'),
            division:       String('/'),
            subtraction:    String('-'),
            multiplication: String('*'),
        }

        if (isNaN(previousOperandNumber) || isNaN(currentOperandNumber)){
            return;
        }
        
        switch(this.operation){
            case operationSymbols.adition:
                //console.log(this.operation);

                result = previousOperandNumber + currentOperandNumber;
            break;

            case operationSymbols.subtraction:
                //console.log(this.operation);

                result = previousOperandNumber - currentOperandNumber;
            break;
            
            case operationSymbols.division:
                // console.log(this.operation);{
                if(currentOperandNumber === 0 && previousOperandNumber === 0){
                    alert('Resultado Indefinido');
                    return;
                }

                if(currentOperandNumber === 0){
                    alert('Não é possível dividir por zero');
                    return;
                }
                
                result = previousOperandNumber / currentOperandNumber;
            break;

            case operationSymbols.multiplication:
                // console.log(this.operation);

                result = previousOperandNumber * currentOperandNumber;
            break;

            default:
                alert('Operação Inválida');
                // this.clearDisplay();
                break;    
        }
        
        if (typeof result === 'undefined'){
            
            return;
        }

        this.currentOperand = result;
        // updateDisplay();
        // this.currentOperationText.innerText = String(result);

        if(
            this.currentOperand   === String('') ||
            this.previousOperand  === String('') ||
            this.operation === String ('') ||
            this.operation === undefined
        ){
            return;
        }
                                // valor operador valor resultado
        resultHistory.data.push(
            previousOperandNumber, 
            this.operation, 
            currentOperandNumber,
            result,
        );

        this.resultHistoryContent.prepend(
            this.createResultHistoryContainer(resultHistory)
        );

        if(this.resultHistoryContent.children.length > 4){
            this.resultHistoryContent.removeChild(
                this.resultHistoryContent.lastElementChild
            );
        }

        this.clearDisplay();

        // console.log(resultHistory);
     }
        // Método createResultHistoryContainer
     createResultHistoryContainer(resultHistory){
       // console.log(resultHistory);
       const template      = document.querySelector('[data-template]').content;
       const resultContent = template.querySelector('[data-result-content]').cloneNode(true);

       // console.log(resultContent);
        
       resultContent
            .querySelector('[data-result-date]')
            .setAttribute('value', resultHistory.date);
       
       resultContent
            .querySelector('[data-result-time]')
            .setAttribute('value', resultHistory.time);
       
       resultContent
            .querySelector('[data-result-operation]')
            .setAttribute('value', `${resultHistory.data[0]} ${resultHistory.data[1]} ${resultHistory.data[2]} = ${resultHistory.data[3].toFixed(3)}`);
       
       resultContent
            .querySelector('[data-result-operation]')
            .setAttribute(
                'title', 'Clique para reutilizar essa Operação'
            ); 
       
       resultContent 
            .querySelector('[data-result-operation]')
            .addEventListener(
                 'click', (event) => {
                 const target = event.target;
                 const value = target.value.split('=')[1].trim();
                 
                 this.returnResultToDisplay(value);
                 
                }
            )
       resultContent
            .querySelector('[data-result-remove]')
            .setAttribute(
                'title', 'Clique para remover dados dessa Operação'
            ); 
                   
       resultContent
            .querySelector('[data-result-remove')
            .addEventListener(
                'click', () => {
                    const parent = resultContent
                        .querySelector('[data-result');
                    
                    this.removeParent(parent);
                }
            );
                
         
       return resultContent;

     }

     returnResultToDisplay(value){
        //console.log(value);
        this.currentOperand = value;
        this.updateDisplay();
     }
     removeParent(parent){
        // console.log(parent);

        const confirmRemoval = confirm('Atenção!!!! Deseja Excluir essa Operação?')

        if (!confirmRemoval){
            return;
        }

        parent.remove();
     }
}
