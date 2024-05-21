const symbols = '+-*/';
const digits = '0123456789';
const mainText = document.querySelector('#main-text');
const subText = document.querySelector('#sub-text');
const buttonContainer = document.querySelector('#button-container');
const equalButton = document.querySelector('#button-equal');

let inputs = {
    previousResult: null,
    previousNum: null,
    currentNum: null,
    previousInput: null,
    currentInput: null,
    previousOperator: null,
    currentOperator: null,
    percentOperator: false,
    result: null,
}

equalButton.addEventListener('click', calculate);

buttonContainer.addEventListener('click', function(event){
    if(event.target.tagName === 'BUTTON'){  
        inputs.previousInput = inputs.currentInput;
        inputs.currentInput = event.target.textContent;
        console.log(event.target.textContent)
        if(event.target.matches('.nums')){
            mainText.textContent += event.target.textContent;
            handleNumsClick();
        }
        else if(event.target.matches('.math-symbol')){
            console.log(inputs.previousInput);
            if(!symbols.includes(inputs.previousInput)){
                mainText.textContent += (' ' + event.target.textContent + ' ');
            }
            else mainText.textContent = mainText.textContent.slice(0, -3) + (' ' + event.target.textContent + ' ');
            handleSymbolClick()
        }
        else if(event.target.matches('.function')){
            handlefunctionClick(event.target.textContent);
        }
    }
});

function handleNumsClick(){
    if(symbols.includes(inputs.previousInput)){
        inputs.previousNum = inputs.currentNum;
        inputs.currentNum = +inputs.currentInput;
    }
    else if(inputs.previousInput === '.'){
        inputs.currentNum = +`${inputs.currentNum}.${inputs.currentInput}`;
    }
    else if(inputs.currentInput !== '.' && inputs.currentInput !== null) {
        inputs.currentNum = inputs.currentNum*10 + +inputs.currentInput;
    }
    else if(inputs.currentNum === null && inputs.previousNum === null){
        inputs.currentNum = +inputs.currentInput;
    }
    console.log(+inputs.currentInput);
    console.log(inputs.currentNum);
}

function handleSymbolClick(){
    if(inputs.currentNum === null){
        mainText.textContent = 'ERROR';
        resetInputs();
    }
    else if(inputs.currentNum !== null && inputs.previousNum !== null){ 
        /* if a symbol is pressed after a complete calculation then takes
         that calculation to use in the new calculation that uses the newly pressed operator */
        calculate();
        inputs.previousOperator = inputs.currentOperator;
        inputs.currentOperator = inputs.currentInput;
        inputs.previousNum = null;
        inputs.currentNum = inputs.result;
        mainText.textContent = `${inputs.currentNum} ${inputs.currentOperator} `;
    }
    else{
        inputs.previousOperator = inputs.currentOperator;
        inputs.currentOperator = inputs.currentInput;
    }
}

function handlefunctionClick(func){
    if(func === 'DEL'){
        
    }
    else if(func === 'AC'){
        mainText.textContent = '';
        subText.textContent = '';
        resetInputs();
    }
}

function numberPop(){
    if(digits.includes(inputs.previousInput)){

    }
    else if(symbols.includes(inputs.previousInput)){

    }

}

function calculate(){
    if(inputs.currentNum === null || 
       inputs.previousNum === null ||
       inputs.currentOperator === null){
        mainText.textContent = 'ERROR';
    }
    else{
        inputs.previousResult = inputs.result;
        let tempResult = 0;
        if(inputs.currentOperator === '+'){
            tempResult = +inputs.currentNum + +inputs.previousNum;
        }
        else if(inputs.currentOperator === '-'){
            tempResult = +inputs.previousNum - +inputs.currentNum;
            console.log(`currentNum: ${inputs.currentNum}
                         prevNum: ${inputs.previousNum}
                         tempResult: ${tempResult}
                        `);
        }
        else if(inputs.currentOperator === '*'){
            tempResult = +inputs.currentNum * +inputs.previousNum;
        }
        else if(inputs.currentOperator === '/'){
            if(+inputs.currentNum === 0){
                mainText.textContent = 'ERROR';
                resetInputs();
                return;
            }
            else tempResult = +inputs.previousNum / +inputs.currentNum;
        }
        console.log(`tempResult: ${tempResult}`);
        const sign = Math.sign(tempResult);
        tempResult = Math.abs(tempResult);
        console.log(`tempResult: ${tempResult}`);
        inputs.result = sign * parseFloat(tempResult.toFixed(2));
        
    }
}


function resetInputs(){
    inputs = {
        previousNum: null,
        currentNum: null,
        previousInput: null,
        currentInput: null,
        currentOperator: null,
        percentOperator: false,
    };
}