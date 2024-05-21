const symbols = '+-*/';
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
            mainText.textContent += (' ' + event.target.textContent + ' ');
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
    else {
        inputs.currentNum = inputs.currentNum*10 + +inputs.currentInput;
    }
    console.log(inputs.currentNum);
}

function handleSymbolClick(){
    if(inputs.currentNum === null){
        mainText.textContent = 'ERROR';
        resetInputs();
    }
    else if(inputs.currentNum !== null && inputs.previousNum !== null){
        calculate();
        inputs.previousOperator = inputs.currentOperator;
        inputs.currentOperator = inputs.currentInput;
        inputs.previousNum = inputs.currentNum;
        inputs.currentNum = inputs.result;
        mainText.textContent = `${inputs.currentNum} ${currentOperator}`;
    }
    else{
        inputs.previousOperator = inputs.currentOperator;
        inputs.currentOperator = inputs.currentInput;
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
        if(inputs.currentOperator === '+'){
            inputs.result = +inputs.currentNum + +inputs.previousNum;
        }
        else if(inputs.currentOperator === '-'){
            inputs.result = +inputs.previousNum - +inputs.currentNum;
        }
        else if(inputs.currentOperator === '*'){
            inputs.result = +inputs.previousNum * +inputs.currentNum;
        }
        else if(inputs.currentOperator === '/'){
            if(+inputs.currentNum === 0){
                mainText.textContent = 'ERROR';
                resetInputs();
                return;
            }
            else inputs.result = +inputs.previousNum / +inputs.currentNum;
        }
        if(inputs.previousInput !== null) subText.textContent = `${inputs.previousResult}`;
        mainText.textContent = `${inputs.result}`;
    }
    resetInputs();
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